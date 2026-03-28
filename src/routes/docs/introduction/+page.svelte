<script lang="ts">
    import { Separator } from "@components/separator"
    import { SectionTitle } from "@components/docs"
</script>

<div class="flex flex-col w-full gap-10">
    <div class="flex flex-col gap-5">
        <SectionTitle title="Vex" />
        <p class="text-sm text-muted-foreground">
            A plugin loader for <a href="https://fluxer.app" target="_blank" class="link">Fluxer</a>, free and open source instant messaging and VoIP platform built for friends, groups, and communities.
        </p>
        <p class="text-sm text-muted-foreground">
            Vex lets you load, manage, and build plugins that modify and extend Fluxer's desktop client. It injects into the Electron app at the preload level, hooks into Fluxer's internal module system, and provides a native-looking settings panel for managing your plugins. This will not work with the Fluxer web app.
        </p>
        <p class="text-sm text-muted-foreground">
            Vex currently supports <b>Windows</b> and some<b>Linux</b> distros. Efforts are underway to add full Linux support, while <b>macOS</b> support is not planned.
        </p>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Features" />
        <ul class="list-disc list-inside space-y-2 marker:text-brand text-xs">
            <li class="ml-2">Native settings panel integrated into Fluxer's existing settings UI</li>
            <li class="ml-2">Enable/disable plugins with a toggle</li>
            <li class="ml-2">Enable/disable themes with a toggle</li>
            <li class="ml-2">Load external plugins from <code>%APPDATA%\vex\plugins\</code></li>
            <li class="ml-2">Load external themes from <code>%APPDATA%\vex\themes\</code></li>
            <li class="ml-2">Hot-reload external plugins without restarting Fluxer</li>
            <li class="ml-2">Per-plugin info modal showing author, version, and optional plugin-defined settings</li>
            <li class="ml-2">Unlocks Fluxer's hidden staff-only settings tabs (Developer Options, UI Kit, Limits Config) (NOTE: this is now provided as a plugin - use at your own risk.)</li>
            <li class="ml-2">Plugin manager with dependency resolution</li>
            <li class="ml-2">Live css editor that opens a separate electron window running monaco</li>
        </ul>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="How it works" />
        <p class="text-sm text-muted-foreground">
            Vex patches Fluxer's <code>app.asar</code> during installation, injecting a small shim at the top of Fluxer's preload script.
        </p>
        <p class="text-sm text-muted-foreground">
            On startup:
        </p>
        <ul class="list-disc list-inside space-y-2 marker:text-brand text-xs">
            <li class="ml-2">The shim runs in Electron's preload context and exposes <code>window.VexAPI</code> via <code>contextBridge</code></li>
            <li class="ml-2">It calls <code>vex:load-plugins</code> via IPC to read plugin files from <code>%APPDATA%\vex\plugins\</code></li>
            <li class="ml-2">Each plugin is injected as a <code>{"<script>"}</code> tag into the renderer</li>
            <li class="ml-2">The Vex renderer bundle runs, hooks into Fluxer's Rspack module registry, patches the settings UI, and starts all enabled plugins</li>
        </ul>
        <p class="text-sm text-muted-foreground">
            Fluxer's main process is also patched to register the IPC handlers Vex needs for plugin loading, QuickCSS etc.
        </p>
    </div>
</div>
