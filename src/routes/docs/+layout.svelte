<script lang="ts">
    import { DocsNavigation } from "@lib/components/docs"
    import { Sidebar, routes } from "@components/sidebar"
    import { Separator } from "@components/separator"
    import { getCurrentRoute } from "@lib/utils"
    import { docs } from "@stores/sidebar"
    import { page } from "$app/state"

    const current = $derived(getCurrentRoute(page.url.pathname))

    const { children } = $props()

    $effect(() => {
        if (page.url?.hash) {
            document.body.scrollTop = document.documentElement.scrollTop - 100
        }
        for (const el of document.querySelectorAll(".section-highlighted")) {
            el.classList.remove("section-highlighted")
        }
        let reference = document.getElementById(page.url?.hash?.replace("#", "")) as HTMLElement
        if (!reference) return
        reference.classList.add("section-highlighted")
    })
</script>

<div class="flex flex-col" id="docs">
    <Sidebar
        state={docs}
        title="Docs"
        items={routes}
    >
        <h1 class="text-3xl font-black font-brand">
            <span class="text-primary/80">{current?.title ?? "Docs"}</span>
        </h1>
        <Separator class="my-5" />
        {@render children?.()}
        <DocsNavigation />
    </Sidebar>
</div>
