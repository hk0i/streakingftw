<script lang="ts">
	import { onMount } from 'svelte';
	import {
		loadSession,
		deriveTally,
		addResult,
		undo,
		newSession,
		setTemplate,
		setActiveProfile,
		type Tally,
		type Profile,
		type Result
	} from '$lib/tally';
	import { toTokens, render } from '$lib/template';
	import { resolveProfileIcons } from '$lib/icon-packs';
	import HelpOverlay from '$lib/components/HelpOverlay.svelte';
	import ProfileSettings from '$lib/components/ProfileSettings.svelte';
	import CopyUrlButton from '$lib/components/CopyUrlButton.svelte';
	import LanguageToggle from '$lib/components/LanguageToggle.svelte';
	import { getT, initLocale } from '$lib/i18n/locale.svelte';

	let t = $derived(getT());

	let tally = $state<Tally>({ wins: 0, losses: 0, ties: 0, total: 0 });
	let templateDraft = $state('');
	let showHelp = $state(false);
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

	function handleSetActiveProfile(id: string | null) {
		setActiveProfile(id);
		refresh();
	}

	let preview = $derived(render(templateDraft, toTokens(tally)));

	function commitTemplate() {
		setTemplate(templateDraft);
	}

	function handleTemplateKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') (event.target as HTMLInputElement).blur();
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
		<span>{tally.wins}W</span>
		<span>{tally.losses}L</span>
		<span>{tally.ties}T</span>
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
			<button
				type="button"
				class="chip"
				class:active={activeProfileId === null}
				onclick={() => handleSetActiveProfile(null)}
			>
				{t.dock.generic}
			</button>
			{#each profiles as profile (profile.id)}
				<button
					type="button"
					class="chip"
					class:active={activeProfileId === profile.id}
					onclick={() => handleSetActiveProfile(profile.id)}
				>
					{profile.name}
				</button>
			{/each}
		{/if}
		<CopyUrlButton profileIds={[]} label={t.dock.copyUrl} />
		<LanguageToggle />
	</div>

	{#if profileTally}
		<div class="tally profile-tally">
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
			<span>{profileTally.wins}W</span>
			<span>{profileTally.losses}L</span>
			<span>{profileTally.ties}T</span>
		</div>
	{/if}

	<div class="actions">
		<button class="win" onclick={() => handleResult('win')}>{t.dock.win}</button>
		<button class="loss" onclick={() => handleResult('loss')}>{t.dock.loss}</button>
		<button class="tie" onclick={() => handleResult('tie')}>{t.dock.tie}</button>
	</div>

	<div class="controls">
		<button onclick={handleUndo} disabled={tally.total === 0}>{t.dock.undo}</button>
		<button onclick={handleNewSession}>{t.dock.newSession}</button>
	</div>

	<div class="format">
		<div class="format-row">
			<label for="template">{t.dock.overlayFormatLabel}</label>
			<button
				type="button"
				class="help-btn"
				aria-label={t.dock.templateHelpAriaLabel}
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

{#if showProfileSettings}
	<ProfileSettings
		{profiles}
		template={templateDraft}
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
		justify-content: space-around;
		font-size: 1.5rem;
		font-weight: 600;
		color: #f2f8ff;
	}

	.profile-tally {
		font-size: 1.1rem;
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

	.chip {
		min-height: 36px;
		padding: 0 0.75rem;
		font-size: 0.875rem;
		font-weight: 600;
		border-radius: 999px;
		border: 1px solid #546880;
		background: #232b36;
		color: #f2f8ff;
	}

	.chip.active {
		background: #fcaf3e;
		border-color: #fcaf3e;
		color: #12161c;
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
		color: #ffffff;
	}

	.win {
		background: #48830e;
	}

	.loss {
		background: #cc0000;
	}

	.tie {
		background: #b95b00;
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
