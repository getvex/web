<script lang="ts">
    import { Check, LinkSimpleHorizontal } from "@steeze-ui/phosphor-icons"
    import { DocsHelper } from "@reactive/docs.svelte"
    import { sanitizeDocsTitle } from "@lib/utils"
    import { Icon } from "@steeze-ui/svelte-icon"
    import { Button } from "@components/button"
    import { page } from "$app/state"

    let docs = $derived<DocsHelper>(new DocsHelper(page.url.origin + page.url.pathname))

    let { title, code = false } = $props()

    let sanitized = $derived(sanitizeDocsTitle(title))
</script>

<div id={sanitized} class="items-center gap-2 flex">
    <Button
        variant="ghost"
        size="icon-sm"
        onclick={() => docs.copyLink(sanitized)}
        disabled={docs.isCopying(sanitized)}
    >
        <Icon src={docs.isCopying(sanitized) ? Check : LinkSimpleHorizontal} theme="bold" class="size-4" />
    </Button>
    {#if code}
        <code class="text-xl font-black">{title}</code>
    {:else}
        <p class="text-xl font-black">{title}</p>
    {/if}
</div>
