<script lang="ts" module>
    import type { HTMLButtonAttributes, HTMLAnchorAttributes } from "svelte/elements"
    import { type VariantProps, tv } from "tailwind-variants"
    import { cn, type WithElementRef } from "@lib/utils"
    import type { Snippet } from "svelte"

    export const buttonVariants = tv({
        base: "cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-xl border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all duration-200 outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/80",
                outline: "border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs",
                muted: "bg-muted text-primary hover:bg-muted/80 aria-expanded:bg-muted aria-expanded:text-primary",
                ghost: "hover:bg-muted border-transparent hover:border-border",
                destructive: "border-destructive/40 bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
                brand: "bg-linear-to-br from-brand-start to-brand-end text-primary-foreground hover:brightness-120"
            },
            size: {
                default: "h-9 gap-2.5 px-3 in-data-[slot=button-group]:rounded-md text-xs",
                sm: "h-8 gap-1 rounded-lg px-2.5 in-data-[slot=button-group]:rounded-md text-2xs",
                lg: "h-10 gap-3 px-4",
                icon: "size-9",
                "icon-sm": "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
                "icon-lg": "size-10"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    })

    export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"]
    export type ButtonSize = VariantProps<typeof buttonVariants>["size"]

    export type ButtonProps =
        WithElementRef<HTMLButtonAttributes> &
        WithElementRef<HTMLAnchorAttributes> &
        {
            class?: string
            href?: string
            type?: "button" | "reset" | "submit"
            animate?: boolean
            disabled?: boolean
            children?: Snippet
            variant?: ButtonVariant
            size?: ButtonSize
        }
</script>

<script lang="ts">
    const {
        class: className,
        variant = "default",
        size = "default",
        href = undefined,
        type = "button",
        animate = true,
        ref = $bindable(null),
        disabled,
        children,
        ...restProps
    }: ButtonProps = $props()
</script>

{#if href}
    <a
        data-slot="button"
        class={cn(buttonVariants({ variant, size }), className, animate && "active:translate-y-0.5")}
        href={disabled ? undefined : href}
        aria-disabled={disabled}
        role={disabled ? "link" : undefined}
        tabindex={disabled ? -1 : undefined}
        {...restProps}
    >
        {@render children?.()}
    </a>
{:else}
    <button
        data-slot="button"
        class={cn(buttonVariants({ variant, size }), className, animate && "active:translate-y-0.5")}
        {type}
        {disabled}
        {...restProps}
    >
        {@render children?.()}
    </button>
{/if}
