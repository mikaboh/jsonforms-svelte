<script lang="ts">
	import JsonForm from '$lib/JsonForm.svelte';
	//import JsonForm from '../../package';
	import Paper, { Content, Title } from '@smui/paper';
	import schema from '../../schema-example.json';
	import uischema from '../../ui-schema-example.json';
	import { JsonView } from '@zerodevx/svelte-json-view';

	let data: string;
</script>

<div class="wrapper">
	<div>
		<JsonForm {schema} {uischema} bind:data />
	</div>

	<div>
		<Paper>
			<div class="title">
				<Title>Data</Title>
			</div>
			<Content>
				<JsonView bind:json={data} />
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

	.wrapper > div {
		width: 49%;
	}
</style>
