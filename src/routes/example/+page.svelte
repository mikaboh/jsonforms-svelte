<script lang="ts">
	import JsonForm from '$lib/JsonForm.svelte';
	import schema from '../../schema.json';
</script>

<JsonForm
	title="Antrag auf Vergabe eines Studienprojektes"
	subtitle="Hochschule Esslingen"
	{schema}
/>
