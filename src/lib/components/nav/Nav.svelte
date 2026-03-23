<script lang="ts">
    import { ThemeToggle } from "@components/theme-toggle"
    import { Icon } from "@steeze-ui/svelte-icon"
    import { Vex } from "@icons/vex"
</script>

<header class="w-full p-3 sticky top-0 left-0 z-999">
    <div class="w-full md:p-6 p-4 border flex items-center backdrop-blur-xl md:rounded-3xl rounded-2xl justify-between">
        <a class="flex items-center gap-6" href="/">
            <Icon src={Vex} class="w-8 h-auto" />
            <p class="font-bold md:block hidden">Vex</p>
        </a>
        <div class="flex items-center md:gap-8 gap-4 text-primary">
            <a href="/plugins" class="text-xs brightness-90 hover:brightness-150 transition-all">
                Plugins
            </a>
            <a href="/faq" class="text-xs brightness-90 hover:brightness-150 transition-all">
                FAQ
            </a>
            <a href="/docs" class="text-xs brightness-90 hover:brightness-150 transition-all">
                Docs
            </a>
            <ThemeToggle />
        </div>
    </div>
</header>
