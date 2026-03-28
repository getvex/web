<script lang="ts">
	import { Check, Copy } from "@steeze-ui/phosphor-icons"
	import { Icon } from "@steeze-ui/svelte-icon"
    import { Button } from "@components/button"
	import { cn, delay } from "@lib/utils"
    import { ShikiHandler } from "@shiki"

    type Props = {
        lang?: string
        code: string
        filename?: string
    }

    let { lang = "svelte", code, filename }: Props = $props()
    let copying = $state(false)

    async function copyToClipboard() {
        try {
            navigator.clipboard.writeText(code)
            copying = true
            await delay(2000)
            copying = false
        } catch (error) {
            console.log(error)
            copying = false
        }
    }
</script>

<div class="flex justify-center w-full overflow-hidden! -z-1 relative">
    <div class="flex w-full flex-col rounded-xl border overflow-hidden! h-fit mb-auto -z-1">
        <div class="flex flex-col w-full text-sm">
            <div class={cn(
                "flex w-full items-center",
                filename ? "justify-between bg-border" : "justify-end"
            )}>
                {#if filename}
                    <div class="h-10 w-fit px-3 flex items-center justify-center select-none">
                        <p class="text-sm font-semibold leading-none">{filename}</p>
                    </div>
                {/if}
                <Button
                    variant="ghost"
                    size="icon"
                    class={cn("size-8", filename ? "mr-1" : "absolute top-1.25 right-1.25 backdrop-blur-lg")}
                    onclick={copyToClipboard}
                    disabled={copying}
                >
                    <Icon src={copying ? Check : Copy} theme="bold" class="size-4" />
                </Button>
            </div>
            {@html ShikiHandler.codeToHtml(code, lang)}
        </div>
    </div>
</div>
