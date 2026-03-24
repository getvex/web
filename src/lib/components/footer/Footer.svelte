<script lang="ts">
    import { ThemeToggle } from "@components/theme-toggle"
    import { Separator } from "@components/separator"
    import { Icon } from "@steeze-ui/svelte-icon"
    import { Button } from "@components/button"
    import { links } from "@constants"
    import { Vex } from "@icons/vex"
</script>

<footer class="w-full p-3">
    <div class="w-full md:p-6 p-4 border flex md:flex-row flex-col md:items-end items-start backdrop-blur-xl gap-2 md:rounded-3xl rounded-2xl justify-between">
        <div class="flex flex-col md:gap-8 gap-4 w-full">
            <div class="flex flex-col gap-4">
                <a class="flex items-center gap-6 text-primary hover:text-muted-foreground transition-colors w-fit" href="/">
                    <Icon src={Vex} class="w-8 h-auto text-inherit" />
                    <p class="font-bold text-inherit">Vex</p>
                </a>
                <p class="text-sm">A plugin loader for {@render link("https://fluxer.app", "Fluxer")}</p>
            </div>
            <div class="flex flex-col">
                <p class="text-2xs text-muted-foreground">
                    {@render link("https://fluxer.app", "Fluxer")} is a trademark of Fluxer Platform AB.
                </p>
                <p class="text-2xs text-muted-foreground">
                    Vex is not affiliated with or endorsed by Fluxer Platform AB.
                </p>
            </div>
        </div>
        <Separator class="block md:hidden" />
        <div class="flex gap-2">
            {#each links as link}
                <Button
                    href={link.href}
                    target="_blank"
                    variant="outline"
                    size="icon"
                    class="text-muted-foreground hover:text-primary transition-colors rounded-xl"
                >
                    <Icon {...link.icon} class="size-4 text-inherit" />
                </Button>
            {/each}
            <ThemeToggle class="text-muted-foreground hover:text-primary transition-colors" />
        </div>
    </div>
</footer>

{#snippet link(url: string, text: string)}
    <a href={url} target="_blank" class="link">{text}</a>
{/snippet}
