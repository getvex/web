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
            "@assets/*"    : "./src/lib/assets/*",
            "@components/*": "./src/lib/components/*",
            "@icons/*"     : "./src/lib/icons/*",
            "@hooks/*"     : "./src/lib/hooks/*",
            "@reactive/*"  : "./src/lib/reactive/*",
            "@stores/*"    : "./src/lib/stores/*",
            "@actions/*"   : "./src/lib/actions/*",
            "@remote/*"    : "./src/lib/remote/*",
            "@constants"   : "./src/lib/constants.ts",
            "@snippets"    : "./src/lib/snippets.ts",
            "@types"       : "./src/lib/types.ts",
            "@shiki"       : "./src/lib/shiki/index.ts",
            "@db"          : "./src/lib/server/db/index.ts",
            "@octo"        : "./src/lib/server/octo/index.ts",
            "@generated/*" : "./prisma/generated/prisma/*",
        },
        experimental: {
            remoteFunctions: true
        }
    },
    compilerOptions: {
        experimental: {
            async: true
        }
    },
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) => filename.includes("node_modules") ? undefined : { runes: true }
	}
}

export default config
