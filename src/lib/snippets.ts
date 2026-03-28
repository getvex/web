export const updateCommand = `pnpm build
pnpm repair-vex`

export const devSetup = `git clone https://github.com/bizojs/vex.git
cd vex
pnpm install
pnpm build
pnpm install-vex`

export const devRenderer = `pnpm build
pnpm repair-vex
# restart Fluxer`

export const devInstallerOrPreload = `pnpm build
pnpm uninstall-vex
pnpm install-vex
# restart Fluxer`

export const examplePlugin = `Vex.definePlugin({
    meta: {
        id: "dev.yourname.plugin-name",                   // unique reverse-domain ID
        name: "My Plugin",                                // display name
        description: "Does cool stuff.",                  // shown in plugin list
        authors: ["yourname"],                            // array of author names
        version: "1.0.0",
        restartRequired: "none",                          // "none" | "restart"
        dependencies: ["dev.yourname.some-other-plugin"], // see Dependencies section below
    },

    settings: [
        // see Settings section below
    ],

    // instance variables
    _myState: null,

    start() {
        // called when plugin is enabled
    },

    stop() {
        // called when plugin is disabled — MUST clean up everything
    },
})`

export const examplePluginSettings = `settings: [
    {
        type: "toggle",
        key: "myToggle",
        label: "My Toggle",
        description: "Turns something on or off",
        default: true,
    },
    {
        type: "text",
        key: "myText",
        label: "My Text",
        description: "A text input",
        default: "",
        placeholder: "Enter a value",
    },
    {
        type: "select",
        key: "mySelect",
        label: "My Select",
        description: "A dropdown",
        default: "option1",
        options: [
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
        ],
    },
    {
        type: "number",
        key: "myNumber",
        label: "My Number",
        description: "A number input",
        default: 42,
        min: 0,
        max: 100,
    },
]`

export const examplePluginDependencies = `meta: {
  id: "dev.yourname.myplugin",
  name: "My Plugin",
  dependencies: ["dev.yourname.some-other-plugin"],
  // ...
}`

export const pluginMetaInterface = `interface PluginMeta {
    readonly id: string              // unique reverse-domain ID
    readonly name: string
    readonly description: string
    readonly authors: string | string[]
    readonly version: string
    readonly restartRequired?: "none" | "restart"
    readonly dependencies?: string[] // IDs of plugins that must start first
    readonly fileName?: string       // set automatically for external plugins
}`

export const vexGlobalInterface = `interface VexGlobal {
    definePlugin(plugin: Plugin): void
    symbols: {
        getSymbol(modulePath: string, originalName: string): Promise<string | null>
        resolveSymbol(modulePath: string, minKey: string): Promise<string | null>
        getExportByName<T = unknown>(modulePath: string, originalName: string): Promise<T | null>
        getExportByDisplayName<T = unknown>(modulePath: string, displayName: string): T | null
        getModalRoot(): unknown
    }
    webpack: {
        getModule(path: string): unknown
        findModule(filter: (module: unknown) => boolean): unknown
    }
    gateway: {
        on(event: string, callback: (e: unknown) => void): UnsubFn
    }
    patcher: {
        before(obj: object, method: string, fn: (args: unknown[]) => unknown[] | void): UnsubFn
        after(obj: object, method: string, fn: (args: unknown[], result: unknown) => unknown): UnsubFn
        instead(obj: object, method: string, fn: (args: unknown[], original: Function) => unknown): UnsubFn
    }
    contextMenu: {
        patch(type: ContextMenuType, fn: (menu: ContextMenuPatcher, props: Record<string, unknown>) => void): UnsubFn
    }
    textareaMenu: {
        patch(id: string, fn: (items: Array<{ label: string; checked: boolean; onChange: (checked: boolean) => void }>) => void): () => void
    }
    chatbar: {
        addButton(button: {
            id: string
            icon: string
            tooltip: string
            onClick: (channelId: string) => void
        }): () => void
        refreshButton(id: string): void
    }
    dom: {
        waitForElement(selector: string, timeout?: number): Promise<Element>
        observe(selector: string, callback: (el: Element) => void): UnsubFn
    }
    settings: {
        get<T>(pluginId: string, key: string, defaultValue: T): T
        set(pluginId: string, key: string, value: unknown): Promise<void>
        getAll(pluginId: string): Record<string, unknown>
    }
    toast: {
        success(message: string): void
        error(message: string): void
        show(options: {
            type: "success" | "error"
            children: string
        }): void
    }
    react: {
        findFiber(element: Element, predicate: (fiber: Record<string, unknown>) => boolean): Record<string, unknown> | null
        getProp<T = unknown>(element: Element, prop: string): T | null
        findFiberInTree(predicate: (fiber: Record<string, unknown>) => boolean): Record<string, unknown> | null
    }
}`

