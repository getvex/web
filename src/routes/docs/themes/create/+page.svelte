<script lang="ts">
    import { CircleNotch, DownloadSimple } from "@steeze-ui/phosphor-icons"
    import { Codeblock } from "@lib/components/codeblock"
    import { Separator } from "@components/separator"
    import { SectionTitle } from "@components/docs"
    import { Button } from "@lib/components/button"
    import { Icon } from "@steeze-ui/svelte-icon"
    import * as snippet from "@snippets"

    let downloading = $state(false)

    async function handleDownloadExampleTheme() {
        downloading = true
        const temp = document.createElement("a")
        temp.href = `data:text/css;charset=utf-8,${encodeURIComponent(snippet.exampleTheme)}`
        temp.download = "forest.theme.css"
        temp.click()
        temp.remove()
        downloading = false
    }
</script>

<div class="flex flex-col w-full gap-10">
    <div class="flex flex-col gap-5">
        <SectionTitle title="Metadata" />
        <p class="text-sm text-muted-foreground">
            When creating a theme, you must provide some metadata so that Vex is able to display the theme properly in the settings page:
        </p>
        <Codeblock
            lang="css"
            filename="forest.theme.css"
            code={snippet.themeMeta}
        />
    </div>
    <Separator />
    <div class="flex flex-col gap-5">
        <SectionTitle title="Example" />
        <p class="text-sm text-muted-foreground">
            Themes are css (Cascading Style Sheet) files placed in <code>%APPDATA%\vex\themes\</code>. They are loaded automatically (disabled unless previously enabled) each time Fluxer starts.
        </p>
        <p class="text-sm text-muted-foreground">
            Example of a custom theme:
        </p>
        <Codeblock
            lang="css"
            filename="forest.theme.css"
            code={snippet.exampleTheme}
        />
        <Button variant="muted" class="w-fit" onclick={handleDownloadExampleTheme} disabled={downloading}>
            {#if downloading}
                <Icon src={CircleNotch} theme="bold" class="size-4! animate-spin" />
                Downloading
            {:else}
                <Icon src={DownloadSimple} theme="bold" class="size-4!" />
                Download and test this theme
            {/if}
        </Button>
    </div>
</div>
