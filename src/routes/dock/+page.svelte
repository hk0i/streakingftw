<script lang="ts">
	import { onMount } from 'svelte';
	import {
		loadSession,
		deriveTally,
		addResult,
		undo,
		newSession,
		setTemplate,
		type Tally
	} from '$lib/tally';
	import { toTokens, render } from '$lib/template';
	import HelpOverlay from '$lib/components/HelpOverlay.svelte';

	let tally = $state<Tally>({ wins: 0, losses: 0, ties: 0, total: 0 });
	let templateDraft = $state('');
	let showHelp = $state(false);

	function refresh() {
		const session = loadSession();
		tally = deriveTally(session.results);
		templateDraft = session.template;
	}

	let preview = $derived(render(templateDraft, toTokens(tally)));

	function commitTemplate() {
		setTemplate(templateDraft);
	}

	function handleTemplateKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') (event.target as HTMLInputElement).blur();
	}

	onMount(refresh);

	function handleResult(type: 'win' | 'loss' | 'tie') {
		addResult(type);
		refresh();
	}

	function handleUndo() {
		undo();
		refresh();
	}

	function handleNewSession() {
		newSession();
		refresh();
	}
</script>

<main>
	<div class="tally">
		<span>{tally.wins}W</span>
		<span>{tally.losses}L</span>
		<span>{tally.ties}T</span>
	</div>

	<div class="actions">
		<button class="win" onclick={() => handleResult('win')}>Win</button>
		<button class="loss" onclick={() => handleResult('loss')}>Loss</button>
		<button class="tie" onclick={() => handleResult('tie')}>Tie</button>
	</div>

	<div class="controls">
		<button onclick={handleUndo} disabled={tally.total === 0}>Undo</button>
		<button onclick={handleNewSession}>New Session</button>
	</div>

	<div class="format">
		<div class="format-row">
			<label for="template">Overlay format</label>
			<button
				type="button"
				class="help-btn"
				aria-label="Template token help"
				onclick={() => (showHelp = true)}
			>
				?
			</button>
		</div>
		<input
			id="template"
			type="text"
			bind:value={templateDraft}
			onblur={commitTemplate}
			onkeydown={handleTemplateKeydown}
		/>
		<span class="preview">{preview}</span>
	</div>
</main>

{#if showHelp}
	<HelpOverlay onclose={() => (showHelp = false)} />
{/if}

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-height: 100vh;
		box-sizing: border-box;
		padding: 1rem;
		font-family: sans-serif;
		background: #12161c;
	}

	.tally {
		display: flex;
		justify-content: space-around;
		font-size: 1.5rem;
		font-weight: 600;
		color: #f2f8ff;
	}

	.actions {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}

	.actions button {
		min-height: 64px;
		font-size: 1.25rem;
		font-weight: 600;
		border: none;
		border-radius: 0.5rem;
		color: #ffffff;
	}

	.win {
		background: #73d216;
	}

	.loss {
		background: #cc0000;
	}

	.tie {
		background: #f57900;
	}

	.controls {
		display: flex;
		gap: 0.75rem;
	}

	.controls button {
		flex: 1;
		min-height: 48px;
		font-size: 1rem;
		border-radius: 0.5rem;
		border: 1px solid #546880;
		background: #232b36;
		color: #f2f8ff;
	}

	.controls button:disabled {
		opacity: 0.5;
	}

	.format {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.format-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.format label {
		font-size: 0.875rem;
		color: #f2f8ff;
	}

	.help-btn {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		border: 1px solid #546880;
		background: #232b36;
		color: #f2f8ff;
		font-size: 0.875rem;
		line-height: 1;
		cursor: pointer;
		padding: 0;
	}

	.format input {
		min-height: 44px;
		padding: 0 0.75rem;
		font-size: 1rem;
		border-radius: 0.5rem;
		border: 1px solid #546880;
		background: #232b36;
		color: #f2f8ff;
	}

	.format .preview {
		font-size: 0.875rem;
		color: #a9bcd0;
	}

	@media (min-width: 480px) {
		.actions {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
