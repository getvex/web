import { PUBLIC_GITHUB_REPO, PUBLIC_GITHUB_SPONSOR_URL } from "$env/static/public"
import { BracketsRound, DesktopTower, FileCss, FireSimple, Heart, PlugCharging } from "@steeze-ui/phosphor-icons"
import type { Link, Feature } from "@types"
import { Fluxer } from "@icons/fluxer"
import { GitHub } from "@icons/github"

export const links: Link[] = [
    {
        href: "/join",
        icon: { src: Fluxer }
    },
    {
        href: PUBLIC_GITHUB_REPO,
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
        "title": "Cross-platform",
        "description": "Supports Windows and Linux (including Flatpak)."
    }
]
