<script lang="ts" module>
    import { Info, Lightbulb, Warning, WarningCircle, WarningOctagon } from "@steeze-ui/phosphor-icons"
    import { type VariantProps, tv } from "tailwind-variants"
    import { Icon } from "@steeze-ui/svelte-icon"
    import type { Snippet } from "svelte"
    import { cn } from "@lib/utils"

    export const noteVariants = tv({
        base: "flex gap-2",
        variants: {
            icon: {
                note: Info,
                tip: Lightbulb,
                important: Warning,
                warning: WarningOctagon,
                caution: WarningCircle,
            },
            color: {
                note: "text-sky-300",
                tip: "text-green-400",
                important: "text-purple-400",
                warning: "text-amber-400",
                caution: "text-red-500",
            },
            border: {
                note: "border-sky-300",
                tip: "border-green-400",
                important: "border-purple-400",
                warning: "border-amber-400",
                caution: "border-red-500",
            }
        },
        defaultVariants: {
            icon: "note"
        }
    })

    export type NoteVariant = VariantProps<typeof noteVariants>["icon"]

    export type NoteProps = {
        class?: string
        children?: Snippet
        variant?: NoteVariant
    }
</script>

<script lang="ts">
    const {
        class: className,
        variant = "note",
        children,
        ...restProps
    }: NoteProps = $props()
</script>


<div
    class={cn(noteVariants({ icon: variant }), className)}
    {...restProps}
>
    <div class={cn(noteVariants({ border: variant }), "w-full flex flex-col gap-2 border-l-4 pl-3 py-2")}>
        <div class="flex items-center gap-2">
            <Icon src={noteVariants.variants.icon[variant]} theme="fill" class={cn(noteVariants({ color: variant }), "size-4.5!")} />
            <p class={cn(noteVariants({ color: variant }), "text-sm font-black")}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </p>
        </div>
        <div class="flex flex-col gap-1">
            {@render children?.()}
        </div>
    </div>
</div>
