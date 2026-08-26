<script lang="ts">
	import { TOKEN_REFERENCE } from '$lib/template';
	import { getT } from '$lib/i18n/locale.svelte';

	let { onclose }: { onclose: () => void } = $props();

	let t = $derived(getT());

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
	<div class="panel" role="dialog" aria-modal="true" aria-label={t.helpOverlay.heading}>
		<div class="header">
			<h2>{t.helpOverlay.heading}</h2>
			<button type="button" class="close" onclick={onclose} aria-label={t.helpOverlay.closeAriaLabel}>×</button>
		</div>
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
		<p class="hint">{t.helpOverlay.hint}</p>
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
		width: 360px;
		font-family: sans-serif;
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

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
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

	.hint {
		margin: 0.75rem 0 0;
		font-size: 0.8rem;
		color: #a9bcd0;
	}
</style>