export const vexApiInterface = `interface VexAPI {
    loadSettings(): Promise<VexSettings>
    saveSettings(settings: Partial<VexSettings>): Promise<void>
    getVersion(): string
    reloadPlugin(fileName: string): Promise<string>
    openPath(path: string): Promise<void>
    getAppdataPath(): Promise<string>
	getPluginsDir(): Promise<string>
	getThemesDir(): Promise<string>
	getVexDir(): Promise<string>
    loadPlugins(): Promise<Array<{ name: string; code: string }>>
    loadThemes(): Promise<Array<{ name: string; css: string }>>
    getThemes(): ThemeState[]
    loadBuiltinPlugins(): Promise<Array<{ name: string; code: string; builtin: boolean }>>
    openThemesFolder(): Promise<void>
    readQuickCSS(): Promise<string>
    writeQuickCSS(css: string): Promise<void>
    openQuickCSSEditor(): Promise<void>
    onQuickCSSUpdate(callback: (css: string) => void): void
}`

export const pluginSettingsAsToggle = `interface PluginSettings {
    type: "toggle"
    key: string
    label: string
    description?: string
    default: boolean
}`

export const pluginSettingsAsInput = `interface PluginSettings {
    type: "input"
    key: string
    label: string
    description?: string
    default: boolean
    placeholder?: string
}`

export const pluginSettingsAsNumber = `interface PluginSettings {
    type: "input"
    key: string
    label: string
    description?: string
    default: number
    min?: number
    max?: number
    step?: number
}`

export const pluginSettingsAsSelect = `interface PluginSettings {
    type: "select"
    key: string
    label: string
    description?: string
    default: string
    options: {
        label: string
        value: string
    }[]
}`

export const exampleSettings = `// Get a single value with a default fallback
const enabled = Vex.settings.get("dev.me.my-plugin", "myToggle", true)

// Get all settings for your plugin
const all = Vex.settings.getAll("dev.me.my-plugin")
// -> { myToggle: true, myText: "hello", ... }

// Set a value
await Vex.settings.set("dev.me.my-plugin", "myToggle", false)`

export const exampleWebpack = `// Get a module by its source path
const presenceStore = Vex.webpack.getModule("./src/stores/PresenceStore.tsx")?.A
const userStore = Vex.webpack.getModule("./src/stores/UserStore.tsx")?.A
const channelStore = Vex.webpack.getModule("./src/stores/ChannelStore.tsx")?.A

// Find a module by its exports (useful when you don't know the path)
const mod = Vex.webpack.findModule(mod => mod?.getStatus && mod?.isMobile)`

export const exampleSymbols = `// Get a module export by its original function name (async)
const send = await Vex.symbols.getExportByName(
    "./src/actions/MessageActionCreators.tsx",
    "send"
)
send(channelId, { content: "Hello!" })

// Get the minified key for an original name (async)
const key = await Vex.symbols.getSymbol(
    "./src/actions/MessageActionCreators.tsx",
    "send"
) // -> "tN"

// Get the original name for a minified key (async)
const name = await Vex.symbols.resolveSymbol(
    "./src/actions/MessageActionCreators.tsx",
    "tN"
) // -> "send"

// Get a React component by its displayName (sync)
const Button = Vex.symbols.getExportByDisplayName(
    "./src/components/uikit/button/Button.tsx",
    "Button"
)
const ModalHeader = Vex.symbols.getExportByDisplayName(
    "./src/components/modals/Modal.tsx",
    "ModalHeader"
)`

