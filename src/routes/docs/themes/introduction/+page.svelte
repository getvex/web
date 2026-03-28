<script lang="ts">
    import { Separator } from "@components/separator"
    import { SectionTitle } from "@components/docs"
</script>

<div class="flex flex-col w-full gap-10">
    <div class="flex flex-col gap-5">
        <SectionTitle title="What are Themes?" />
        <p class="text-sm text-muted-foreground">
            Themes let you customize the look and feel of Fluxer, such as colours, layout, spacing, visual style etc.
            without changing the core functionality of the app.
        </p>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="How do themes work?" />
        <p class="text-sm text-muted-foreground">
            Themes work by injecting a css file into the DOM which applies the custom styling to the UI.
        </p>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="What can themes change?" />
        <ul class="list-disc list-inside space-y-2 marker:text-brand text-xs">
            <li class="ml-2">Colors (backgrounds, text, accents)</li>
            <li class="ml-2">Layout and spacing</li>
            <li class="ml-2">Fonts and typography</li>
            <li class="ml-2">Component styling (buttons, modals, sidebar)</li>
        </ul>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
        <SectionTitle title="What themes cannot do" />
        <ul class="list-disc list-inside space-y-2 marker:text-brand text-xs">
            <li class="ml-2">Cannot change core functionality</li>
            <li class="ml-2">Cannot add new features</li>
            <li class="ml-2">Cannot interact with APIs or data</li>
        </ul>
        <p class="text-sm text-muted-foreground">
            If you need that, consider <a href="/docs/plugins/create" class="link">creating a plugin</a> instead.
        </p>
    </div>
</div>
