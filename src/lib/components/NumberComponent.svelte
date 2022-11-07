<script lang="ts">
	import Textfield from '@smui/textfield';

	export let key: string;
	export let value: number | null;
	export let label: string | undefined;
</script>

<Textfield type="number" bind:value {label} style="width: 100%;" />
