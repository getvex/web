import type { Handle } from "@sveltejs/kit"
import { octo } from "@octo"
import { db } from "@db"

const CACHE_KEY = "pluginThemeList"
const CACHE_TTL = 12 * 60 * 60 * 1000 // 12 hours

export const handle: Handle = async ({ event, resolve }) => {

    event.locals.themes = []
    event.locals.plugins = []

    let lastFetched = await db.cache.findUnique({ where: { key: CACHE_KEY }})
    if (!lastFetched) {
        lastFetched = await db.cache.create({
            data: {
                key: CACHE_KEY,
                expires: Date.now()
            }
        })
    }

    if (lastFetched.expires < Date.now()) {
        await Promise.all([
            db.plugin.deleteMany(),
            db.theme.deleteMany()
        ])

        const req = await octo.request("GET /repos/{owner}/{repo}/contents/{path}", {
            owner: "getvex",
            repo: "vex",
            path: "vex.json",
            headers: {
                "X-GitHub-Api-Version": "2026-03-10"
            }
        })

        if (req.status === 200 && "content" in req.data) {
            const decoded = atob(req.data.content)
            const { plugins: pluginData, themes: themeData } = JSON.parse(decoded)

            await Promise.all([
                db.plugin.createMany({ data: pluginData }),
                db.theme.createMany({ data: themeData })
            ])

            const [plugins, themes] = await Promise.all([
                db.plugin.findMany(),
                db.theme.findMany()
            ])

            event.locals.themes = themes
            event.locals.plugins = plugins

        }

        await db.cache.update({
            where: { key: CACHE_KEY },
            data: { expires: Date.now() + CACHE_TTL }
        })
    } else {
        const [plugins, themes] = await Promise.all([
            db.plugin.findMany(),
            db.theme.findMany()
        ])

        event.locals.themes = themes
        event.locals.plugins = plugins
    }

    return await resolve(event)

}
