<script lang="ts">
    import { PrefersReducedMotion } from "@hooks/reduced-motion.svelte"
    import { ArrowDown, ArrowUp } from "@steeze-ui/phosphor-icons"
    import { IsMobile } from "@lib/hooks/is-mobile.svelte"
    import { Icon } from "@steeze-ui/svelte-icon"
    import { Button } from "@components/button"
    import { features } from "@constants"
    import type { Feature } from "@types"
    import { Vex } from "@icons/vex"
    import { cn } from "@lib/utils"

    let prefersReducedMotion = new PrefersReducedMotion()
    let observer = $state<IntersectionObserver | null>(null)
    let featuresEl = $state<HTMLElement | null>(null)
    let buttonEl = $state<HTMLElement | null>(null)
    // let rootEl = $state<HTMLElement | null>(null)

    let featuresEntered = $state(false)
    let featuresPassed = $state(false)

    let stuck = $state(false)
    let originalTop: number | null = null
    let isMobile = new IsMobile()

    let showBackToTop = $derived(featuresEntered || featuresPassed)
    let btn = $derived(showBackToTop
        ? { icon: ArrowUp }
        : { icon: ArrowDown }
    )

    $effect(() => {
        if (!featuresEl) return
        if (!observer) {
            observer = new IntersectionObserver(([entry]) => {
                featuresEntered = entry.isIntersecting
            }, { threshold: 0 })
        }
        observer.observe(featuresEl)

        return () => observer?.disconnect?.()
    })

    async function handleScroll() {
        const scrollOptions: ScrollIntoViewOptions = {
            behavior: prefersReducedMotion.current ? "instant" : "smooth",
            block: "start",
            inline: "nearest",
        }
        if (featuresEntered || featuresPassed) {
            document.documentElement.scrollIntoView?.(scrollOptions)
        } else {
            if (!featuresEl) return
            featuresEl.scrollIntoView(scrollOptions)
        }
    }

    function handleButtonScrollPosition() {
        if (!buttonEl || !featuresEl) return
        const btn = buttonEl.parentElement
        if (!btn) return

        const rect = featuresEl.getBoundingClientRect()
        featuresPassed = rect.bottom < 0

        if (originalTop === null) {
            originalTop = btn.getBoundingClientRect().top + window.scrollY
        }

        const navHeight = document.querySelector("header")?.offsetHeight ?? 80
        const offset = isMobile.current ? 10 : 10

        if (!stuck && scrollY + navHeight >= originalTop - offset) {
            stuck = true
        } else if (stuck && scrollY + navHeight < originalTop - offset) {
            stuck = false
        }
    }

    function handleResize() {
        if (!buttonEl) return
        const btn = buttonEl.parentElement
        if (!btn) return
        originalTop = btn.getBoundingClientRect().top + window.scrollY
    }
</script>

<svelte:window
    on:scroll={handleButtonScrollPosition}
    on:resize={handleResize}
/>

<div class="flex w-full items-center flex-col gap-10">
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
        <Button
            onclick={handleScroll}
            variant="brand"
            size="default"
            class={cn(
                "relative overflow-hidden rounded-xl flex items-center justify-center gap-2",
                prefersReducedMotion.current ? "transition-none" : "delay-200 transition-all duration-500",
                showBackToTop ? "w-31" : "w-9 h-9",
                stuck ? "fixed md:top-30 top-25 z-50" : "absolute bottom-6"
            )}
        >
            <span bind:this={buttonEl} class="absolute w-full h-full opacity-0 pointer-events-none"></span>
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
    </section>
    <section bind:this={featuresEl} id="features" class="w-full md:my-20 my-10 flex flex-col gap-10 items-center scroll-mt-30">
        <div
            class={cn(
                "flex flex-col gap-10 md:max-w-2/3 w-full items-center max-w-full",
                prefersReducedMotion.current ? "transition-none" : "transition-all delay-200 duration-600",
                featuresEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
