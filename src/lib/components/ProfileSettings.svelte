<script lang="ts">
	import {
		addProfile,
		renameProfile,
		deleteProfile,
		setProfileTemplateOverride,
		type Profile
	} from '$lib/tally';
	import CopyUrlButton from '$lib/components/CopyUrlButton.svelte';

	let {
		profiles,
		template,
		activeProfileId,
		onclose,
		onchange
	}: {
		profiles: Profile[];
		template: string;
		activeProfileId: string | null;
		onclose: () => void;
		onchange: () => void;
	} = $props();

	let profileNameDrafts = $state<Record<string, string>>({});
	let newProfileName = $state('');
	let customFormatEnabled = $state<Record<string, boolean>>({});
	let profileTemplateDrafts = $state<Record<string, string>>({});
	let selectedIds = $state<Set<string>>(new Set());

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
	});

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

	function toggleSelected(id: string, checked: boolean) {
		if (checked) {
			selectedIds.add(id);
		} else {
			selectedIds.delete(id);
		}
		selectedIds = new Set(selectedIds);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') onclose();
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) onclose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="backdrop" onclick={handleBackdropClick}>
	<div class="panel" role="dialog" aria-modal="true" aria-label="Profile settings">
		<div class="header">
			<h2>Profile settings</h2>
			<button type="button" class="close" onclick={onclose} aria-label="Close">×</button>
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
					Generic
				</label>
				<CopyUrlButton profileIds={[]} />
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
							aria-label={`Delete ${profile.name}`}
							onclick={() => handleDeleteProfile(profile.id)}
						>
							Delete
						</button>
					</div>
					<div class="profile-format-row">
						<label class="checkbox-label">
							<input
								type="checkbox"
								checked={customFormatEnabled[profile.id] ?? false}
								onchange={(e) => handleToggleCustomFormat(profile, e.currentTarget.checked)}
							/>
							Custom format
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
					<div class="url-row">
						<label class="checkbox-label">
							<input
								type="checkbox"
								checked={selectedIds.has(profile.id)}
								onchange={(e) => toggleSelected(profile.id, e.currentTarget.checked)}
							/>
							Include in link
						</label>
						<CopyUrlButton profileIds={[profile.id]} />
					</div>
				</div>
			{/each}
			<div class="url-row selected-url-row">
				<CopyUrlButton
					profileIds={Array.from(selectedIds)}
					label="Copy URL for selected"
					disabled={selectedIds.size === 0}
				/>
			</div>
			<div class="header">
				<h2>Add New Profile</h2>
			</div>
			<p class="hint">
				Each profile keeps its own win/loss/tie tally and overlay link, separate from the
				generic session — use one per game, or role (Tank, DPS, Support), or whatever makes sense for your stream.
			</p>
			<div class="profile-add">
				<input
					type="text"
					placeholder="New profile name"
					bind:value={newProfileName}
					onkeydown={(e) => e.key === 'Enter' && handleAddProfile()}
				/>
				<button type="button" onclick={handleAddProfile}>Add</button>
			</div>
		</div>
	</div>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		padding: 1rem;
		box-sizing: border-box;
	}

	.panel {
		background: #232b36;
		color: #f2f8ff;
		border: 1px solid #546880;
		border-radius: 0.5rem;
		padding: 1rem;
		max-width: 90vw;
		width: 420px;
		max-height: 80vh;
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

	.header h2 {
		margin: 0;
		font-size: 1.1rem;
	}

	.close {
		border: none;
		background: transparent;
		color: #f2f8ff;
		font-size: 1.5rem;
		line-height: 1;
		cursor: pointer;
		padding: 0.25rem;
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
