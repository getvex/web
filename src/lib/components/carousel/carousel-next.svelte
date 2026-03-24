<script lang="ts">
    import { buttonVariants, type Props } from "@components/button"
    import { CaretRight } from "@steeze-ui/phosphor-icons"
    import { cn, type WithoutChildren } from "@lib/utils"
    import { Icon } from "@steeze-ui/svelte-icon"
    import { getEmblaContext } from "./context"

    let {
        ref = $bindable(null),
        class: className,
        variant = "outline",
        size = "icon-sm",
        ...restProps
    }: WithoutChildren<Props> = $props()

    const emblaCtx = getEmblaContext("<Carousel.Next/>")
</script>

<button
    data-slot="carousel-next"
    aria-disabled={!emblaCtx.canScrollNext}
    disabled={!emblaCtx.canScrollNext}
    class={cn(
        buttonVariants({ variant, size }),
        "rounded-full absolute touch-manipulation",
        emblaCtx.orientation === "horizontal"
            ? "md:-inset-e-12 -inset-e-2.5 top-1/2 translate-y-1/2"
            : "inset-s-1/2 -bottom-12 -translate-x-1/2 rotate-90",
        className
    )}
    onclick={emblaCtx.scrollNext}
    onkeydown={emblaCtx.handleKeyDown}
    {...restProps}
>
    <Icon src={CaretRight} theme="bold" class="size-4 pointer-events-none" />
    <span class="sr-only">Next slide</span>
</button>
