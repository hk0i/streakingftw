<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/state';
	import { loadSession, deriveTally, type Profile } from '$lib/tally';
	import { onSessionChange } from '$lib/sync';
	import { toTokens, toProfileTokens, render } from '$lib/template';
	import { resolveProfileIcons } from '$lib/icon-packs';

	interface OverlayRow {
		text: string;
		roleSrc?: string;
		rankSrc?: string;
	}

	let rows = $state<OverlayRow[]>([]);
	let unsubscribe: () => void;

	function toRow(text: string, profile?: Profile): OverlayRow {
		const icons = profile ? resolveProfileIcons(profile) : {};
		return { text, roleSrc: icons.role?.src, rankSrc: icons.rank?.src };
	}

	function refresh() {
		const session = loadSession();
		const genericRow = () =>
			toRow(render(session.template, toTokens(deriveTally(session.results))));
		const profileRow = (profile: Profile) => {
			const tally = deriveTally(session.results.filter((r) => r.profileId === profile.id));
			const text = render(profile.template ?? session.template, toProfileTokens(tally, profile));
			return toRow(text, profile);
		};

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
				return profileRow(profile);
			})
			.filter((row): row is OverlayRow => row !== null);
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
		<div class="row">
			{#if row.roleSrc}
				<img class="badge role" src={row.roleSrc} alt="" />
			{/if}
			{#if row.rankSrc}
				<img class="badge rank" src={row.rankSrc} alt="" />
			{/if}
			<div class="text">{row.text}</div>
		</div>
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

	.row {
		display: flex;
		align-items: center;
		gap: 0.3em;
		font-size: min(11vw, calc(70vh / var(--row-count, 1)));
		--badge-shadow: drop-shadow(0 0 4px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 8px rgba(0, 0, 0, 0.6));
	}

	.badge {
		height: 0.9em;
		width: auto;
		object-fit: contain;
		flex-shrink: 0;
		filter: var(--badge-shadow);
	}

	/* Role icons are solid black artwork; invert to white so they read as part
	   of the overlay's text-like visual language instead of a dark cutout. */
	.badge.role {
		filter: invert(1) var(--badge-shadow);
	}

	.text {
		font-family: sans-serif;
		font-weight: 700;
		color: #ffffff;
		white-space: nowrap;
		text-shadow:
			0 0 4px rgba(0, 0, 0, 0.9),
			0 0 8px rgba(0, 0, 0, 0.6);
	}
</style>
