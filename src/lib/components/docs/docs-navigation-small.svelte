<script lang="ts">
	import { ArrowLeft, ArrowRight } from "@steeze-ui/phosphor-icons"
    import { getNextRoute, getPreviousRoute } from "@lib/utils"
    import type { SidebarRouteItem } from "@lib/types"
	import { Icon } from "@steeze-ui/svelte-icon"
	import { Button } from "@components/button"
	import { goto } from "$app/navigation"
	import { page } from "$app/state"

	const next = $derived(getNextRoute(page.url.pathname))
	const prev = $derived(getPreviousRoute(page.url.pathname))
</script>

<div class="flex gap-1 items-center">
    {@render PageButton("prev", prev)}
    {@render PageButton("next", next)}
</div>

{#snippet PageButton(type: "next" | "prev", item: SidebarRouteItem)}
    <Button
        onclick={() => goto(item.url)}
        variant="default"
        size="icon"
        class="size-7"
        disabled={!item}
    >
        <Icon src={type === "next" ? ArrowRight : ArrowLeft} theme="bold" class="size-4" />
    </Button>
{/snippet}