export const gateway = `start() {
    this._unsubDelete = Vex.gateway.on("MESSAGE_DELETE", e => {
        console.log("Message deleted:", e.id, "in channel:", e.channel_id)
    })

    this._unsubUpdate = Vex.gateway.on("MESSAGE_UPDATE", e => {
        console.log("Message edited:", e.id, "new content:", e.content)
    })
},

stop() {
    this._unsubDelete?.()
    this._unsubUpdate?.()
}`

export const patcher = `// before - runs before original, can modify arguments
const unpatch = Vex.patcher.before(obj, "methodName", (args) => {
    console.log("before:", args)
    args[0] = "modified" // modify first argument
    return args          // return modified args (optional)
})

// after - runs after original, can modify return value
const unpatch = Vex.patcher.after(obj, "methodName", (args, result) => {
    console.log("after:", result)
    return { ...result, extra: true } // return modified result (optional)
})

// instead - replaces original entirely
const unpatch = Vex.patcher.instead(obj, "methodName", (args, original) => {
    if (someCondition) return original(...args) // call original yourself
    return "custom return value"
})

// always clean up in stop()
stop() {
    unpatch()
}`

export const patcherMessageStore = `start() {
    const msgStore = Vex.webpack.getModule("./src/stores/MessageStore.tsx")?.A
    this._unpatch = Vex.patcher.instead(
        msgStore,
        "handleMessageDelete",
        (args, original) => {
            console.log("Intercepted delete:", args[0])
            return original(...args)
        }
    )
},

stop() {
    this._unpatch?.()
}`

export const contextMenu = `start() {
    // Patch message context menu
    this._unsubMsg = Vex.contextMenu.patch("message", (menu, props) => {
        const message = props.message
        menu.append({
            label: "Copy Message ID",
            onClick: () => navigator.clipboard.writeText(message.id)
        })
    })

    // Patch user context menu
    this._unsubUser = Vex.contextMenu.patch("user", (menu, props) => {
        const user = props.user
        menu.prepend({
            label: "View Profile",
            icon: "M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z",
            onClick: () => console.log("Viewing profile of", user.id)
        })
    })

    // Patch guild context menu
    this._unsubGuild = Vex.contextMenu.patch("guild", (menu, props) => {
        const guild = props.guild
        menu.append({
            label: "Copy Server ID",
            onClick: () => navigator.clipboard.writeText(guild.id)
        })
    })

    // Patch channel context menu
    this._unsubChannel = Vex.contextMenu.patch("channel", (menu, props) => {
        menu.append({
            label: "My Channel Action",
            danger: true, // red color
            onClick: () => console.log("channel action")
        })
    })
},

stop() {
    this._unsubMsg?.()
    this._unsubUser?.()
    this._unsubGuild?.()
    this._unsubChannel?.()
}`

export const contextMenuItemOptions = `{
    label: "Item Label",      // required
    onClick: () => {},        // required
    danger: false,            // optional - red danger style
    disabled: false,          // optional - greyed out, non-clickable
    icon: "M...",             // optional - SVG path string (Phosphor icons recommended)
}`

export const contextMenuTypes = `"message" | "user" | "guild" | "channel" | "groupDM"`

export const contextMenuPropsPerType = `message: { message, onClose, onDelete, linkUrl }
user: { user, onClose, guildId? }
guild: { guild, onClose }
channel: { channel, onClose }
groupDM: { channelId, userId, onClose }`

