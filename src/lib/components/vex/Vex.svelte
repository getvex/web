<script lang="ts">
    import { Footer } from "@lib/components/footer"
    import { Nav } from "@components/nav"
    import { page } from "$app/state"

    let { children } = $props()
</script>

<div class="flex flex-col w-full min-h-dvh">
    <Nav />
    <main class="flex flex-col w-full grow flex-1 p-4">
        {@render children?.()}
    </main>
    {#if !page.route.id?.startsWith("/docs")}
        <Footer />
    {/if}
</div>
