<script lang="ts">
    import { IsMobile } from "@lib/hooks/is-mobile.svelte"
    import { ThemeToggle } from "@components/theme-toggle"
    import { clickOutside, escape, tapOutside } from "@actions/clickOutside"
    import { List } from "@steeze-ui/phosphor-icons"
    import { Icon } from "@steeze-ui/svelte-icon"
    import { Button } from "@components/button"
    import { cubicInOut } from "svelte/easing"
    import { navLinks } from "@lib/constants"
    import { scale } from "svelte/transition"
    import { Vex } from "@icons/vex"
    import { tick } from "svelte"

    let isMobile = new IsMobile()
    let nav = $state<HTMLElement | null>(null)
    let ref = $state<HTMLElement | null>(null)
    let open = $state(false)
    let observer = $state<ResizeObserver | null>(null)

    let offset = $state(0)

    async function updateOffset() {
        await tick()
        let rect = ref?.getBoundingClientRect()
        if (!rect) {
            offset = 0
            return
        }
        offset = rect.bottom - rect.height + 10
    }

    function handleResize() {
        updateOffset()
    }

    $effect(() => {
        if (!nav) {
            document.documentElement.style.setProperty(
                "--nav-height",
                isMobile.current ? "66px" : "86px"
            )
        } else {
            document.documentElement.style.setProperty(
                "--nav-height",
                `${nav.getBoundingClientRect().height}px`
            )
        }

        if (!observer) {
            observer = new ResizeObserver((entries) => {
                document.documentElement.style.setProperty(
                    "--nav-height",
                    `${nav!.getBoundingClientRect().height}px`
                )
            })
        }

        if (nav) {
            observer.observe(nav)
        }

        if (!isMobile.current) {
            open = false
        } else {
            updateOffset()
        }

        return () => observer?.disconnect()
    })

    async function handleOpenMenu() {
        await tick()
        open = !open
        await updateOffset()
    }
</script>

<svelte:window onresize={handleResize} />

<header bind:this={nav} class="w-full p-3 sticky top-0 left-0 z-999">
    <div class="w-full md:p-6 p-4 border flex items-center backdrop-blur-xl md:rounded-3xl rounded-2xl justify-between">
        <a class="flex items-center gap-6" href="/">
            <Icon src={Vex} class="w-8 h-auto" />
            <p class="font-bold md:block hidden">Vex</p>
        </a>
        <div class="flex items-center md:gap-8 gap-2 text-primary">
            {#each navLinks as link}
                <a href={link.href} class="md:block hidden text-xs brightness-90 hover:brightness-150 transition-all">
                    {link.text}
                </a>
            {/each}
            <ThemeToggle />
            <div class="relative md:hidden flex" bind:this={ref}>
                <Button onclick={handleOpenMenu} variant="outline" size={isMobile.current ? "icon-sm" : "icon"} class="rounded-xl">
                    <Icon src={List} theme="bold" />
                    <span class="sr-only">Navigation menu</span>
                </Button>
                {#if open}
                    <div
                        class="flex flex-col gap-1 items-start absolute min-w-50 rounded-xl right-0 p-2 border z-9999 bg-background"
                        style="top: {offset}px"
                        use:clickOutside={() => open = false}
                        use:escape={() => open = false}
                        transition:scale={{ duration: 200, opacity: 0, start: 0.9, easing: cubicInOut }}
                    >
                        {#each navLinks as link}
                            <Button variant="ghost" size="sm" href={link.href} class="gap-3">
                                {#if link.icon && "src" in link.icon}
                                    <Icon src={link.icon.src!} theme={link.icon.theme ?? "bold"} class="size-4" />
                                {/if}
                                {link.text}
                            </Button>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
</header>
