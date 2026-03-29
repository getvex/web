<script lang="ts">
    import { PUBLIC_GITHUB_ORG } from "$env/static/public"
</script>

<div class="flex flex-col w-full gap-10">
    <div class="flex flex-col gap-5">
        <p class="text-sm text-muted-foreground">
            There are a few ways to get your theme listed on the Vex website:
        </p>
        <ul class="list-disc list-inside space-y-0.5 marker:text-brand text-xs mt-2">
            <li class="ml-2">
                Fork the <a href="${PUBLIC_GITHUB_ORG}/vex" target="_blank" class="link">Vex repository</a> and submit a Pull Request to add your theme.
            </li>
            <li class="ml-2">
                Send me a DM on Fluxer <b>@bizo#1000</b>
            </li>
            <li class="ml-2">
                Join the <a href="/join" target="_blank" class="link">Vex Community</a> and send your theme file into the <b>#theme-showcase</b> channel
            </li>
        </ul>
    </div>
</div>
