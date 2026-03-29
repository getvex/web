import { routeMap } from "@components/sidebar"
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

export function formatArray(array: string[]) {
    let formatted = []
    if (array.length === 1) {
        formatted.push(`<b>${array[0]}</b>`)
    } else {
        let last = array[array.length - 1]
        let rest = array.slice(0, -1)
        formatted.push(rest.map((s) => `<b>${s}</b>`).join(", "))
        formatted.push(`and <b>${last}</b>`)
    }
    return formatted.join(" ")
}

export function sanitizeName(name: string) {
    return name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/(?![a-zA-Z0-9-]).{1}/g, "")
}

export function sanitizeDocsTitle(title: string) {
    return title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[?]{1}/g, "")
}

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export function getRouteIndex(pathname: string) {
    return routeMap.findIndex(r => r.url === pathname)
}

export function getNextRoute(pathname: string) {
    const i = getRouteIndex(pathname)
    return routeMap[i + 1] ?? null
}

export function getPreviousRoute(pathname: string) {
    const i = getRouteIndex(pathname)
    return routeMap[i - 1] ?? null
}

export function getCurrentRoute(pathname: string) {
    return routeMap[getRouteIndex(pathname)] ?? null
}
