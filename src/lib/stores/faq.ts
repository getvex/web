import { writable } from "svelte/store"

function createFAQStore() {
    const { subscribe, set, update } = writable<Set<string>>(new Set())

    return {

        subscribe,

        open: (id: string) => update(s => new Set([id])),

        close: (id: string) => update(s => {
            const next = new Set(s)
            next.delete(id)
            return next
        }),

        toggle: (id: string) => update(s => {
            const next = new Set(s)
            next.has(id) ? next.delete(id) : next.add(id)
            return next
        }),

        clear: () => set(new Set())

    }
}

export const faq = createFAQStore()
