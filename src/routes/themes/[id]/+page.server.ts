import { sanitizeName } from "@lib/utils"
import { error } from "@sveltejs/kit"

export function load({ locals, params }) {

    const theme = locals.themes.find(theme => sanitizeName(theme.name) === params.id)

    if (!theme) throw error(404, "Theme not found")

    return { theme }

}
