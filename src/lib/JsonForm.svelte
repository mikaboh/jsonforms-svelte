<script lang="ts">
	import Paper, { Title, Subtitle, Content } from '@smui/paper';
	import Converter from './converter';
	import { Data, DataEntry } from './data';
	import HelperText from '@smui/textfield/helper-text';
	import CharacterCounter from '@smui/textfield/character-counter';
	import Icon from '@smui/textfield/icon';

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
	let dataInstance = new Data(entries);

	/*
	 * Export the data as JSON string.
	 */
	export let data: string;
	$: {
		data = dataInstance.toJson();
	}

	console.log(converter.getFormfields);
</script>

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
					withLeadingIcon={formField.leadingIcon !== undefined}
					bind:value={dataInstance.entries[i].value}
					bind:invalid={formField.invalid}
					updateInvalid
					bind:dirty={formField.dirty}
				>
					<svelte:fragment slot="leadingIcon">
						{#if formField.leadingIcon}
							<Icon class="material-icons">{formField.leadingIcon}</Icon>
						{/if}
					</svelte:fragment>

					<svelte:fragment slot="helper">
						<HelperText validationMsg>{formField.validationMsg}</HelperText>
						{#if formField.input$maxlength}
							<CharacterCounter>0 / {formField.input$maxlength}</CharacterCounter>
						{/if}
					</svelte:fragment>
				</svelte:component>
			</div>
		{/each}
	</Content>
</Paper>

<style>
	.subtitle {
		margin-bottom: 20px;
	}
	.form-field {
		margin-bottom: 20px;
	}
</style>
