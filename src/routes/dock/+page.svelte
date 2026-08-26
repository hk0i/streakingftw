<script lang="ts">
	import { onMount } from 'svelte';
	import {
		loadSession,
		deriveTally,
		addResult,
		undo,
		newSession,
		setActiveProfile,
		type Tally,
		type Profile,
		type Result
	} from '$lib/tally';
	import { resolveProfileIcons } from '$lib/icon-packs';
	import ProfileSettings from '$lib/components/ProfileSettings.svelte';
	import { getT, initLocale } from '$lib/i18n/locale.svelte';

	let t = $derived(getT());

	let tally = $state<Tally>({ wins: 0, losses: 0, ties: 0, total: 0 });
	let templateDraft = $state('');
	let showProfileSettings = $state(false);
	let profiles = $state<Profile[]>([]);
	let results = $state<Result[]>([]);
	let activeProfileId = $state<string | null>(null);

	function refresh() {
		const session = loadSession();
		tally = deriveTally(session.results);
		templateDraft = session.template;
		profiles = session.profiles;
		results = session.results;
		activeProfileId = session.activeProfileId;
	}

	let profileTally = $derived(
		activeProfileId
			? deriveTally(results.filter((r) => r.profileId === activeProfileId))
			: null
	);

	let activeProfile = $derived(profiles.find((p) => p.id === activeProfileId) ?? null);
	let activeIcons = $derived(activeProfile ? resolveProfileIcons(activeProfile) : {});
	let displayTally = $derived(profileTally ?? tally);

	function handleSetActiveProfile(id: string | null) {
		setActiveProfile(id);
		refresh();
	}

	function handleProfileSelectChange(event: Event) {
		const value = (event.target as HTMLSelectElement).value;
		handleSetActiveProfile(value === '' ? null : value);
	}

	onMount(() => {
		refresh();
		initLocale();
	});

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
		{#if activeIcons.role || activeIcons.rank}
			<span class="badges">
				{#if activeIcons.role}
					<img class="badge role" src={activeIcons.role.src} alt={activeIcons.role.label} />
				{/if}
				{#if activeIcons.rank}
					<img class="badge rank" src={activeIcons.rank.src} alt={activeIcons.rank.label} />
				{/if}
			</span>
		{/if}
		<span class="stat">
			<span class="stat-value">{displayTally.wins}W</span>
			{#if profileTally}<span class="stat-total">/{tally.wins}</span>{/if}
		</span>
		<span class="stat">
			<span class="stat-value">{displayTally.losses}L</span>
			{#if profileTally}<span class="stat-total">/{tally.losses}</span>{/if}
		</span>
		<span class="stat">
			<span class="stat-value">{displayTally.ties}T</span>
			{#if profileTally}<span class="stat-total">/{tally.ties}</span>{/if}
		</span>
	</div>

	<div class="switcher">
		<button
			type="button"
			class="settings-btn"
			aria-label={t.dock.settingsAriaLabel}
			onclick={() => (showProfileSettings = true)}
		>
			⚙
		</button>
		{#if profiles.length > 0}
			<select
				class="profile-select"
				value={activeProfileId ?? ''}
				onchange={handleProfileSelectChange}
			>
				<option value="">{t.dock.generic}</option>
				{#each profiles as profile (profile.id)}
					<option value={profile.id}>{profile.name}</option>
				{/each}
			</select>
		{/if}
	</div>

	<div class="actions">
		<button class="win" onclick={() => handleResult('win')}>{t.dock.win}</button>
		<button class="loss" onclick={() => handleResult('loss')}>{t.dock.loss}</button>
		<button class="tie" onclick={() => handleResult('tie')}>{t.dock.tie}</button>
	</div>

	<div class="controls">
		<button onclick={handleUndo} disabled={tally.total === 0}>{t.dock.undo}</button>
		<button onclick={handleNewSession}>{t.dock.newSession}</button>
	</div>


</main>

{#if showProfileSettings}
	<ProfileSettings
		{profiles}
		template={templateDraft}
		{tally}
		{activeProfileId}
		onclose={() => (showProfileSettings = false)}
		onchange={refresh}
	/>
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
		align-items: center;
		justify-content: space-around;
		color: #f2f8ff;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		line-height: 1.1;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.stat-total {
		font-size: 0.75rem;
		font-weight: 500;
		color: #a9bcd0;
	}

	.badges {
		display: flex;
		gap: 0.3rem;
	}

	.badge {
		width: 24px;
		height: 24px;
		padding: 0.2rem;
		border-radius: 50%;
		box-sizing: border-box;
		object-fit: contain;
	}

	/* Role icons are solid black artwork, so they need a light chip to read
	   against the dark dock background; rank badges are already full-color. */
	.badge.role {
		background: #e8edf2;
	}

	.badge.rank {
		background: #232b36;
	}

	.switcher {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.profile-select {
		min-height: 36px;
		padding: 0 0.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		border-radius: 0.5rem;
		border: 1px solid #546880;
		background: #232b36;
		color: #f2f8ff;
	}

	.settings-btn {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 1px solid #546880;
		background: #232b36;
		color: #f2f8ff;
		font-size: 1rem;
		line-height: 1;
		cursor: pointer;
		padding: 0;
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
	}

	.win {
		background: #73d216;
		color: #12161c;
	}

	.loss {
		background: #cc0000;
		color: #ffffff;
	}

	.tie {
		background: #f57900;
		color: #12161c;
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

	@media (min-width: 480px) {
		.actions {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
