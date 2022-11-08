<script lang="ts">
	import Paper, { Title, Subtitle, Content } from '@smui/paper';
	import Converter from './converter';
	import { Data, DataEntry } from './data';
	import JSONTree from 'svelte-json-tree';

	export let schema: any;

	/*
	 * Create a converter instance and pass the schema to it.
	 * The converter interprets the schema and creates form fields.
	 */
	let converter = new Converter(schema);

	/*
	 * Create a data instance to be linked to the individual form elements.
	 */
	let entries: DataEntry[] = [];
	for (let [key, value] of Object.entries(converter.getFormfields)) {
		entries.push({
			key: value.key,
			// Exception for textarea: default value must be empty string instead of null (bug in svelte-material-ui)
			value: value.textarea ? '' : null
		});
	}
	let data = new Data(entries);
</script>

<div class="wrapper">
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
		</Paper>
	</div>
	<div class="paper-container">
		<Paper>
			<div class="title">
				<Title>Data</Title>
			</div>
			<Content>
				<JSONTree value={data.toJson()} />
			</Content>
		</Paper>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		background-color: #e5edf3;
	}
	:global(html) {
		background-color: #e5edf3;
	}
	.wrapper {
		margin: 50px 200px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.paper-container {
		width: 49%;
	}
	.subtitle {
		margin-bottom: 20px;
	}
	.form-field {
		margin-bottom: 20px;
	}
</style>
