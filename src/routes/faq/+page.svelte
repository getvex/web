<script lang="ts">
    import { Collapsible } from "@components/collapsible"
  import { faq } from "@lib/constants";
</script>

<div class="relative flex w-full items-center flex-col gap-10">
    <section class="flex flex-col gap-10 md:max-w-2/3 max-w-full text-center min-h-[80vh] w-full">
        <div class="flex flex-col gap-10 w-full my-10">
            <h1 class="text-7xl font-black dark:drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_20%,oklch(0%_0_0/0))] drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_50%,oklch(0%_0_0/0))]">
                <span class="relative">
                    <span class="w-full left-0 bottom-1 drop-shadow-xl -rotate-1 absolute h-3 -z-1 bg-linear-to-r from-brand-start to-brand-end"></span>
                    FAQ
                </span>
            </h1>
            <p class="text-muted-foreground text-base">
                Frequently asked Questions about Vex.
            </p>
        </div>
        <div class="flex flex-col gap-4 w-full">
            {#each faq as question, i (i)}
                {@const delay = (i * 50)}
                <Collapsible {delay} title={question.title} class="bg-primary/5 p-3 w-full! text-start rounded-xl border">
                    <div class="bg-primary/10 p-2 rounded-lg text-xs text-primary/70">
                        {@html question.answer.trim()}
                    </div>
                </Collapsible>
            {/each}
            <!-- <Collapsible title="Will I get banned for using Vex?" class="bg-primary/5 p-3 w-full! text-start rounded-xl border">
                <div class="bg-primary/10 p-2 rounded-lg text-xs text-primary/70">
                    <p>No. Fluxer will not ban you for using Vex. In fact, they encourage it!</p>
                </div>
            </Collapsible>
            <Collapsible title="How do I install Vex?" class="bg-primary/5 p-3 w-full! text-start rounded-xl border">
                <div class="bg-primary/10 p-2 rounded-lg text-xs text-primary/70">
                    <p>You can install Vex with the command <code>pnpm install-vex</code>.</p>
                    <p>For in-depth install instructions, please refer to our <a href="/docs" class="link">documentation</a>.</p>
                </div>
            </Collapsible>
            <Collapsible title="How do I uninstall Vex?" class="bg-primary/5 p-3 w-full! text-start rounded-xl border">
                <div class="bg-primary/10 p-2 rounded-lg text-xs text-primary/70">
                    <p>You can uninstall Vex the same way you installed it, with the command <code>pnpm uninstall-vex</code>.</p>
                    <p>For further in-depth instructions, please refer to our <a href="/docs" class="link">documentation</a>.</p>
                </div>
            </Collapsible>
            <Collapsible title="Can I use Vex on Fluxer web?" class="bg-primary/5 p-3 w-full! text-start rounded-xl border">
                <div class="bg-primary/10 p-2 rounded-lg text-xs text-primary/70">
                    <p>No. Vex only supports the Fluxer Desktop app (electron). We have no plans to support any other way of using Fluxer.</p>
                </div>
            </Collapsible>
            <Collapsible title="How do I install custom themes?" class="bg-primary/5 p-3 w-full! text-start rounded-xl border">
                <div class="bg-primary/10 p-2 rounded-lg text-xs text-primary/70">
                    <p>You can't yet. This feature is coming soon.</p>
                </div>
            </Collapsible> -->
        </div>
    </section>
</div>
