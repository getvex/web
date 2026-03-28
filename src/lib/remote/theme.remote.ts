import { getRequestEvent, query } from "$app/server"
import { sanitizeName } from "@lib/utils"
import { error } from "@sveltejs/kit"
import { octo } from "@octo"
import { db } from "@db"

const CACHE_TTL = 12 * 60 * 60 * 1000 // 12 hours

export const fetchTheme = query(async () => {

    const event = getRequestEvent()

    let theme = event.locals.themes.find(theme => sanitizeName(theme.name) === event.params.id)

    if (!theme) throw error(404, "Theme not found")

    const cacheKey = `theme-${theme.fileName}`

    let lastFetched = await db.cache.findUnique({ where: { key: cacheKey }})
    if (!lastFetched) {
        lastFetched = await db.cache.create({
            data: {
                key: cacheKey,
                expires: Date.now()
            }
        })
    }

    if (lastFetched.expires < Date.now()) {

        const file = await db.css.findUnique({ where: { id: theme.fileName }})
        if (file) {
            await db.css.delete({ where: { id: theme.fileName }})
        }

        const req = await octo.request("GET /repos/{owner}/{repo}/contents/{path}", {
            owner: "getvex",
            repo: "vex",
            path: `themes/${theme.fileName}`,
            headers: {
                "X-GitHub-Api-Version": "2026-03-10"
            }
        })

        if (req.status === 200 && "content" in req.data) {
            const decoded = atob(req.data.content)

            await db.css.create({ data: {
                id: theme.fileName,
                css: decoded
            }})

            await db.cache.update({
                where: { key: cacheKey },
                data: { expires: Date.now() + CACHE_TTL }
            })

            const file = await db.css.findUnique({ where: { id: theme.fileName }})
            if (!file) {
                throw error(500, "Failed to fetch theme. Please try again later or download it from the Vex github repo.")
            }
            return file.css
        } else {
            throw error(500, "Failed to fetch theme. Please try again later or download it from the Vex github repo.")
        }
    } else {
        const file = await db.css.findUnique({ where: { id: theme.fileName }})
        if (!file) {
            throw error(500, "Failed to fetch theme. Please try again later or download it from the Vex github repo.")
        }
        return file.css
    }

})
