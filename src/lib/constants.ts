import { BracketsRound, DesktopTower, FileCss, Files, FireSimple, Gear, Heart, HouseLine, Palette, PlugCharging, QuestionMark } from "@steeze-ui/phosphor-icons"
import { PUBLIC_GITHUB_ORG, PUBLIC_GITHUB_SPONSOR_URL } from "$env/static/public"
import type { Link, Feature, Preview, FAQ, NavLink } from "@types"
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

export const navLinks: NavLink[] = [
    {
        href: "/plugins",
        text: "Plugins",
        icon: { src: PlugCharging, theme: "fill" }
    },
    {
        href: "/themes",
        text: "Themes",
        icon: { src: Palette, theme: "fill" }
    },
    {
        href: "/faq",
        text: "FAQ",
        icon: { src: QuestionMark, theme: "fill" }
    },
    {
        href: "/docs",
        text: "Docs",
        icon: { src: Files, theme: "fill" }
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

export const faq: FAQ[] = [
    {
        title: "Will I get banned for using Vex?",
        answer: `<p>No. Fluxer will not ban you for using client modifications. In fact, they encourage it!</p>`
    },
    {
        title: "How do I install Vex?",
        answer: `
            <p>You can install Vex with the command <code>pnpm install-vex</code>.</p>
            <p>For in-depth install instructions, please refer to our <a href="/docs" class="link">documentation</a>.</p>
        `
    },
    {
        title: "How do I uninstall Vex?",
        answer: `
            <p>You can uninstall Vex the same way you installed it, with the command <code>pnpm uninstall-vex</code>.</p>
            <p>For further in-depth instructions, please refer to our <a href="/docs" class="link">documentation</a>.</p>
        `
    },
    {
        title: "Can I use Vex on Fluxer web?",
        answer: `<p>No. Vex only supports the Fluxer Desktop app (electron). We have no plans to support any other way of using Fluxer.</p>`
    },
    {
        title: "How do I install custom themes?",
        answer: `
            <p>You can install custom themes by putting <code>.css</code> files into your Vex themes folder.</p>
            <p>For further in-depth instructions, please refer to our <a href="/docs" class="link">documentation</a>.</p>
        `
    },
]
