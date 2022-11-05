<script lang="ts">
	import Ajv from 'ajv';
	import schema from '../schema.json';
	import JsonForm from '$lib/JsonForm.svelte';

	const ajv = new Ajv();
	const validate = ajv.compile(schema);
	const data = {
		firstTextField: 'first',
		secondTextField: 'second'
	};

	const valid = validate(data);
	//if (!valid) console.log(validate.errors);
</script>

<JsonForm {schema} />
