import type { IconSource } from "@steeze-ui/svelte-icon"

export type Link = {
    href: string
    icon: {
        src: IconSource
        theme?: string
        color?: string
    }
}

export type Feature = {
    icon: Link["icon"]
    title: string
    description: string
}
