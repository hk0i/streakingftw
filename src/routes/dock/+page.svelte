<script lang="ts">
	import { onMount } from 'svelte';
	import { loadSession, deriveTally, addResult, undo, newSession, type Tally } from '$lib/tally';

	let tally = $state<Tally>({ wins: 0, losses: 0, ties: 0, total: 0 });

	function refresh() {
		tally = deriveTally(loadSession().results);
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
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-height: 100vh;
		box-sizing: border-box;
		padding: 1rem;
		font-family: sans-serif;
	}

	.tally {
		display: flex;
		justify-content: space-around;
		font-size: 1.5rem;
		font-weight: 600;
		color: #232b36;
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
		border: 1px solid #7590b2;
		background: #ffffff;
		color: #232b36;
	}

	.controls button:disabled {
		opacity: 0.5;
	}

	@media (min-width: 480px) {
		.actions {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
