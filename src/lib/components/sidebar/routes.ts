import { CodeBlock, Files, Palette, PlugCharging } from "@steeze-ui/phosphor-icons"
import type { SidebarRoute, SidebarRouteItem } from "@types"

export const routes: SidebarRoute[] = [
    {
        title: "Getting Started",
        icon: Files,
        items: [
            {
                title: "Introduction",
                url: "/docs/introduction"
            },
            {
                title: "Installation",
                url: "/docs/installation"
            },
            {
                title: "Usage",
                url: "/docs/usage"
            }
        ]
    },
    {
        title: "Plugins",
        icon: PlugCharging,
        items: [
            {
                title: "Introduction",
                url: "/docs/plugins/introduction"
            },
            {
                title: "Creating a Plugin",
                url: "/docs/plugins/create"
            },
            {
                title: "Submitting a Plugin",
                url: "/docs/plugins/submit"
            },
        ]
    },
    {
        title: "Themes",
        icon: Palette,
        items: [
            {
                title: "Introduction",
                url: "/docs/themes/introduction"
            },
            {
                title: "Creating a Theme",
                url: "/docs/themes/create"
            },
            {
                title: "Submitting a Theme",
                url: "/docs/themes/submit"
            },
        ]
    },
    {
        title: "Types & Interfaces",
        icon: CodeBlock,
        items: [
            {
                title: "window.Vex",
                url: "/docs/types/vex-global"
            },
            {
                title: "window.VexAPI",
                url: "/docs/types/vex-api"
            },
            {
                title: "plugin.meta",
                url: "/docs/types/plugin-meta"
            },
            {
                title: "plugin.settings",
                url: "/docs/types/plugin-settings"
            },
        ]
    },
]

export const routeMap = routes
    .map(r => r.items.map(i => ({
        ...i,
        parent: r
    })))
    .flat()
