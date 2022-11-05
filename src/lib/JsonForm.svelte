<script lang="ts">
	import TextField from './components/TextField.svelte';

	export let schema: any;

	let schemaArray: Array<any> = [];
	Object.entries(schema.properties).forEach((entry) => {
		const [key, value] = entry;
		let entryJson = {
			[key]: value
		};
		schemaArray.push(entryJson);
	});
	//console.log(schemaArray);
</script>

<TextField label={'asd'} />
{#each schemaArray as formElement, i}
	{console.log(formElement.name)}
	<h1>{formElement}</h1>
	<TextField label={formElement.label} />
{/each}
