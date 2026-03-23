<script lang="ts">
    import { cn } from "@lib/utils"

    type SeparatorProps = {
        class?: string
        orientation?: "vertical" | "horizontal"
    }

    let { class: className, orientation = "horizontal" }: SeparatorProps = $props()
</script>

<div class={cn("h-px bg-border", orientation === "vertical" && "w-px", className)}></div>
