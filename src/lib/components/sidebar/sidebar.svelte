<script lang="ts">
    import { DocsNavigationSmall } from "@components/docs"
    import { SidebarTrigger } from "@icons/sidebar-trigger"
    import { clickOutside } from "@actions/clickOutside"
    import { IsMobile } from "@hooks/is-mobile.svelte"
    import { goto, onNavigate } from "$app/navigation"
    import { Icon } from "@steeze-ui/svelte-icon"
    import type { Writable } from "svelte/store"
    import { Button } from "@components/button"
    import type { SidebarRoute } from "@types"
    import { fade } from "svelte/transition"
    import { Fluxer } from "@icons/fluxer"
    import type { Snippet } from "svelte"
    import { page } from "$app/state"
    import { cn } from "$lib/utils"

    type SidebarProps = {
        state: Writable<boolean>
        children: Snippet
        title?: string
        items: SidebarRoute[]
    }

    let {
        state: sidebarState,
        children,
        title = "Portal",
        items = []
    }: SidebarProps = $props()

    let isMobile = new IsMobile()

    $effect(() => {
        sidebarState.set(!isMobile.current)
    })

    onNavigate(() => {
        if (isMobile.current) {
            sidebarState.set(false)
        }
    })

    function handleClick(url: string, newTab?: boolean) {
        if (newTab) {
            window.open(url, "_blank")
        } else {
            goto(url)
        }
    }
</script>

<div class="flex">
    {#if isMobile.current && $sidebarState}
        <div transition:fade={{ duration: 300 }} class="transition-colors fixed top-0 left-0 h-dvh w-screen bg-black/30 z-999"></div>
    {/if}
    <div
        class={cn(
            "transition-transform duration-300 p-4 bg-linear-to-b dark:from-primary/2 from-white dark:to-primary/0 to-white/30 flex flex-col gap-2 select-none border dark:border-primary/10 h-[calc(100dvh-var(--nav-height))] overflow-y-auto",
            isMobile.current ? "absolute h-screen top-0 left-0 z-9999 backdrop-blur-xl w-[85%]" : "fixed top-(--nav-height) w-65 rounded-2xl",
            $sidebarState
                ? isMobile.current ? "" : ""
                : isMobile.current ? "-translate-x-full" : "-translate-x-full left-0"
        )}
        use:clickOutside={() => {
            if (isMobile.current) {
                sidebarState.set(false)
            }
        }}
    >
        <p class="text-xs font-semibold text-primary/70 mb-2">{title}</p>
        {#each items as item (item.title)}
            <p class="flex items-center gap-2">
                <Icon src={item.icon} theme="fill" class="size-4!" />
                <span class="font-bold text-sm">{item.title}</span>
            </p>
            {#if item.items?.length}
                <div class="flex flex-col gap-1">
                    {#each item.items as subItem (subItem.title)}
                        <Button
                            onclick={() => handleClick(subItem.url, subItem.newTab)}
                            variant={page.url.pathname === subItem.url ? "muted" : "ghost"}
                            size="sm"
                            class={cn(
                                "ml-2.5 transition-all border border-transparent hover:border-primary/10 justify-start",
                                page.url.pathname === subItem.url ? "text-primary bg-primary/10 border-primary/10" : "text-primary/70"
                            )}
                        >
                            {#if subItem.icon}
                                <Icon src={subItem.icon} theme="fill" class="size-3.5!" />
                            {/if}
                            <span class="text-xs">{subItem.title}</span>
                        </Button>
                    {/each}
                </div>
            {/if}
        {/each}
        <div class="mt-auto w-full">
            <Button class="w-full" variant="brand" size="sm" href="/join" target="_blank">
                <Icon src={Fluxer} theme="bold" class="size-4" />
                <span>Support</span>
            </Button>
        </div>
    </div>
    <div class={cn(
        "flex flex-col gap-4 pt-2 md:px-4 transition-all duration-300 w-full z-700",
        $sidebarState
            ? isMobile.current ? "ml-0" : "ml-65"
            : isMobile.current ? "ml-0" : "ml-0"
    )}>
        <div class="sticky top-(--nav-height) flex items-center gap-2">
            <Button
                variant="ghost"
                size="icon-sm"
                class={cn(
                    " bg-primary/2! border-0! backdrop-blur-lg",
                    $sidebarState
                        ? isMobile.current ? "-ml-2!" : ""
                        : "-ml-2!"
                )}
                onclick={() => sidebarState.set(!$sidebarState)}
            >
                <Icon src={SidebarTrigger} theme="bold" class="size-4" />
            </Button>
            <DocsNavigationSmall />
        </div>
        {@render children?.()}
    </div>
</div>
