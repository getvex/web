<script lang="ts">
    import { Codeblock } from "@components/codeblock"
    import { Separator } from "@components/separator"
    import { SectionTitle } from "@components/docs"
    import * as snippets from "@snippets"
</script>

<div class="flex flex-col w-full gap-10">
    <div class="flex flex-col gap-5">
        <SectionTitle title="Setup" />
        <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">
                The minimal setup required to get Vex working:
            </p>
            <Codeblock
                lang="shell"
                code={snippets.devSetup}
            />
        </div>
    </div>
    <Separator />
    <div class="flex flex-col gap-5">
        <SectionTitle title="Renderer" />
        <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">
                For iterating on the renderer (no changes to the asar):
            </p>
            <Codeblock
                lang="shell"
                code={snippets.devRenderer}
            />
        </div>
    </div>
    <Separator />
    <div class="flex flex-col gap-5">
        <SectionTitle title="Installer or Preload" />
        <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">
                For iterating on the installer or preload which introduces changes to the asar:
            </p>
            <Codeblock
                lang="shell"
                code={snippets.devInstallerOrPreload}
            />
        </div>
    </div>
</div>
