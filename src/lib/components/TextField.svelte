<script lang="ts">
	import Textfield from '@smui/textfield';

	export let label: string;

	let focused = false;
	let value: string | null = null;
	let dirty = false;
	let invalid = false;
</script>

<div class="margins">
	<Textfield
		type="text"
		bind:dirty
		bind:invalid
		updateInvalid
		bind:value
		{label}
		style="width: 100%"
		on:focus={() => (focused = true)}
		on:blur={() => (focused = false)}
	/>
</div>
