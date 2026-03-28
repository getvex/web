<script lang="ts">
    import { CircleNotch, DownloadSimple, Gear } from "@steeze-ui/phosphor-icons"
    import { Separator } from "@components/separator"
    import { fetchTheme } from "@remote/theme.remote"
    import { Icon } from "@steeze-ui/svelte-icon"
    import { Button } from "@components/button"
    import type { VexTheme } from "@types"
    import { page } from "$app/state"

    let theme = $state<VexTheme>(page.data.theme)
    let downloading = $state(false)

    async function downloadTheme() {
        downloading = true
        const css = await fetchTheme()
        const temp = document.createElement("a")
        temp.href = `data:text/css;charset=utf-8,${encodeURIComponent(css)}`
        temp.download = theme.fileName
        temp.click()
        temp.remove()
        downloading = false
    }
</script>

<div class="relative flex w-full items-center flex-col gap-10">
    <section class="flex flex-col gap-10 md:max-w-2/3 max-w-full text-center min-h-[80vh] w-full">
        <div class="flex flex-col gap-10 w-full my-10">
            <h1 class="md:text-7xl text-5xl font-black dark:drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_20%,oklch(0%_0_0/0))] drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_50%,oklch(0%_0_0/0))]">
                <span class="relative">
                    <span class="w-full left-0 bottom-1 drop-shadow-xl -rotate-1 absolute h-3 -z-1 bg-linear-to-r from-brand-start to-brand-end"></span>
                    {theme.name}
                </span>
            </h1>
            <p class="text-muted-foreground text-base">
                This theme was created by <b>{theme.author}</b>.
            </p>
            <div class="flex items-center justify-center">
                <Button variant="muted" class="w-fit px-4" onclick={downloadTheme} disabled={downloading}>
                    {#if downloading}
                        <Icon src={CircleNotch} theme="bold" class="size-4! animate-spin" />
                        Downloading
                    {:else}
                        <Icon src={DownloadSimple} theme="bold" class="size-4!" />
                        Download
                    {/if}
                </Button>
            </div>
        </div>
        <div class="flex flex-col gap-2 text-start items-start justify-start p-3 h-auto rounded-xl whitespace-pre-wrap border">
            <p class="text-base font-bold">{theme.fileName}</p>
            <Separator class="w-full opacity-20 my-1" />
            <p class="text-sm text-muted-foreground">{theme.description}</p>
        </div>
        <div class="flex flex-col gap-2 text-start items-start justify-start p-3 h-auto rounded-xl whitespace-pre-wrap border">
            <p class="text-base font-bold">How to install this theme</p>
            <Separator class="w-full opacity-20 my-1" />
            <ol class="list-decimal list-inside -space-y-2 marker:text-brand text-xs mt-2">
                <li class="ml-2">
                    Click the Download button at the top of this page and save the file somewhere
                </li>
                <li class="ml-2">
                    <span class="inline-flex flex-wrap items-center">
                        Open the settings modal in Fluxer by clicking the
                        <Icon src={Gear} theme="fill" class="size-4.5!" />
                        button in the bottom left corner
                    </span>
                </li>
                <li class="ml-2">
                    Scroll down to the "Vex" section in the left sidebar, then click the <code>Vex</code> tab
                </li>
                <li class="ml-2">
                    Click on the <code>Open Themes Folder</code> quick action button
                </li>
                <li class="ml-2">
                    Drag and drop the downloaded <code>{theme.fileName}</code> file into the themes folder
                </li>
                <li class="ml-2">
                    Go back to the <code>Vex</code> tab and click on the <code>Refresh Themes</code> quick action button
                </li>
                <li class="ml-2">
                    Then simply enable it in the <code>Themes</code> tab using the toggle
                </li>
            </ol>
        </div>
    </section>
</div>

