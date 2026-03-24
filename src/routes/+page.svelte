<script lang="ts">
    import type { Feature, ScrollElements, EnteredStates } from "@types"
    import { PrefersReducedMotion } from "@hooks/reduced-motion.svelte"
    import { ArrowDown, ArrowUp } from "@steeze-ui/phosphor-icons"
    import { IsMobile } from "@lib/hooks/is-mobile.svelte"
    import { PUBLIC_GITHUB_ORG } from "$env/static/public"
    import { Icon } from "@steeze-ui/svelte-icon"
    import { Button } from "@components/button"
    import { Fluxer } from "@icons/fluxer"
    import { GitHub } from "@icons/github"
    import { features } from "@constants"
    import { Vex } from "@icons/vex"
    import { cn } from "@lib/utils"

    let prefersReducedMotion = new PrefersReducedMotion()
    let observer = $state<IntersectionObserver | null>(null)

    let elements = $state<ScrollElements>({ features: null, how: null, demo: null, why: null, cta: null, faq: null, btn: null })
    let entered = $state<EnteredStates>({ features: false, how: false, demo: false, why: false, cta: false, faq: false })

    let firstElement = $derived<HTMLElement | null>(Object.values(elements)?.[0])

    let isMobile = new IsMobile()

    let showBackToTop = $derived(Object.values(entered).some(v => v === true))
    let btn = $derived(showBackToTop
        ? { icon: ArrowUp }
        : { icon: ArrowDown }
    )

    $effect(() => {
        if (!observer) {
            observer = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    if (entry.target === elements.btn) continue
                    for (const key in elements) {
                        if (elements[key as keyof ScrollElements] === entry.target && key !== "btn") {
                            entered[key as keyof EnteredStates] = entry.isIntersecting
                        }
                    }
                }
            }, { threshold: 0 })
        }
        for (const element of Object.values(elements)) {
            if (!element) continue
            observer.observe(element)
        }

        return () => observer?.disconnect?.()
    })

    async function handleJumpToElement() {
        const scrollOptions: ScrollIntoViewOptions = {
            behavior: prefersReducedMotion.current ? "instant" : "smooth",
            block: "start",
            inline: "nearest",
        }
        if (showBackToTop) {
            document.documentElement.scrollIntoView?.(scrollOptions)
        } else {
            if (!firstElement) return
            (firstElement as HTMLElement).scrollIntoView(scrollOptions)
        }
    }
</script>

<div class="relative flex w-full items-center flex-col gap-10">
    <section class="flex flex-col gap-10 md:max-w-2/3 max-w-full text-center items-center justify-center min-h-[80vh]">
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
        <div class="flex items-center flex-wrap justify-center gap-2">
            <Button variant="brand" size={isMobile.current ? "default" : "lg"} href="{PUBLIC_GITHUB_ORG}/vex" target="_blank">
                <Icon src={Vex} class="w-6 h-auto md:block hidden" />
                Get Vex
            </Button>
            <Button variant="outline" size={isMobile.current ? "default" : "lg"} href="/join" target="_blank">
                <Icon src={Fluxer} class="w-6 h-auto md:block hidden" />
                Support
            </Button>
            <Button variant="outline" size={isMobile.current ? "default" : "lg"} href={PUBLIC_GITHUB_ORG} target="_blank">
                <Icon src={GitHub} class="w-6 h-auto md:block hidden" />
                View Source
            </Button>
        </div>
    </section>
    <Button
        onclick={handleJumpToElement}
        variant="default"
        size="default"
        class={cn(
            "sticky md:top-30 top-25 bottom-6 z-50 overflow-hidden rounded-xl flex items-center justify-center gap-2",
            prefersReducedMotion.current ? "transition-none" : "delay-200 transition-all duration-500",
            showBackToTop ? "w-31" : "w-9 h-9",
        )}
    >
        <span bind:this={elements.btn} class="absolute w-full h-full opacity-0 pointer-events-none"></span>
        <Icon
            src={btn.icon}
            theme="bold"
            class={cn(
                "w-8 h-auto",
                prefersReducedMotion.current ? "transition-none" : "delay-200 transition-all duration-500",
                showBackToTop ? "ml-0" : "ml-2"
            )}
        />
        <p class={cn(
            "text-xs",
            prefersReducedMotion.current ? "transition-none" : "delay-200 transition-all duration-500",
            showBackToTop ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
        )}>
            Back to top
        </p>
    </Button>
    <section bind:this={elements.features} id="features" class="w-full md:my-20 my-10 flex flex-col gap-10 items-center scroll-mt-30">
        <div
            class={cn(
                "flex flex-col gap-10 md:max-w-2/3 w-full items-center max-w-full",
                prefersReducedMotion.current ? "transition-none" : "transition-all duration-600",
                entered.features ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
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
