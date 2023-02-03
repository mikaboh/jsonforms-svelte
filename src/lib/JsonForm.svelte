<script lang="ts">
	import Paper, { Title, Subtitle, Content } from '@smui/paper/src/index.js';
	import Converter from './converter.js';
	import UIConverter from './ui-converter.js';
	import { Data } from './data.js';
	import HelperText from '@smui/textfield/helper-text';
	import CharacterCounter from '@smui/textfield/character-counter';
	import Icon from '@smui/textfield/icon';
	import Textfield from '@smui/textfield';
	import Radio from '@smui/radio/src/index.js';
	import FormField from '@smui/form-field/src/index.js';
	import Autocomplete from '@smui-extra/autocomplete/src/index.js';
	import Checkbox from '@smui/checkbox/src/index.js';
	import Select, { Option } from '@smui/select';

	export let schema: any;
	export let uischema: any = undefined;

	/*
	 * Create a converter instance and pass the schema to it.
	 * The converter interprets the schema and creates form fields.
	 */
	let converter = new Converter(schema);

	/*
	 * Create a data instance.
	 */
	let dataInstance = new Data(converter.getFormfields);

	/*
	 * Export the data as JSON string.
	 */
	export let data: string;
	$: {
		data = dataInstance.toJson();
	}

	/*
	 * Convert uischema to style.
	 */
	var style: any = '';
	$: {
		const uiConverter = new UIConverter(uischema);
		if (uischema !== undefined) {
			style = uiConverter.convert();
		}
	}
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
		<div style={style.formFieldContainer}>
			{#each converter.getFormfields as formField, i}
				<div style={style[formField.key]}>
					{#if formField.type === 'html'}
						{@html formField.html}
					{:else if formField.type === 'text' || formField.type === 'number' || formField.type === 'email' || formField.type === 'date'}
						<Textfield
							{...formField}
							withLeadingIcon={formField.leadingIcon !== undefined}
							withTrailingIcon={formField.trailingIcon !== undefined}
							bind:value={dataInstance.entries[formField.dataIndex].value}
							bind:invalid={formField.invalid}
							updateInvalid
							bind:dirty={formField.dirty}
						>
							<svelte:fragment slot="leadingIcon">
								{#if formField.leadingIcon}
									<Icon class="material-icons">{formField.leadingIcon}</Icon>
								{/if}
							</svelte:fragment>

							<svelte:fragment slot="trailingIcon">
								{#if formField.trailingIcon}
									<Icon class="material-icons">{formField.trailingIcon}</Icon>
								{/if}
							</svelte:fragment>

							<svelte:fragment slot="helper">
								<HelperText validationMsg>{formField.validationMsg}</HelperText>
								{#if formField.input$maxlength}
									<CharacterCounter>0 / {formField.input$maxlength}</CharacterCounter>
								{/if}
							</svelte:fragment>
						</Textfield>
					{:else if formField.type === 'radio'}
						{#each formField.options as radioOption}
							<FormField style="width: 100%;">
								<Radio
									{...radioOption}
									bind:group={dataInstance.entries[formField.dataIndex].value}
									value={radioOption.name}
								/>
								<span slot="label">
									{radioOption.name}{radioOption.disabled ? ' (disabled)' : ''}
								</span>
							</FormField>
						{/each}
					{:else if formField.type === 'autocomplete'}
						<Autocomplete
							{...formField}
							options={formField.options}
							bind:value={dataInstance.entries[formField.dataIndex].value}
						/>
					{:else if formField.type === 'checkbox'}
						{#if formField.options}
							{#each formField.options as checkOption}
								<FormField style="width: 100%;">
									<Checkbox
										{...checkOption}
										bind:group={dataInstance.entries[formField.dataIndex].value}
										value={checkOption.name}
									/>
									<span slot="label">
										{checkOption.name}{checkOption.disabled ? ' (disabled)' : ''}
									</span>
								</FormField>
							{/each}
						{:else}
							<FormField style="width: 100%;">
								<Checkbox
									{...formField}
									bind:checked={dataInstance.entries[formField.dataIndex].value}
								/>
								<span slot="label">
									{formField.label}{formField.disabled ? ' (disabled)' : ''}
								</span>
							</FormField>
						{/if}
					{:else if formField.type === 'select'}
						<Select
							{...formField}
							key={(value) => `${value == null ? '' : value}`}
							bind:value={dataInstance.entries[formField.dataIndex].value}
						>
							<Option value={null} />
							{#each formField.options as option}
								<Option value={option}>{option}</Option>
							{/each}
						</Select>
					{/if}
				</div>
			{/each}
		</div>
	</Content>
</Paper>

<style global>
	@import './css/smui.css';
	@import 'https://fonts.googleapis.com/icon?family=Material+Icons';
	@import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700';
	@import 'https://fonts.googleapis.com/css?family=Roboto+Mono';
	/* TODO: handle dark mode */
	/*@import '../../static/smui-dark.css';*/

	.subtitle {
		margin-bottom: 20px;
	}
</style>
