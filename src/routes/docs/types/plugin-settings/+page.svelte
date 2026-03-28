<script lang="ts">
    import { Codeblock } from "@lib/components/codeblock"
    import { Separator } from "@components/separator"
    import { SectionTitle } from "@components/docs"
    import * as snippet from "@snippets"
</script>

<div class="flex flex-col w-full gap-10">
    <div class="flex flex-col gap-5">
        <SectionTitle title="Toggle" code />
        <p class="text-sm text-muted-foreground">
            A setting that is either enabled or disabled.
        </p>
        <Codeblock
            lang="ts"
            code={snippet.pluginSettingsAsToggle}
        />
    </div>
    <Separator />
    <div class="flex flex-col gap-5">
        <SectionTitle title="Input" code />
        <p class="text-sm text-muted-foreground">
            A setting that can take input from a user, such as placeholder values, default messages... etc.
        </p>
        <Codeblock
            lang="ts"
            code={snippet.pluginSettingsAsInput}
        />
    </div>
    <Separator />
    <div class="flex flex-col gap-5">
        <SectionTitle title="Number" code />
        <p class="text-sm text-muted-foreground">
            A setting that requires a number value, such as a image size, amount of something, etc.
        </p>
        <Codeblock
            lang="ts"
            code={snippet.pluginSettingsAsNumber}
        />
    </div>
    <Separator />
    <div class="flex flex-col gap-5">
        <SectionTitle title="Select" code />
        <p class="text-sm text-muted-foreground">
            A setting that has pre-defined options for a user to select from a dropdown menu.
        </p>
        <Codeblock
            lang="ts"
            code={snippet.pluginSettingsAsSelect}
        />
    </div>
</div>
