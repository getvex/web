<script lang="ts">
    import { DocsNavigation } from "@lib/components/docs"
    import { Sidebar, routes } from "@components/sidebar"
    import { Separator } from "@components/separator"
    import { getCurrentRoute } from "@lib/utils"
    import { docs } from "@stores/sidebar"
    import { page } from "$app/state"

    // let currentPage = $derived(routes.find(r => r.items.find(i => i.url === page.url.pathname)))
    // let currentItem = $derived(currentPage?.items.find(i => i.url === page.url.pathname))
    const current = $derived(getCurrentRoute(page.url.pathname))

    const { children } = $props()
</script>

<div class="flex flex-col">
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
