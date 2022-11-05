<script lang="ts">
	import Textfield from '@smui/textfield';
	import Paper, { Title, Subtitle, Content } from '@smui/paper';
	import HelperText from '@smui/textfield/helper-text';

	let lastName: string | null = null;
	let firstName: string | null = null;
	let matriculationNr: number | null = null;
	let telephoneNr: number | null = null;
	let email: string | null = null;
	let courseOfStudies: string | null = null;
	let title: string | null = '';
	let firstExaminer: string | null = null;
	let secondExaminer: string | null = null;
	let startDate: string | null = null;
	let dateOfCompletion: string | null = null;
	let date: string | null = null;

	let emailInvalid = false;
</script>

<div class="paper-container">
	<Paper>
		<Title style="margin-bottom: 10px;">Antrag auf Vergabe eines Studienprojektes</Title>
		<Subtitle style="margin-bottom: 30px;">Hochschule Esslingen</Subtitle>
		<Content>
			<div class="form-container">
				<div>
					<Textfield variant="outlined" bind:value={lastName} label="Name" style="width: 100%;" />
				</div>
				<div>
					<Textfield
						variant="outlined"
						bind:value={firstName}
						label="Vorname"
						style="width: 100%;"
					/>
				</div>
				<div>
					<Textfield
						variant="outlined"
						type="number"
						bind:value={matriculationNr}
						label="Matrikelnummer"
						style="width: 100%;"
					/>
				</div>
				<div>
					<Textfield
						variant="outlined"
						bind:value={telephoneNr}
						label="Telefon"
						style="width: 100%;"
					/>
				</div>
				<div>
					<Textfield
						variant="outlined"
						type="email"
						input$autocomplete="email"
						bind:value={email}
						label="E-Mail"
						style="width: 100%;"
						updateInvalid
						bind:invalid={emailInvalid}
					>
						<svelte:fragment slot="helper">
							{#if emailInvalid}
								<HelperText validationMsg>That's not a valid email address.</HelperText>
							{/if}
						</svelte:fragment>
					</Textfield>
				</div>
				<div>
					<Textfield
						variant="outlined"
						bind:value={courseOfStudies}
						label="Studiengang"
						style="width: 100%;"
					/>
				</div>
				<div>
					<Textfield
						textarea
						bind:value={title}
						label="Titel der Studienarbeit"
						style="width: 100%;"
					/>
				</div>
				<div>
					<Textfield
						variant="outlined"
						bind:value={firstExaminer}
						label="1. Prüfer"
						style="width: 100%;"
					/>
				</div>
				<div>
					<Textfield
						variant="outlined"
						bind:value={secondExaminer}
						label="2. Prüfer"
						style="width: 100%;"
					/>
				</div>
				<div>
					<Textfield
						variant="outlined"
						type="date"
						bind:value={startDate}
						label="Beginn der Studienarbeit"
						style="width: 100%;"
					/>
				</div>
				<div>
					<Textfield
						variant="outlined"
						type="date"
						bind:value={dateOfCompletion}
						label="Abgabetermin"
						style="width: 100%;"
					/>
				</div>
				<div>
					<Textfield
						variant="outlined"
						type="date"
						bind:value={date}
						label="Datum"
						style="width: 100%;"
					/>
				</div>
			</div>
		</Content>
	</Paper>
</div>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
		background-color: #f4f5f7;
	}
	:global(html) {
		background-color: #f4f5f7;
	}

	.paper-container {
		margin: 50px auto;
		width: 50%;
	}

	.form-container > * {
		margin-bottom: 20px;
		width: 100%;
	}
</style>
