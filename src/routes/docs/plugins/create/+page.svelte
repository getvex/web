<script lang="ts">
    import { Codeblock } from "@lib/components/codeblock"
    import { Separator } from "@components/separator"
    import { SectionTitle } from "@components/docs"
    import { Note } from "@components/note"
    import * as snippet from "@snippets"
</script>

<div class="flex flex-col w-full gap-10">
    <div class="flex flex-col gap-5">
        <SectionTitle title="Plugins" />
        <p class="text-sm text-muted-foreground">
            Plugins are plain JS objects pushed to <code>window.__vexPlugins</code>.
            All Vex utilities are available via the global <code>window.Vex</code> object inside <code>start()</code> and any methods called after it.
        </p>
        <p class="text-sm text-muted-foreground">
            The basic plugin structure is below, along with all the current utilities exposed to <code>window.Vex</code> to help make plugins easier to write.
        </p>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Structure" />
        <Codeblock
            lang="js"
            filename="example-plugin.js"
            code={snippet.examplePlugin}
        />
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Settings" />
        <p class="text-sm text-muted-foreground">
            Defined as an array of setting descriptors. Values are accessible via <code>Vex.settings</code>.
        </p>
        <Codeblock
            lang="js"
            code={snippet.examplePluginSettings}
        />
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Dependencies" />
        <p class="text-sm text-muted-foreground">
            If your plugin depends on another plugin being loaded first, declare it in <code>dependencies</code>:
        </p>
        <Codeblock
            lang="js"
            code={snippet.examplePluginDependencies}
        />
        <p class="text-sm text-muted-foreground">
            Vex will start dependencies before your plugin and stop them after.
        </p>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Vex.settings" code />
        <p class="text-sm text-muted-foreground">
            Read and write plugin settings stored in localStorage.
        </p>
        <Codeblock
            lang="js"
            code={snippet.exampleSettings}
        />
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Vex.webpack" code />
        <p class="text-sm text-muted-foreground">
            Access Fluxer's internal module system.
        </p>
        <Codeblock
            lang="js"
            code={snippet.exampleWebpack}
        />
        <Note variant="note">
            <p class="text-sm">
                Store singletons are always exported as <code>.A</code>. For example:
            </p>
            <code class="text-sm">Vex.webpack.getModule("./src/stores/UserStore.tsx")?.A?.currentUserId</code>
        </Note>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Vex.symbols" code />
        <p class="text-sm text-muted-foreground">
            Resolve obfuscated export keys using Fluxer's public source maps. Resilient to Fluxer updates.
        </p>
        <Codeblock
            lang="js"
            code={snippet.exampleSymbols}
        />
        <Note variant="note">
            <p class="text-sm leading-[1.75]">
                <code>getExportByName</code>, <code>getSymbol</code>, and <code>resolveSymbol</code> are async because they fetch source maps from <code>fluxerstatic.com</code>.
                <code>getExportByDisplayName</code> is sync and works for React <code>forwardRef</code> and <code>memo</code> components.
            </p>
        </Note>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Vex.gateway" code />
        <p class="text-sm text-muted-foreground">
            Subscribe to Fluxer gateway events.
        </p>
        <Codeblock
            lang="js"
            code={snippet.gateway}
        />
        <p class="text-sm font-bold">Common events:</p>
        <ul class="list-disc list-inside space-y-2 marker:text-brand text-xs">
            <li class="ml-2"><code>MESSAGE_CREATE</code> - new message</li>
            <li class="ml-2"><code>MESSAGE_UPDATE</code> - message edited</li>
            <li class="ml-2"><code>MESSAGE_DELETE</code> - message deleted</li>
            <li class="ml-2"><code>MESSAGE_DELETE_BULK</code> - bulk message delete</li>
            <li class="ml-2"><code>PRESENCE_UPDATE</code> - user presence/status changed</li>
            <li class="ml-2"><code>TYPING_START</code> - user started typing</li>
            <li class="ml-2"><code>CHANNEL_CREATE</code> / <code>CHANNEL_UPDATE</code> / <code>CHANNEL_DELETE</code></li>
            <li class="ml-2"><code>GUILD_MEMBER_ADD</code> / <code>GUILD_MEMBER_UPDATE</code> / <code>GUILD_MEMBER_REMOVE</code></li>
            <li class="ml-2"><code>VOICE_STATE_UPDATE</code> - user joined/left voice channel</li>
        </ul>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Vex.patcher" code />
        <p class="text-sm text-muted-foreground">
            Patch methods on any object. All patches are stackable and reversible.
        </p>
        <Codeblock
            lang="js"
            code={snippet.patcher}
        />
        <p class="text-sm font-bold mt-4">Example - patch <code>MessageStore</code> to intercept message deletion:</p>
        <Codeblock
            lang="js"
            code={snippet.patcherMessageStore}
        />
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Vex.contextMenu" code />
        <p class="text-sm text-muted-foreground">
            Inject items into Fluxer's context menus.
        </p>
        <Codeblock
            lang="js"
            code={snippet.contextMenu}
        />
        <p class="text-sm font-bold mt-4">Menu item options:</p>
        <Codeblock
            lang="js"
            code={snippet.contextMenuItemOptions}
        />
        <p class="text-sm font-bold mt-4">Menu methods:</p>
        <ul class="list-disc list-inside space-y-2 marker:text-brand text-xs">
            <li class="ml-2"><code>menu.append(item)</code> - add an item to the bottom with a separator above</li>
            <li class="ml-2"><code>menu.prepend(item)</code> - add an item to the top</li>
            <li class="ml-2"><code>menu.appendGroup()</code> - add multiple items grouped together at the bottom</li>
            <li class="ml-2"><code>menu.prependGroup()</code> - add multiple items grouped together at the top</li>
        </ul>
        <p class="text-sm font-bold mt-4">Context menu types:</p>
        <Codeblock
            lang="ts"
            code={snippet.contextMenuTypes}
        />
        <p class="text-sm font-bold mt-4">Available props per type:</p>
        <Codeblock
            lang="ts"
            code={snippet.contextMenuPropsPerType}
        />
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Vex.dom" code />
        <p class="text-sm text-muted-foreground">
            DOM utilities for watching and waiting for elements.
        </p>
        <Codeblock
            lang="js"
            code={snippet.dom}
        />
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Vex.react" code />
        <p class="text-sm text-muted-foreground">
            Utilities for traversing React's fiber tree.
        </p>
        <Codeblock
            lang="js"
            code={snippet.react}
        />
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Vex.toast" code />
        <p class="text-sm text-muted-foreground">
            Show toast notifications.
        </p>
        <Codeblock
            lang="js"
            code={snippet.toasts}
        />
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="Tips and patterns" />
        <p class="text-sm font-bold">Always clean up in <code>stop()</code>:</p>
        <Codeblock
            lang="js"
            code={snippet.tipCleanUp}
        />
        <p class="text-sm font-bold mt-4">Getting the current user:</p>
        <Codeblock
            lang="js"
            code={snippet.getCurrentUser}
        />
        <p class="text-sm font-bold mt-4">Getting the current channel/guild:</p>
        <Codeblock
            lang="js"
            code={snippet.getCurrentChannelOrGuild}
        />
        <p class="text-sm font-bold mt-4">Sending a message:</p>
        <Codeblock
            lang="js"
            code={snippet.sendMessage}
        />
        <p class="text-sm font-bold mt-4">Opening a modal:</p>
        <Codeblock
            lang="js"
            code={snippet.openModal}
        />
    </div>
</div>
