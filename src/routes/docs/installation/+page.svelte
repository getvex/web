<script lang="ts">
    import { PUBLIC_GITHUB_ORG } from "$env/static/public"
    import { Codeblock } from "@components/codeblock"
    import { Separator } from "@components/separator"
    import { SectionTitle } from "@components/docs"
    import * as snippets from "@snippets"
</script>

<div class="flex flex-col w-full gap-10">
    <div class="flex flex-col gap-2">
        <SectionTitle title="Prerequisites" />
        <ul class="list-disc list-inside space-y-2 marker:text-muted-foreground text-xs">
            <li class="ml-2">
                <a href="https://nodejs.org" target="_blank" class="link">Node.js</a> 20 or later
            </li>
            <li class="ml-2">
                <a href="https://pnpm.io" target="_blank" class="link">pnpm</a> <code>npm install -g pnpm</code>
            </li>
            <li class="ml-2">
                <a href="https://fluxer.app" target="_blank" class="link">Fluxer</a> desktop app installed
            </li>
        </ul>
    </div>
    <Separator />
    <div class="flex flex-col gap-5">
        <SectionTitle title="Install Vex" />
        <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">Clone the Vex repository</p>
            <Codeblock lang="shell" code="git clone {PUBLIC_GITHUB_ORG}/vex.git" />
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">Install Dependencies</p>
            <Codeblock lang="shell" code="pnpm install" />
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">Build Vex</p>
            <Codeblock lang="shell" code="pnpm build" />
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">Inject Vex into Fluxer</p>
            <Codeblock lang="shell" code="pnpm install-vex" />
        </div>
        <p class="text-sm text-muted-foreground">
            Then simply restart Fluxer.
        </p>
    </div>
    <Separator />
    <div class="flex flex-col gap-5">
        <SectionTitle title="Update Vex" />
        <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">
                After pulling new changes from GitHub, you will need to build and re-patch Vex to apply the changes
            </p>
            <Codeblock lang="shell" code={snippets.updateCommand} />
            <p class="text-sm text-muted-foreground">
                Then simply restart Fluxer to apply the changes.
            </p>
            <p class="text-sm text-muted-foreground">
                In the future, Vex will notify you of available updates which will be able to be applied automatically.
            </p>
        </div>
    </div>
    <Separator />
    <div class="flex flex-col gap-5">
        <SectionTitle title="Uninstall Vex" />
        <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">
                Uninstalling Vex can be done with the command:
            </p>
            <Codeblock lang="shell" code="pnpm uninstall-vex" />
            <p class="text-sm text-muted-foreground">
                Then simply restart Fluxer.
            </p>
        </div>
    </div>
    <Separator />
    <div class="flex flex-col gap-5">
        <SectionTitle title="Development" />
        <p class="text-sm font-bold">Development setup:</p>
        <Codeblock
            lang="shell"
            code={snippets.devSetup}
        />
        <p class="text-sm font-bold mt-4">For iterating on the renderer:</p>
        <Codeblock
            lang="shell"
            code={snippets.devRenderer}
        />
        <p class="text-sm font-bold mt-4">For iterating on the installer or preload (asar changes):</p>
        <Codeblock
            lang="shell"
            code={snippets.devInstallerOrPreload}
        />
    </div>
</div>
