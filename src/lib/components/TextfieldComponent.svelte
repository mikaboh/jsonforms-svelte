<script lang="ts">
	import Textfield from '@smui/textfield';

	export let key: string;
	export let value: string | null;
	export let label: string | undefined;
	export let maxLength: number | undefined;
</script>

<Textfield bind:value {label} style="width: 100%;" input$maxlength={maxLength} />
