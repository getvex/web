<script lang="ts">
    import { Codeblock } from "@lib/components/codeblock"
    import { Separator } from "@components/separator"
    import { Note } from "@components/note"
    import * as snippet from "@snippets"
</script>

<div class="flex flex-col w-full gap-10">
    <div class="flex flex-col gap-5">
        <code class="text-xl font-black w-fit">window.Vex</code>
        <p class="text-sm text-muted-foreground">
            Plugins have access to <code>window.Vex</code> which provides utilities for interacting with Fluxer's internals.
        </p>
        <Codeblock
            lang="ts"
            code={snippet.vexGlobalInterface}
        />
    </div>
</div>
