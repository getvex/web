<script lang="ts">
    import { Footer } from "@lib/components/footer"
    import { Nav } from "@components/nav"

    let { children } = $props()
</script>

<div class="flex flex-col w-full min-h-dvh">
    <Nav />
    <main class="flex flex-col w-full grow flex-1 p-4">
        {@render children?.()}
    </main>
    <Footer />
</div>
