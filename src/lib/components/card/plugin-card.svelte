<script lang="ts">
    import { Separator } from "@components/separator"
    import type { Plugin } from "@generated/client"
    import { Button } from "@components/button"
    import { sanitizeName } from "@lib/utils"

    const { plugin }: { plugin: Plugin } = $props()

    const sanitized = $derived(sanitizeName(plugin.name))
    const authors = $derived(plugin.authors) as string[]
</script>

<Button variant="outline" href="/plugins/{sanitized}" class="flex flex-col gap-2 text-start items-start justify-start p-3 h-auto rounded-xl whitespace-pre-wrap">
    <p class="text-base font-bold">{plugin.name}</p>
    <div class="flex items-center gap-1">
        <p class="text-xs text-muted-foreground">By</p>
        {#each authors as author}
            <p class="text-xs text-foreground font-semibold">{author}</p>
        {/each}
    </div>
    <Separator class="w-full opacity-20 my-1" />
    <p class="text-sxs text-muted-foreground">{plugin.description}</p>
</Button>
