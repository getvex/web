import { PUBLIC_GITHUB_ORG, PUBLIC_GITHUB_SPONSOR_URL } from "$env/static/public"
import { BracketsRound, DesktopTower, FileCss, FireSimple, Gear, Heart, HouseLine, PlugCharging } from "@steeze-ui/phosphor-icons"
import type { Link, Feature, Preview } from "@types"
import { Fluxer } from "@icons/fluxer"
import { GitHub } from "@icons/github"

export const links: Link[] = [
    {
        href: "/join",
        icon: { src: Fluxer }
    },
    {
        href: PUBLIC_GITHUB_ORG,
        icon: { src: GitHub }
    },
    {
        href: PUBLIC_GITHUB_SPONSOR_URL,
        icon: { src: Heart, theme: "fill" }
    },
]

export const features: Feature[] = [
    {
        icon: { src: GitHub },
        title: "Open source",
        description: "Vex is open source and can be found on GitHub."
    },
    {
        icon: { src: BracketsRound, color: "text-brand" },
        title: "Plugin API",
        description: "Vex includes a number of useful tools for creating plugins."
    },
    {
        icon: { src: FireSimple, theme: "duotone", color: "text-red-400" },
        title: "Hot Reloading",
        description: "Reload your plugins without having to restart Fluxer."
    },
    {
        icon: { src: FileCss, theme: "fill", color: "text-indigo-700" },
        title: "Quick CSS Editor",
        description: "Built-in Monaco editor for live editing CSS on the fly."
    },
    {
        icon: { src: PlugCharging, theme: "fill", color: "text-emerald-400" },
        title: "Built-in Plugins",
        description: "Includes a handlfull of pre-made plugins to showcase the power of Vex."
    },
    {
        icon: { src: DesktopTower, theme: "fill", color: "text-muted-foreground" },
        title: "Cross-platform",
        description: "Supports Windows and Linux (including Flatpak)."
    }
]

export const previews: Preview[] = [
    {
        icon: { src: HouseLine, theme: "fill", color: "text-muted-foreground" },
        title: "Vex Home",
        description: {
            desktop: "Featuring an information card and a list of quick action buttons to get you started."
        },
        image_key: "main"
    },
    {
        icon: { src: PlugCharging, theme: "fill", color: "text-brand" },
        title: "Plugins List",
        description: {
            desktop: "Toggle, hot-reload, and customize any settings provided by the plugin.",
            mobile: "Toggle, hot-reload, and customize any settings provided by the plugin."
        },
        image_key: "plugins"
    },
    {
        icon: { src: Gear, theme: "fill", color: "text-primary" },
        title: "Native Settings",
        description: {
            desktop: "Native settings category featuring pages for managing Vex. Optional plugin provided to reveal the \"Staff Only\" category. Use at your own risk.",
            mobile: "Native settings category featuring pages for managing Vex."
        },
        image_key: "settings"
    }
]
