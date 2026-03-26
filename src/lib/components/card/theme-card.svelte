<script lang="ts">
    import { Separator } from "@components/separator"
    import type { Theme } from "@generated/client"
    import { Button } from "@components/button"
    import { sanitizeName } from "@lib/utils"

    const { theme }: { theme: Theme } = $props()

    const sanitized = $derived(sanitizeName(theme.name))
</script>

<Button variant="outline" href="/themes/{sanitized}" class="flex flex-col gap-2 text-start items-start justify-start p-3 h-auto rounded-xl whitespace-pre-wrap">
    <p class="text-base font-bold">{theme.name}</p>
    <div class="flex items-center gap-1">
        <p class="text-xs text-muted-foreground">By</p>
        <p class="text-xs text-foreground font-semibold">{theme.author}</p>
    </div>
    <Separator class="w-full opacity-20 my-1" />
    <p class="text-sxs text-muted-foreground">{theme.description}</p>
</Button>
