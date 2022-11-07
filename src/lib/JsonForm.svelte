<script lang="ts">
	import Paper, { Title, Subtitle, Content } from '@smui/paper';
	import Converter from './converter';
	import { Data, DataEntry } from './data';

	export let schema: any;

	let converter = new Converter(schema);
	let entries = [
		new DataEntry('name', null),
		new DataEntry('firstName', null),
		new DataEntry('matriculationNumber', null),
		new DataEntry('telephoneNumber', null),
		new DataEntry('email', null),
		new DataEntry('courseOfStudies', null),
		new DataEntry('title', ''),
		new DataEntry('firstExaminer', null),
		new DataEntry('secondExaminer', null),
		new DataEntry('startDate', null),
		new DataEntry('endDate', null),
		new DataEntry('date', null)
	];
	let data = new Data(entries);
</script>

<div class="paper-container">
	<Paper>
		{#if schema.title}
			<div class="title">
				<Title>{schema.title}</Title>
			</div>
		{/if}
		{#if schema.subtitle}
			<div class="subtitle">
				<Subtitle>{schema.subtitle}</Subtitle>
			</div>
		{/if}
		<Content>
			{#each converter.getFormfields as formField, i}
				<div class="form-field">
					<svelte:component
						this={formField.component}
						{...formField}
						bind:value={data.entries[i].value}
					/>
				</div>
			{/each}
		</Content>
		{#each data.entries as entry}
			<p>{entry.value}</p>
		{/each}
	</Paper>
</div>

<style>
	.subtitle {
		margin-bottom: 20px;
	}
	.form-field {
		margin-bottom: 20px;
	}
</style>