export const dom = `// Wait for an element to appear (returns a Promise)
const el = await Vex.dom.waitForElement('[class*="messageUsername"]')
console.log("Found:", el)

// With custom timeout (default 10000ms)
const el = await Vex.dom.waitForElement('[data-message-id]', 5000)

// Observe elements as they appear (fires for existing + new elements)
// Returns an unsubscribe function
const unsub = Vex.dom.observe('[class*="messageUsername"]', el => {
    const userId = el.getAttribute("data-user-id")
    console.log("New username element for user:", userId)
})

// Clean up in stop()
stop() {
    unsub()
}`

export const react = `// Find a fiber ancestor matching a predicate
const fiber = Vex.react.findFiber(element, fiber => !!fiber.memoizedProps?.user?.id)
console.log("User:", fiber?.memoizedProps?.user)

// Get a specific prop from the nearest fiber that has it
const user = Vex.react.getProp(element, "user")
const message = Vex.react.getProp(element, "message")
const guildId = Vex.react.getProp(element, "guildId")

// Search the entire React tree from root
const fiber = Vex.react.findFiberInTree(fiber => {
    return fiber.memoizedProps?.channelId === "123456789"
})`

export const toasts = `Vex.toast.success("Settings saved!")
Vex.toast.error("Something went wrong.")
Vex.toast.show({ type: "success", children: "Custom toast message" })
Vex.toast.destroy(toastId)`

export const tipCleanUp = `stop() {
    // Unsubscribe all gateway listeners
    this._unsubDelete?.()
    this._unsubUpdate?.()

    // Remove context menu patches
    this._ctxUnsub?.()

    // Remove DOM observers
    this._domUnsub?.()

    // Remove injected DOM elements
    document.querySelectorAll("[data-my-plugin]").forEach(el => el.remove())

    // Clear state
    this._myMap?.clear()
}`

export const getCurrentUser = `const currentUserId = Vex.webpack.getModule("./src/stores/UserStore.tsx")?.A?.currentUserId
const currentUser = Vex.webpack.getModule("./src/stores/UserStore.tsx")?.A?.currentUser`

export const getCurrentChannelOrGuild = `const channelId = Vex.webpack.getModule("./src/stores/SelectedChannelStore.tsx")?.A?.currentChannelId
const guildId = Vex.webpack.getModule("./src/stores/SelectedGuildStore.tsx")?.A?.selectedGuildId`

export const sendMessage = `const send = await Vex.symbols.getExportByName(
    "./src/actions/MessageActionCreators.tsx",
    "send"
)
send(channelId, { content: "Hello!" })`

export const openModal = `const React = Vex.webpack.getModule("../node_modules/.pnpm/react@19.2.4/node_modules/react/index.js")
const modalActions = Vex.webpack.getModule("./src/actions/ModalActionCreators.tsx")
const ModalRoot = Vex.symbols.getModalRoot()

modalActions.push(() => React.createElement(ModalRoot, { onClose: () => modalActions.uY() },
    React.createElement("div", null, "Hello from modal!")
))`

export const exampleTheme = `/**
 * @name Forest
 * @description A minimal green forest style.
 * @author yourname
 * @version 1.0.0
 * @website https://github.com
 */
:root {
  --background-tertiary: #2b332e;
  --background-secondary: #3b453e;
  --background-secondary-lighter: #404a44;
  --background-modifier-accent: #5e6e64;
  --background-primary: #2b332e;
  --background-secondary-alt: #212723;
  --panel-control-bg: #2b332e;
  --background-textarea: #2b332e;
  --guild-list-foreground: #4e5c53;
  --folder-surface: #2b332e;
  --brand-primary-light: #d5f7e1;
  --user-area-divider-color: #48544c;
  --text-tertiary-muted: #a6b3aa;
  --surface-interactive-selected-color: #e4f7e9;
  --text-primary: #ebfaef;
  --text-primary-muted: #a6b3aa;
  --text-chat: #ebfaef;
  --text-tertiary: #d3e3d7;
  --brand-primary: #6cad7d;
}`

export const themeMeta = `/**
 * @name The name of your theme
 * @description A description of your theme.
 * @author you
 * @version 1.0.0
 * @website https://github.com
 */`
