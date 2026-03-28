import { redirect } from "@sveltejs/kit"

export function load({ url }) {

    if (url.pathname === "/docs") throw redirect(307, "/docs/introduction")

}
