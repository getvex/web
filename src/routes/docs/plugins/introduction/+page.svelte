<script lang="ts">
    import { Separator } from "@components/separator"
    import { SectionTitle } from "@components/docs"
</script>

<div class="flex flex-col w-full gap-10">
    <div class="flex flex-col gap-5">
        <SectionTitle title="Plugins" />
        <p class="text-sm text-muted-foreground">
            Plugins let you extend Fluxer's functionality by adding new features, modifying existing ones, or even replacing them entirely.
        </p>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="What can plugins do?" />
        <ul class="list-disc list-inside space-y-2 marker:text-brand text-xs">
            <li class="ml-2">Add UI elements</li>
            <li class="ml-2">Patch gateway events</li>
            <li class="ml-2">Patch context menus</li>
            <li class="ml-2">Send custom messages such as Embeds</li>
            <li class="ml-2">Unlock hidden parts of the UI, such as the "Staff Only" settings section</li>
            <li class="ml-2">& much more!</li>
        </ul>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="How do plugins work?" />
        <p class="text-sm text-muted-foreground">
            Vex loads plugins by calling an IPC method <code>vex:load-plugins</code> which reads the plugins folder and then injects each plugin into the DOM as a <code>{"<script>"}</code> tag.
            Hot reloading works by reloading the plugin file and re-injecting it into the DOM.
        </p>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Plugin Hot-Reloading" />
        <p class="text-sm text-muted-foreground">
            While developing a plugin, you can reload it without restarting Fluxer:
        </p>
        <ol class="list-decimal list-inside space-y-2 marker:text-brand text-xs">
            <li class="ml-2">Make changes to your plugin file in <code>%APPDATA%\vex\plugins\</code></li>
            <li class="ml-2">Open Fluxer Settings → Vex → Plugins</li>
            <li class="ml-2">Click <b>Reload</b> on your plugin</li>
        </ol>
        <p class="text-sm text-muted-foreground">
            The plugin will be stopped, the new code loaded from disk, and started again.
        </p>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="When should you use a plugin?" />
        <p class="text-sm text-muted-foreground">
            Use a plugin if you want to:
        </p>
        <ul class="list-disc list-inside space-y-2 marker:text-brand text-xs">
            <li class="ml-2">Add functionality</li>
            <li class="ml-2">Change behaviour</li>
            <li class="ml-2">Interact with data or APIs</li>
        </ul>
        <p class="text-sm text-muted-foreground">
            Don't use a plugin if:
        </p>
        <ul class="list-disc list-inside space-y-2 marker:text-brand text-xs">
            <li class="ml-2">You only want to change appearance of the UI. Create a custom theme instead</li>
        </ul>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Safety and expectations" />
        <p class="text-sm text-muted-foreground">
            Plugins can access Fluxer's internal systems, such as:
        </p>
        <ul class="list-disc list-inside space-y-2 marker:text-brand text-xs">
            <li class="ml-2">Actions (e.g. sending or editing messages, opening modals)</li>
            <li class="ml-2">State stores (e.g. user settings or UI state)</li>
            <li class="ml-2">Gateway events (e.g. intercepting messages)</li>
            <li class="ml-2">UI components (e.g. modals, buttons)</li>
        </ul>
        <p class="text-sm text-muted-foreground">
            This makes plugins powerful, but also means they should be installed only from trusted sources, as they can affect how the app behaves.
            If you are unsure about a plugin, don't install it.
        </p>
        <p class="text-sm text-muted-foreground">
            Poorly written plugins may break with updates.
        </p>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Bundled Plugins" />
        <p class="text-sm text-muted-foreground">
            Some popular Vencord plugins have been ported to Vex plugins and provided in this repo under the <code>/plugins</code> directory.
            These need to be placed in your vex plugins folder located at <code>%APPDATA%\vex\plugins\</code> (or where ever the install directory is for your operating system).
        </p>
        <p class="text-sm text-muted-foreground">
            The following plugins are provided:
        </p>
        <ul class="list-disc list-inside space-y-2 marker:text-brand text-xs">
            <li class="ml-2">Message Logger - Inspired by <a href="https://vencord.dev/plugins/MessageLogger" target="_blank" class="link">MessageLogger</a></li>
            <li class="ml-2">Platform Indicators - Inspired by <a href="https://vencord.dev/plugins/PlatformIndicators" target="_blank" class="link">PlatformIndicators</a></li>
            <li class="ml-2">Profile Media - Inspired by <a href="https://vencord.dev/plugins/ViewIcons" target="_blank" class="link">ViewIcons</a></li>
            <li class="ml-2">Embed Creator - Create and send embeds from your account</li>
        </ul>
    </div>
</div>
