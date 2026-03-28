import { sanitizeName } from "@lib/utils"
import { error } from "@sveltejs/kit"

export function load({ locals, params }) {

    const plugin = locals.plugins.find(plugin => sanitizeName(plugin.name) === params.id)

    if (!plugin) throw error(404, "Plugin not found")

    return { plugin }

}
