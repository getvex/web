<script lang="ts">
    import { PrefersReducedMotion } from "@hooks/reduced-motion.svelte"
    import { ArrowDown, ArrowUp } from "@steeze-ui/phosphor-icons"
    import { Icon } from "@steeze-ui/svelte-icon"
    import { Button } from "@components/button"
    import { fly } from "svelte/transition"
    import { features } from "@constants"
    import type { Feature } from "@types"
    import { Vex } from "@icons/vex"
    import { cn } from "@lib/utils"

    let prefersReducedMotion = new PrefersReducedMotion()
    let scrolled = $state<boolean>(prefersReducedMotion.current ? true : false)
    let observer = $state<IntersectionObserver | null>(null)
    let featuresEl = $state<HTMLElement | null>(null)

    $effect(() => {
        if (prefersReducedMotion.current) {
            scrolled = true
            return
        }
        if (!featuresEl) return
        if (!observer) {
            observer = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    scrolled = entry.isIntersecting
                }
            })
        }
        observer.observe(featuresEl)

        return () => observer?.disconnect?.()
    })

    function handleScroll() {
        const scrollOptions: ScrollIntoViewOptions = {
            behavior: prefersReducedMotion.current ? "instant" : "smooth",
            block: "start",
            inline: "nearest",
        }
        if (scrolled) {
            document.documentElement.scrollIntoView(scrollOptions)
        } else {
            featuresEl?.scrollIntoView?.(scrollOptions)
        }
    }
</script>

<div id="top" class="flex w-full items-center flex-col gap-10">
    <section class="flex flex-col gap-10 md:max-w-1/2 max-w-full text-center items-center justify-center min-h-[80vh]">
        <Icon src={Vex} class="w-40 h-auto md:block hidden drop-shadow-lg" />
        <h1 class="text-7xl font-black dark:drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_20%,oklch(0%_0_0/0))] drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_50%,oklch(0%_0_0/0))]">
            A
            <span class="relative">
                <span class="w-full left-0 bottom-1 drop-shadow-xl -rotate-1 absolute h-3 -z-1 bg-linear-to-r from-brand-start to-brand-end"></span>
                plugin
            </span>
            loader for Fluxer
        </h1>
        <p class="text-muted-foreground text-base">
            Vex lets you load, manage, and build plugins that modify and extend the capabilities of Fluxer's desktop app.
        </p>
        <Button
            onclick={handleScroll}
            variant="outline"
            size="default"
            class={cn(
                "mt-20 overflow-hidden rounded-xl flex items-center justify-center gap-2",
                prefersReducedMotion.current ? "transition-none" : "delay-400 transition-all duration-500 animate-pulse",
                scrolled ? "w-31" : "w-9 h-9"
            )}
        >
            <Icon
                src={scrolled ? ArrowUp : ArrowDown}
                class={cn(
                    "w-8 h-auto",
                    prefersReducedMotion.current ? "transition-none" : "delay-400 transition-all duration-500",
                    scrolled ? "ml-0" : "ml-2"
                )}
            />
            <p class={cn(
                "text-xs",
                prefersReducedMotion.current ? "transition-none" : "delay-400 transition-all duration-500",
                scrolled ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
            )}>
                Back to top
            </p>
        </Button>
    </section>
    <section bind:this={featuresEl} class="w-full md:my-20 my-10 flex flex-col gap-10 items-center">
        {#if scrolled}
            {@const flyOptions = prefersReducedMotion.current
                ? { y: 0, duration: 0, delay: 0 }
                : { y: 50, duration: 500, delay: 200 }
            }
            <div
                class="flex flex-col gap-10 md:max-w-1/2 w-full items-center max-w-full"
                transition:fly={flyOptions}
            >
                <h2 class="text-4xl font-black text-primary/50 dark:drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_20%,oklch(0%_0_0/0))] drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_50%,oklch(0%_0_0/0))]">
                    Features
                </h2>
                <div class="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
                    {#each features as feature (feature.title)}
                        {@render FeatureCard(feature)}
                    {/each}
                </div>
            </div>
        {/if}
    </section>
</div>

{#snippet FeatureCard(feature: Feature)}
    <div class="flex flex-col gap-2 p-3 rounded-xl border bg-primary/2 col-span-1">
        <div class="size-12 rounded-lg bg-primary/2 border flex items-center justify-center">
            <Icon src={feature.icon.src} theme={feature.icon.theme ?? "bold"} class={cn(feature.icon.color, "w-6 h-auto")} />
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-primary font-bold text-base">{feature.title}</p>
            <p class="text-muted-foreground text-xs">{feature.description}</p>
        </div>
    </div>
{/snippet}
