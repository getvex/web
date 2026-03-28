import type { IconSource } from "@steeze-ui/svelte-icon"

export interface VexPlugin {
    name: string
    description: string
    version: string
    fileName?: string | null
    id: string
    authors: string[]
    restartRequired: RestartRequired
    dependencies?: string[] | null
}

export interface VexTheme {
    fileName: string
    author: string
    description: string
    name: string
    version: string
    website?: string | null
}

enum RestartRequired {
    None = "none",
    Restart = "restart"
}

export type CacheEntry<T> = {
    data: T
    expires: number
}

type Icon = {
    src: IconSource
    theme?: string
    color?: string
}

export type Link = {
    href: string
    icon: Icon
}

export type NavLink = {
    href: string
    text: string
    icon?: Partial<Icon>
}

export type Feature = {
    icon: Icon
    title: string
    description: string
}

export type Preview = {
    icon?: Icon
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
