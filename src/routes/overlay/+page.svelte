<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/state';
	import { loadSession, deriveTally } from '$lib/tally';
	import { onSessionChange } from '$lib/sync';
	import { toTokens, toProfileTokens, render } from '$lib/template';

	let rows = $state<string[]>([]);
	let unsubscribe: () => void;

	function refresh() {
		const session = loadSession();
		const genericRow = () => render(session.template, toTokens(deriveTally(session.results)));

		const param = page.url.searchParams.get('profile');
		if (!param) {
			rows = [genericRow()];
			return;
		}

		const ids = param
			.split(',')
			.map((id) => id.trim())
			.filter((id) => id.length > 0);

		rows = ids
			.map((id) => {
				if (id === 'generic') return genericRow();
				const profile = session.profiles.find((p) => p.id === id);
				if (!profile) return null;
				const tally = deriveTally(session.results.filter((r) => r.profileId === profile.id));
				return render(profile.template ?? session.template, toProfileTokens(tally, profile));
			})
			.filter((row): row is string => row !== null);
	}

	onMount(() => {
		refresh();
		unsubscribe = onSessionChange(refresh);
	});

	onDestroy(() => {
		unsubscribe?.();
	});
</script>

<main style={`--row-count: ${rows.length || 1}`}>
	{#each rows as row, i (i)}
		<div class="text">{row}</div>
	{/each}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100vh;
	}

	.text {
		font-family: sans-serif;
		font-size: min(11vw, calc(70vh / var(--row-count, 1)));
		font-weight: 700;
		color: #ffffff;
		white-space: nowrap;
		text-shadow:
			0 0 4px rgba(0, 0, 0, 0.9),
			0 0 8px rgba(0, 0, 0, 0.6);
	}
</style>
