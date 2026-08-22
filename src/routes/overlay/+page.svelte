<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { loadSession, deriveTally } from '$lib/tally';
	import { onSessionChange } from '$lib/sync';
	import { toTokens, render } from '$lib/template';

	let text = $state('');
	let unsubscribe: () => void;

	function refresh() {
		const session = loadSession();
		const tally = deriveTally(session.results);
		text = render(session.template, toTokens(tally));
	}

	onMount(() => {
		refresh();
		unsubscribe = onSessionChange(refresh);
	});

	onDestroy(() => {
		unsubscribe?.();
	});
</script>

<main>
	<span class="text">{text}</span>
</main>

<style>
	main {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100vh;
	}

	.text {
		font-family: sans-serif;
		font-size: 10vh;
		font-weight: 700;
		color: #ffffff;
		white-space: nowrap;
		text-shadow:
			0 0 4px rgba(0, 0, 0, 0.9),
			0 0 8px rgba(0, 0, 0, 0.6);
	}
</style>
