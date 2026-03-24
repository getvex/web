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

export type Preview = {
    icon?: Link["icon"]
    title: string
    description: {
        desktop: string
        mobile?: string
    }
    image_key: string
}

export type FAQ = {
    title: string,
    answer: string
}

type elements = "how" | "features" | "preview" | "why" | "cta" | "faq" | "btn"

export type ScrollElements = Record<elements, HTMLElement | null>
export type EnteredStates = Record<Exclude<elements, "btn">, boolean>

export type CleanupFn = () => void
