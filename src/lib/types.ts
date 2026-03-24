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

type elements = "how" | "features" | "demo" | "why" | "cta" | "faq" | "btn"

export type ScrollElements = Record<elements, HTMLElement | null>
export type EnteredStates = Record<Exclude<elements, "btn">, boolean>

export type CleanupFn = () => void
