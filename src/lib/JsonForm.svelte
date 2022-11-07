<script lang="ts">
	import Paper, { Title, Subtitle, Content } from '@smui/paper';
	import Converter from './converter';
	import { Data, DataEntry } from './data';

	export let schema: any;
	export let title: string | undefined;
	export let subtitle: string | undefined;

	let converter = new Converter(schema);
	let entries = [
		new DataEntry('name', null),
		new DataEntry('firstName', null),
		new DataEntry('title', ''),
		new DataEntry('date', null),
		new DataEntry('matriculationNumber', null),
		new DataEntry('textarea', '')
	];
	let data = new Data(entries);
</script>

<div class="paper-container">
	<Paper>
		{#if title}
			<Title>{title}</Title>
		{/if}
		{#if subtitle}
			<Subtitle>{subtitle}</Subtitle>
		{/if}
		<Content>
			{#each converter.getFormfields as formField, i}
				<svelte:component
					this={formField.component}
					{...formField}
					bind:value={data.entries[i].value}
				/>
			{/each}
		</Content>
		{#each data.entries as entry}
			<p>{entry.value}</p>
		{/each}
	</Paper>
</div>
