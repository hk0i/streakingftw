<script lang="ts">
	import {
		addProfile,
		renameProfile,
		deleteProfile,
		setProfileTemplateOverride,
		setProfileIcons,
		setTemplate,
		type Profile,
		type Tally
	} from '$lib/tally';
	import { toTokens, render, TOKEN_REFERENCE } from '$lib/template';
	import { ICON_PACKS } from '$lib/icon-packs';
	import CopyUrlButton from '$lib/components/CopyUrlButton.svelte';
	import IconPackPicker from '$lib/components/IconPackPicker.svelte';
	import LanguageToggle from '$lib/components/LanguageToggle.svelte';
	import { getT } from '$lib/i18n/locale.svelte';

	let t = $derived(getT());

	const iconPack = ICON_PACKS[0];

	let {
		profiles,
		template,
		tally,
		activeProfileId,
		onclose,
		onchange
	}: {
		profiles: Profile[];
		template: string;
		tally: Tally;
		activeProfileId: string | null;
		onclose: () => void;
		onchange: () => void;
	} = $props();

	let profileNameDrafts = $state<Record<string, string>>({});
	let newProfileName = $state('');
	let customFormatEnabled = $state<Record<string, boolean>>({});
	let profileTemplateDrafts = $state<Record<string, string>>({});
	let selectedIds = $state<Set<string>>(new Set());
	let templateDraft = $state('');
	let showHelp = $state(false);

	function scrollIntoViewIfActive(node: HTMLElement, isActive: boolean) {
		if (isActive) node.scrollIntoView({ block: 'nearest' });
		return {
			update(nowActive: boolean) {
				if (nowActive) node.scrollIntoView({ block: 'nearest' });
			}
		};
	}

	$effect(() => {
		profileNameDrafts = Object.fromEntries(profiles.map((p) => [p.id, p.name]));
		customFormatEnabled = Object.fromEntries(profiles.map((p) => [p.id, p.template !== undefined]));
		profileTemplateDrafts = Object.fromEntries(
			profiles.filter((p) => p.template !== undefined).map((p) => [p.id, p.template as string])
		);
		templateDraft = template;
	});

	let preview = $derived(render(templateDraft, toTokens(tally)));

	function commitTemplate() {
		setTemplate(templateDraft);
		onchange();
	}

	function handleTemplateKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') (event.target as HTMLInputElement).blur();
	}

	function handleAddProfile() {
		addProfile(newProfileName);
		newProfileName = '';
		onchange();
	}

	function commitProfileName(id: string) {
		renameProfile(id, profileNameDrafts[id] ?? '');
		onchange();
	}

	function handleProfileNameKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') (event.target as HTMLInputElement).blur();
	}

	function handleDeleteProfile(id: string) {
		deleteProfile(id);
		onchange();
	}

	function handleToggleCustomFormat(profile: Profile, checked: boolean) {
		customFormatEnabled[profile.id] = checked;
		if (checked) {
			profileTemplateDrafts[profile.id] = profile.template ?? template;
		} else {
			setProfileTemplateOverride(profile.id, undefined);
			onchange();
		}
	}

	function commitProfileTemplate(id: string) {
		setProfileTemplateOverride(id, profileTemplateDrafts[id] ?? '');
		onchange();
	}

	function handleProfileTemplateInput(id: string, value: string) {
		profileTemplateDrafts[id] = value;
	}

	function handleProfileTemplateKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') (event.target as HTMLInputElement).blur();
	}

	function handleIconsChange(profileId: string, patch: { roleId?: string; rankId?: string }) {
		setProfileIcons(profileId, {
			iconPackId: patch.roleId || patch.rankId ? iconPack.id : undefined,
			roleId: patch.roleId,
			rankId: patch.rankId
		});
		onchange();
	}

	function toggleSelected(id: string, checked: boolean) {
		if (checked) {
			selectedIds.add(id);
		} else {
			selectedIds.delete(id);
		}
		selectedIds = new Set(selectedIds);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape') return;
		if (showHelp) {
			showHelp = false;
		} else {
			onclose();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) onclose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="backdrop" onclick={handleBackdropClick}>
	<div class="panel" role="dialog" aria-modal="true" aria-label={t.profileSettings.heading}>
		<div class="header">
			<div class="header-title">
				{#if showHelp}
					<button
						type="button"
						class="back"
						onclick={() => (showHelp = false)}
						aria-label={t.helpOverlay.closeAriaLabel}
					>
						←
					</button>
				{/if}
				<h2>{showHelp ? t.helpOverlay.heading : t.profileSettings.heading}</h2>
			</div>
			<button type="button" class="close" onclick={onclose} aria-label={t.profileSettings.closeAriaLabel}>×</button>
		</div>
		{#if showHelp}
			<table>
				<thead>
					<tr>
						<th>{t.helpOverlay.tokenColumn}</th>
						<th>{t.helpOverlay.meaningColumn}</th>
					</tr>
				</thead>
				<tbody>
					{#each TOKEN_REFERENCE as ref (ref.token)}
						<tr>
							<td><code>{ref.token}</code></td>
							<td>{t.helpOverlay.tokenMeanings[ref.key]}</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<p class="help-hint">{t.helpOverlay.hint}</p>
		{:else}
		<div class="toolbar">
			<CopyUrlButton profileIds={[]} label={t.dock.copyUrl} />
			<LanguageToggle />
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
		<div class="profiles">
			<div
				class="url-row generic-url-row"
				class:active-profile={activeProfileId === null}
				use:scrollIntoViewIfActive={activeProfileId === null}
			>
				<label class="checkbox-label">
					<input
						type="checkbox"
						checked={selectedIds.has('generic')}
						onchange={(e) => toggleSelected('generic', e.currentTarget.checked)}
					/>
					{t.profileSettings.generic}
				</label>
				<CopyUrlButton profileIds={['generic']} />
			</div>
			{#each profiles as profile (profile.id)}
				<div
					class="profile-group"
					class:active-profile={profile.id === activeProfileId}
					use:scrollIntoViewIfActive={profile.id === activeProfileId}
				>
					<div class="profile-row">
						<input
							type="text"
							bind:value={profileNameDrafts[profile.id]}
							onblur={() => commitProfileName(profile.id)}
							onkeydown={handleProfileNameKeydown}
						/>
						<button
							type="button"
							class="delete-btn"
							aria-label={`${t.profileSettings.deletePrefix} ${profile.name}`}
							onclick={() => handleDeleteProfile(profile.id)}
						>
							{t.profileSettings.deleteButton}
						</button>
					</div>
					<div class="profile-format-row">
						<label class="checkbox-label">
							<input
								type="checkbox"
								checked={customFormatEnabled[profile.id] ?? false}
								onchange={(e) => handleToggleCustomFormat(profile, e.currentTarget.checked)}
							/>
							{t.profileSettings.customFormat}
						</label>
						<input
							type="text"
							disabled={!customFormatEnabled[profile.id]}
							value={customFormatEnabled[profile.id] ? (profileTemplateDrafts[profile.id] ?? '') : template}
							oninput={(e) => handleProfileTemplateInput(profile.id, e.currentTarget.value)}
							onblur={() => commitProfileTemplate(profile.id)}
							onkeydown={handleProfileTemplateKeydown}
						/>
					</div>
					<div class="profile-icons-row">
						<span class="checkbox-label">{t.profileSettings.badge}</span>
						<IconPackPicker
							pack={iconPack}
							roleId={profile.roleId}
							rankId={profile.rankId}
							onchange={(patch) => handleIconsChange(profile.id, patch)}
						/>
					</div>
					<div class="url-row">
						<label class="checkbox-label">
							<input
								type="checkbox"
								checked={selectedIds.has(profile.id)}
								onchange={(e) => toggleSelected(profile.id, e.currentTarget.checked)}
							/>
							{t.profileSettings.includeInLink}
						</label>
						<CopyUrlButton profileIds={[profile.id]} />
					</div>
				</div>
			{/each}
			<div class="url-row selected-url-row">
				<CopyUrlButton
					profileIds={Array.from(selectedIds)}
					label={t.profileSettings.copyUrlSelected}
					disabled={selectedIds.size === 0}
				/>
			</div>
			<div class="header">
				<h2>{t.profileSettings.addProfileHeading}</h2>
			</div>
			<p class="hint">
				{t.profileSettings.hint}
			</p>
			<div class="profile-add">
				<input
					type="text"
					placeholder={t.profileSettings.newProfilePlaceholder}
					bind:value={newProfileName}
					onkeydown={(e) => e.key === 'Enter' && handleAddProfile()}
				/>
				<button type="button" onclick={handleAddProfile}>{t.profileSettings.addButton}</button>
			</div>
		</div>
		{/if}
	</div>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 100;
	}

	.panel {
		background: #232b36;
		color: #f2f8ff;
		padding: 1rem;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		font-family: sans-serif;
		box-sizing: border-box;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}

	.header-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.header h2 {
		margin: 0;
		font-size: 1.1rem;
	}

	.close,
	.back {
		border: none;
		background: transparent;
		color: #f2f8ff;
		font-size: 1.5rem;
		line-height: 1;
		cursor: pointer;
		padding: 0.25rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
		margin-bottom: 0.75rem;
	}

	th,
	td {
		text-align: left;
		padding: 0.4rem 0.5rem;
		border-bottom: 1px solid #546880;
	}

	code {
		color: #8be9fd;
	}

	.help-hint {
		margin: 0;
		font-size: 0.8rem;
		color: #a9bcd0;
	}

	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.format {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
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

	.profiles {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.profile-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.4rem;
		margin: -0.4rem;
		border-radius: 0.5rem;
		border-left: 3px solid transparent;
	}

	.profile-group.active-profile {
		border-left-color: #fcaf3e;
		background: rgba(252, 175, 62, 0.08);
	}

	.url-row.active-profile {
		padding: 0.3rem 0.4rem;
		margin: -0.3rem -0.4rem 0.25rem;
		border-radius: 0.5rem;
		border-left: 3px solid #fcaf3e;
		background: rgba(252, 175, 62, 0.08);
	}

	.profile-row,
	.profile-add {
		display: flex;
		gap: 0.5rem;
	}

	.profile-row input,
	.profile-add input {
		flex: 1;
		min-height: 44px;
		padding: 0 0.75rem;
		font-size: 1rem;
		border-radius: 0.5rem;
		border: 1px solid #546880;
		background: #232b36;
		color: #f2f8ff;
	}

	.profile-row .delete-btn,
	.profile-add button {
		min-height: 44px;
		padding: 0 0.75rem;
		font-size: 0.875rem;
		border-radius: 0.5rem;
		border: 1px solid #546880;
		background: #232b36;
		color: #f2f8ff;
	}

	.profile-format-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: -0.25rem 0 0.25rem;
	}

	.profile-icons-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: -0.25rem 0 0.25rem;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.8rem;
		color: #a9bcd0;
		white-space: nowrap;
	}

	.profile-format-row input[type='text'] {
		flex: 1;
		min-height: 40px;
		padding: 0 0.75rem;
		font-size: 0.875rem;
		border-radius: 0.5rem;
		border: 1px solid #546880;
		background: #232b36;
		color: #f2f8ff;
	}

	.profile-format-row input[type='text']:disabled {
		color: #a9bcd0;
	}

	.url-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
	}

	.generic-url-row {
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #546880;
	}

	.selected-url-row {
		justify-content: flex-end;
		margin-top: 0.25rem;
	}

	.hint {
		margin: -0.25rem 0 0;
		font-size: 0.8rem;
		color: #a9bcd0;
	}
</style>
