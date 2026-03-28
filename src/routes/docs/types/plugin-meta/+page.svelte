<script lang="ts">
    import { Codeblock } from "@lib/components/codeblock"
    import { Separator } from "@components/separator"
    import { Note } from "@components/note"
    import * as snippet from "@snippets"
</script>

<div class="flex flex-col w-full gap-10">
    <div class="flex flex-col gap-5">
        <code class="text-xl font-black w-fit">PluginMeta</code>
        <p class="text-sm text-muted-foreground">
            The interface that plugin meta should follow when defining a plugin via <code>{"Vex.definePlugin({ meta: {...} })"}</code>
        </p>
        <Codeblock
            lang="ts"
            code={snippet.pluginMetaInterface}
        />
    </div>
</div>
