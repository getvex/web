<script lang="ts">
    import { Codeblock } from "@lib/components/codeblock"
    import * as snippet from "@snippets"
</script>

<div class="flex flex-col w-full gap-10">
    <div class="flex flex-col gap-5">
        <code class="text-xl font-black w-fit">window.VexAPI</code>
        <p class="text-sm text-muted-foreground">
            Exposed by the preload via Electron's <code>contextBridge</code>. Available in the renderer at <code>window.VexAPI</code>.
        </p>
        <Codeblock
            lang="ts"
            code={snippet.vexApiInterface}
        />
    </div>
</div>
