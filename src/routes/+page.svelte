<script lang="ts">
    import { ArrowDown, ArrowUp, Files, Handshake } from "@steeze-ui/phosphor-icons"
    import type { Feature, Preview, ScrollElements, EnteredStates } from "@types"
    import { PrefersReducedMotion } from "@hooks/reduced-motion.svelte"
    import { IsMobile } from "@lib/hooks/is-mobile.svelte"
    import { PUBLIC_GITHUB_ORG } from "$env/static/public"
    import * as Carousel from "@components/carousel"
    import { Icon } from "@steeze-ui/svelte-icon"
    import { features, previews } from "@constants"
    import { Button } from "@components/button"
    import { Fluxer } from "@icons/fluxer"
    import { Vex } from "@icons/vex"
    import { cn } from "@lib/utils"

    let prefersReducedMotion = new PrefersReducedMotion()
    let observer = $state<IntersectionObserver | null>(null)

    let elements = $state<ScrollElements>({ features: null, how: null, preview: null, why: null, cta: null, faq: null, btn: null })
    let entered = $state<EnteredStates>({ features: false, how: false, preview: false, why: false, cta: false, faq: false })

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
        <h1 class="md:text-7xl text-5xl font-black dark:drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_20%,oklch(0%_0_0/0))] drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_50%,oklch(0%_0_0/0))]">
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
            <Button variant="outline" size={isMobile.current ? "default" : "lg"} href="/docs">
                <Icon src={Files} theme="fill" class="size-5! md:block hidden" />
                Docs
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
            <h2 class="md:text-4xl text-3xl font-black text-primary/50 dark:drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_20%,oklch(0%_0_0/0))] drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_50%,oklch(0%_0_0/0))]">
                Features
            </h2>
            <div class="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
                {#each features as feature (feature.title)}
                    {@render FeatureCard(feature)}
                {/each}
            </div>
        </div>
    </section>
    <section bind:this={elements.how} id="how" class="w-full md:my-20 my-10 flex flex-col gap-10 items-center scroll-mt-30">
        <div
            class={cn(
                "flex flex-col gap-10 md:max-w-2/3 w-full items-center max-w-full",
                prefersReducedMotion.current ? "transition-none" : "transition-all duration-600",
                entered.how ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
        >
            <h2 class="md:text-4xl text-3xl font-black text-primary/50 dark:drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_20%,oklch(0%_0_0/0))] drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_50%,oklch(0%_0_0/0))]">
                How It Works
            </h2>
            <div class="flex flex-col gap-4 p-4 rounded-2xl border bg-primary/2 text-xs">
                <p>Vex patches Fluxer's electron <code>app.asar</code> during installation, injecting a small shim at the top of the preload script. Then, on startup:</p>
                <ol class="list-decimal list-inside space-y-2 marker:text-brand">
                    <li class="ml-2">
                        The shim runs in Electron's preload context and exposes <code>window.VexAPI</code> and <code>window.Vex</code> via <code>contextBridge</code>
                    </li>
                    <li class="ml-2">
                        It calls <code>vex:load-plugins</code> via IPC to read plugin files from <code>/vex/plugins</code>
                    </li>
                    <li class="ml-2">
                        Each plugin is injected as a <code>{"<script>"}</code> tag into the renderer
                    </li>
                    <li class="ml-2">
                        The Vex renderer bundle runs, hooks into Fluxer's Rspack module registry, patches the settings UI, and starts all enabled plugins
                    </li>
                </ol>
                <p>Fluxer's main process is also patched to register the IPC handlers Vex needs for plugin loading, QuickCSS etc.</p>
            </div>
        </div>
    </section>
    <section bind:this={elements.preview} id="demo" class="w-full md:my-20 my-10 flex flex-col gap-10 items-center scroll-mt-30">
        <div
            class={cn(
                "flex flex-col gap-10 md:max-w-2/3 w-full items-center max-w-full",
                prefersReducedMotion.current ? "transition-none" : "transition-all duration-600",
                entered.preview ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
        >
            <h2 class="md:text-4xl text-3xl font-black text-primary/50 dark:drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_20%,oklch(0%_0_0/0))] drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_50%,oklch(0%_0_0/0))]">
                Preview
            </h2>
            <Carousel.Root opts={{ align: "center", loop: true,  }}>
                <Carousel.Content class="md:max-w-auto max-w-[80vw]">
                    {#each previews as preview, i (i)}
                        <Carousel.Item>
                            {@render DemoCard(preview)}
                        </Carousel.Item>
                    {/each}
                </Carousel.Content>
                <Carousel.Previous variant="muted" />
                <Carousel.Next variant="muted" />
            </Carousel.Root>
        </div>
    </section>
    <section bind:this={elements.why} id="why" class="w-full md:my-20 my-10 flex flex-col gap-10 items-center scroll-mt-30">
        <div
            class={cn(
                "flex flex-col gap-10 md:max-w-2/3 w-full items-center max-w-full",
                prefersReducedMotion.current ? "transition-none" : "transition-all duration-600",
                entered.why ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
        >
            <h2 class="md:text-4xl text-3xl font-black text-primary/50 dark:drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_20%,oklch(0%_0_0/0))] drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_50%,oklch(0%_0_0/0))]">
                Why Vex?
            </h2>
            <p class="text-center text-primary max-w-xl text-sm">
                Vex isn't just another plugin loader, it's designed to give you <b>full control</b> and <b>effortless integration</b> when extending your workflow.
            </p>
            <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full">
                <div class="flex flex-col items-center gap-3 p-4 bg-primary/2 rounded-xl border">
                    <Icon src={Fluxer} theme="bold" class="w-8 h-auto" />
                    <p class="font-bold text-sm text-primary text-center">Simple Integration</p>
                    <p class="text-xs text-muted-foreground text-center">
                        Install and run plugins in seconds.
                    </p>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 bg-primary/2 rounded-xl border">
                    <Icon src={Vex} theme="bold" class="w-8 h-auto" />
                    <p class="font-bold text-sm text-primary text-center">Full Control</p>
                    <p class="text-xs text-muted-foreground text-center">
                        Enable, configure, and manage plugins your way.
                    </p>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 bg-primary/2 rounded-xl border">
                    <Icon src={Handshake} theme="fill" class="w-8 h-auto" />
                    <p class="font-bold text-sm text-primary text-center">Community-Driven</p>
                    <p class="text-xs text-muted-foreground text-center">
                        Collaborate, share, and discover new plugins.
                    </p>
                </div>
            </div>
        </div>
    </section>
    <section bind:this={elements.cta} id="cta" class="w-full my-10 flex flex-col gap-10 items-center scroll-mt-30">
        <div
            class={cn(
                "flex flex-col gap-10 md:max-w-2/3 w-full items-center max-w-full",
                prefersReducedMotion.current ? "transition-none" : "transition-all duration-600",
                entered.cta ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
        >
            <Button variant="brand" size={isMobile.current ? "default" : "lg"} href="{PUBLIC_GITHUB_ORG}/vex" target="_blank">
                <Icon src={Vex} class="w-6 h-auto" />
                Start using Vex today
            </Button>
        </div>
    </section>
    <section bind:this={elements.faq} id="faq" class="w-full md:my-20 my-10 flex flex-col gap-10 items-center scroll-mt-30">
        <div
            class={cn(
                "flex flex-col gap-10 md:max-w-2/3 w-full items-center max-w-full",
                prefersReducedMotion.current ? "transition-none" : "transition-all duration-600",
                entered.faq ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
        >
            <h2 class="md:text-4xl text-3xl font-black text-primary/50 dark:drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_20%,oklch(0%_0_0/0))] drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_50%,oklch(0%_0_0/0))]">
                FAQ
            </h2>
            <p class="text-center text-primary max-w-xl text-sm">
                View all Frequently asked Questions on the <a class="link" href="/faq">FAQ</a> page.
            </p>
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

{#snippet DemoCard(preview: Preview)}
    <div class="flex md:flex-row flex-col-reverse w-full md:gap-6 md:bg-transparent bg-primary/5 rounded-2xl md:border-0 border select-none">
        <img src="/preview/{preview.image_key}.png" alt="" class="md:max-w-1/2 w-full drop-shadow rounded-2xl" />
        <div class="flex flex-col gap-4 p-6 col-span-1 md:items-start items-center md:text-start text-center md:w-1/2 w-full">
            {#if preview.icon}
                <div class="size-10 rounded-2xl bg-primary/2 border flex items-center justify-center">
                    <Icon src={preview.icon.src} theme={preview.icon.theme ?? "bold"} class={cn(preview.icon.color, "w-5 h-auto")} />
                </div>
            {/if}
            <div class="flex flex-col gap-2">
                <p class="text-primary font-bold text-base">{preview.title}</p>
                <p class="md:block hidden text-muted-foreground text-xs">{preview.description.desktop}</p>
                <p class="md:hidden block text-muted-foreground text-xs">{preview.description?.mobile ?? preview.description.desktop}</p>
            </div>
        </div>
    </div>
{/snippet}


