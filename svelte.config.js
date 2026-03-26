import adapter from "@sveltejs/adapter-node"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
        adapter: adapter({
            out: "build",
            precompress: true
        }),
        alias: {
            "@lib"         : "./src/lib/*",
            "@components/*": "./src/lib/components/*",
            "@icons/*"     : "./src/lib/icons/*",
            "@hooks/*"     : "./src/lib/hooks/*",
            "@stores/*"    : "./src/lib/stores/*",
            "@actions/*"   : "./src/lib/actions/*",
            "@remote/*"    : "./src/lib/remote/*",
            "@constants"   : "./src/lib/constants.ts",
            "@types"       : "./src/lib/types.ts",
            "@db"          : "./src/lib/server/db/index.ts",
            "@octo"        : "./src/lib/server/octo/index.ts",
            "@generated/*" : "./prisma/generated/prisma/*",
        }
    },
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) => filename.includes("node_modules") ? undefined : { runes: true }
	}
}

export default config
