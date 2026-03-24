<script lang="ts">
    import { prefersReducedMotion } from "svelte/motion"
    import { goto, onNavigate } from "$app/navigation"
    import { tick, type Snippet } from "svelte"
    import { backInOut } from "svelte/easing"
    import { fly, slide } from "svelte/transition"
    import { faq } from "@stores/faq"
    import { page } from "$app/state"
    import { cn } from "@lib/utils"

    type CollapsibleProps = {
        title: string
        class?: string
        children?: Snippet
        delay?: number
    }

    let { title, class: className, children, delay = 0 }: CollapsibleProps = $props()

    function sanitize(str: string) {
        return str
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/(?![a-zA-Z0-9-]).{1}/g, "")
    }

    let open = $derived($faq.has(sanitize(title)))
    let loaded = $state(false)

    function handleToggleCollapsible() {
        goto(open
            ? page.url.pathname
            : `${page.url.pathname}?q=${sanitize(title)}`,
        { replaceState: true, noScroll: true, keepFocus: true })
        faq.toggle(sanitize(title))
    }

    onNavigate((nav) => {
        if (!nav.to?.url.pathname.match(/\/faq/)) {
            faq.clear()
        }
    })

    $effect(() => {
        loaded = true
        const q = page.url.searchParams.get("q")

        if (!q) return

        faq.open(q)

        if (prefersReducedMotion.current) return

        tick().then(() => {
            document.getElementById(sanitize(title))?.scrollIntoView({
                behavior: prefersReducedMotion.current ? "instant" : "smooth"
            })
        })
    })
</script>

{#if loaded}
    {@const options = prefersReducedMotion.current
        ? { y: 0, delay: 0, duration: 0 }
        : { y: -50, delay, easing: backInOut, duration: 1000 }
    }
    <button
        in:fly={options}
        id={sanitize(title)}
        class={cn("flex flex-col gap-2.5 cursor-pointer scroll-mt-30", className)}
        onclick={handleToggleCollapsible}
    >
        <p class="text-sm font-medium">{title}</p>
        {#if open}
            <div transition:slide={{ duration: prefersReducedMotion.current ? 0 : 200 }}>
                {@render children?.()}
            </div>
        {/if}
    </button>
{/if}
