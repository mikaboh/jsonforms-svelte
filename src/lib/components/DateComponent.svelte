<script lang="ts">
	import Textfield from '@smui/textfield';

	export let key: string;
	export let value: string | null;
	export let label: string | undefined;
</script>

<Textfield type="date" bind:value {label} style="width: 100%;" />
