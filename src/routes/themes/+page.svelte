<script lang="ts">
    import type { Theme } from "@generated/client"
    import { ThemeCard } from "@components/card"
    import { pluralize } from "@lib/utils"
    import { page } from "$app/state"

    let themes = $state<Theme[]>(page.data.themes)
</script>

<div class="relative flex w-full items-center flex-col gap-10">
    <section class="flex flex-col gap-10 md:max-w-2/3 max-w-full text-center min-h-[80vh] w-full">
        <div class="flex flex-col gap-10 w-full my-10">
            <h1 class="text-7xl font-black dark:drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_20%,oklch(0%_0_0/0))] drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_50%,oklch(0%_0_0/0))]">
                <span class="relative">
                    <span class="w-full left-0 bottom-1 drop-shadow-xl -rotate-1 absolute h-3 -z-1 bg-linear-to-r from-brand-start to-brand-end"></span>
                    Themes
                </span>
            </h1>
            <p class="text-muted-foreground text-base">
                Vex has <b>{pluralize("theme", themes.length, true)}</b> available to be installed and used.
            </p>
        </div>
        <div class="grid md:grid-cols-3 grid-cols-1 gap-2 w-full">
            {#each themes as theme (theme.fileName)}
                <ThemeCard {theme} />
            {/each}
        </div>
    </section>
</div>
