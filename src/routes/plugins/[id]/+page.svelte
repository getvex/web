<script lang="ts">
    import { Separator } from "@components/separator"
    import { Gear } from "@steeze-ui/phosphor-icons"
    import { Icon } from "@steeze-ui/svelte-icon"
    import { formatArray } from "@lib/utils"
    import type { VexPlugin } from "@types"
    import { page } from "$app/state"

    let plugin = $state<VexPlugin>(page.data.plugin)
</script>

<div class="relative flex w-full items-center flex-col gap-10">
    <section class="flex flex-col gap-10 md:max-w-2/3 max-w-full text-center min-h-[80vh] w-full">
        <div class="flex flex-col gap-10 w-full my-10">
            <h1 class="md:text-7xl text-5xl font-black dark:drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_20%,oklch(0%_0_0/0))] drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_50%,oklch(0%_0_0/0))]">
                <span class="relative">
                    <span class="w-full left-0 bottom-1 drop-shadow-xl -rotate-1 absolute h-3 -z-1 bg-linear-to-r from-brand-start to-brand-end"></span>
                    {plugin.name}
                </span>
            </h1>
            <p class="text-muted-foreground text-base">
                This plugin was created by {@html formatArray(plugin.authors)}.
            </p>
        </div>
        <div class="flex flex-col gap-2 text-start items-start justify-start p-3 h-auto rounded-xl whitespace-pre-wrap border">
            <p class="text-base font-bold">{plugin.id}</p>
            <Separator class="w-full opacity-20 my-1" />
            <p class="text-sm text-muted-foreground">{plugin.description}</p>
        </div>
        <div class="flex flex-col gap-2 text-start items-start justify-start p-3 h-auto rounded-xl whitespace-pre-wrap border">
            <p class="text-base font-bold">How to install this plugin</p>
            <Separator class="w-full opacity-20 my-1" />
            <p class="text-sm text-muted-foreground">This plugin comes pre-installed with Vex. To install it, all you have to do is:</p>
            <ol class="list-decimal list-inside -space-y-2 marker:text-brand text-xs mt-2">
                <li class="ml-2">
                    <span class="inline-flex flex-wrap items-center">
                        Open the settings modal in Fluxer by clicking the
                        <Icon src={Gear} theme="fill" class="size-4.5!" />
                        button in the bottom left corner
                    </span>
                </li>
                <li class="ml-2">
                    Scroll down to the "Vex" section in the left sidebar
                </li>
                <li class="ml-2">
                    Click on the <code>Plugins</code> tab
                </li>
                <li class="ml-2">
                    Find <b>{plugin.name}</b> and enable it
                </li>
            </ol>
        </div>
    </section>
</div>

