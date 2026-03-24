<script lang="ts">
    import { buttonVariants, type Props } from "@components/button"
    import { CaretLeft } from "@steeze-ui/phosphor-icons"
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

    const emblaCtx = getEmblaContext("<Carousel.Previous/>")
</script>

<button
    data-slot="carousel-previous"
    aria-disabled={!emblaCtx.canScrollPrev}
    disabled={!emblaCtx.canScrollPrev}
    class={cn(
        buttonVariants({ variant, size }),
        "rounded-full absolute touch-manipulation",
        emblaCtx.orientation === "horizontal"
            ? "md:-inset-s-12 -inset-s-2.5 top-1/2 translate-y-1/2"
            : "inset-s-1/2 -top-12 -translate-x-1/2 rotate-90",
        className
    )}
    onclick={emblaCtx.scrollPrev}
    onkeydown={emblaCtx.handleKeyDown}
    {...restProps}
>
    <Icon src={CaretLeft} theme="bold" class="size-4 pointer-events-none" />
    <span class="sr-only">Previous slide</span>
</button>
