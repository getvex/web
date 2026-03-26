import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null }

export function pluralize(word: string, count: number, includeValue: boolean = true, pluralizedWord?: string): string {
    let string = ""
    if (includeValue && count !== 0) string += `${count.toLocaleString()} `
    if (pluralizedWord) {
        if (count === 1) string += `${word} `
        else string += `${pluralizedWord} `
    }
    else if (count === 0) string += `no ${word}s`
    else string += `${word}${count !== 1 ? "s" : ""}`

    return string
}

export function sanitizeName(name: string) {
    return name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/(?![a-zA-Z0-9-]).{1}/g, "")
}
