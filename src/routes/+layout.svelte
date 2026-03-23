<script lang="ts">
	import "./layout.css"
    import { ModeWatcher } from "mode-watcher"
    import { Noise } from "@components/noise"
    import { Vex } from "@components/vex"

	let { children } = $props()
</script>

<Noise />
<ModeWatcher />

<Vex>
    {@render children()}
</Vex>
