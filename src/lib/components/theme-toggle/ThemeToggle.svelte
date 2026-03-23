<script lang="ts">
    import { Sun, Moon } from "@steeze-ui/phosphor-icons"
    import { IsMobile } from "@hooks/is-mobile.svelte"
    import { Icon } from "@steeze-ui/svelte-icon"
    import { Button } from "@components/button"
    import { toggleMode } from "mode-watcher"
    import { cn } from "@lib/utils"

    type ThemeToggleProps = {
        class?: string
    }

    let { class: className }: ThemeToggleProps = $props()

    let isMobile = new IsMobile()
</script>

<Button onclick={toggleMode} variant="outline" size={isMobile.current ? "icon-sm" : "icon"} class={cn("rounded-xl", className)}>
    <Icon
        src={Sun}
        theme="fill"
        class="scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90 duration-400"
    />
    <Icon
        src={Moon}
        theme="fill"
        class="absolute scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0 duration-400"
    />
    <span class="sr-only">Toggle theme</span>
</Button>
