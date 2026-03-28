<script lang="ts">
    import { getNextRoute, getPreviousRoute } from "@lib/utils"
    import { Icon } from "@steeze-ui/svelte-icon"
	import { goto } from "$app/navigation"
	import { page } from "$app/state"
	import { cn } from "@lib/utils"

	const next = $derived(getNextRoute(page.url.pathname))
	const prev = $derived(getPreviousRoute(page.url.pathname))
</script>

<div class={cn(
    "flex gap-2 w-full mt-5",
    next ? "justify-end" : "justify-start"
)}>
    <button
        onclick={() => goto(prev.url)}
        class="flex flex-col justify-start text-start items-start gap-1 flex-1 bg-transparent hover:bg-primary/2 hover:border-primary/20 transition-all border-2 rounded-2xl max-w-1/2 p-3 cursor-pointer disabled:pointer-events-none disabled:opacity-60"
        disabled={!prev}
    >
        <p class="text-2xs text-muted-foreground leading-none">Previous</p>
        <div class="flex items-center gap-1">
            {#if prev?.parent?.icon}
                <Icon src={prev.parent.icon} theme="fill" class="size-4!" />
            {/if}
            {#if prev?.title}
                <p class="text-xs font-semibold leading-none">{prev.title}</p>
            {/if}
        </div>
    </button>
    <button
        onclick={() => goto(next.url)}
        class="flex flex-col justify-start text-end items-end gap-1 flex-1 bg-transparent hover:bg-primary/2 hover:border-primary/20 transition-all border-2 rounded-2xl max-w-1/2 p-3 cursor-pointer disabled:pointer-events-none disabled:opacity-60"
        disabled={!next}
    >
        <p class="text-2xs text-muted-foreground leading-none">Next</p>
        <div class="flex items-center gap-1">
            {#if next?.title}
                <p class="text-xs font-semibold leading-none">{next.title}</p>
            {/if}
            {#if next?.parent?.icon}
                <Icon src={next.parent.icon} theme="fill" class="size-4!" />
            {/if}
        </div>
    </button>
</div>
