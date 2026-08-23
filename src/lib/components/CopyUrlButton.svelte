<script lang="ts">
	import { buildOverlayUrl } from '$lib/tally';
	import { copyToClipboard } from '$lib/clipboard';

	let {
		profileIds,
		label = 'Copy overlay URL',
		disabled = false
	}: { profileIds: string[]; label?: string; disabled?: boolean } = $props();

	const uid = $props.id();
	let copied = $state(false);
	let manualUrl = $state<string | null>(null);
	let manualInput = $state<HTMLInputElement | undefined>();

	async function handleClick() {
		const url = buildOverlayUrl(profileIds);
		if (await copyToClipboard(url)) {
			copied = true;
			manualUrl = null;
			setTimeout(() => (copied = false), 1500);
		} else {
			manualUrl = url;
		}
	}

	$effect(() => {
		if (manualUrl && manualInput) {
			manualInput.focus();
			manualInput.select();
		}
	});
</script>

<button type="button" {disabled} onclick={handleClick}>
	{copied ? 'Copied!' : label}
</button>
{#if manualUrl}
	<div class="manual-copy">
		<label for={`manual-copy-${uid}`}>Clipboard unavailable — copy manually:</label>
		<input id={`manual-copy-${uid}`} type="text" readonly value={manualUrl} bind:this={manualInput} />
	</div>
{/if}

<style>
	button {
		min-height: 36px;
		padding: 0 0.75rem;
		font-size: 0.8rem;
		border-radius: 0.5rem;
		border: 1px solid #546880;
		background: #232b36;
		color: #f2f8ff;
	}

	button:disabled {
		opacity: 0.5;
	}

	.manual-copy {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.8rem;
		color: #a9bcd0;
	}

	.manual-copy input {
		min-height: 40px;
		padding: 0 0.75rem;
		font-size: 0.8rem;
		border-radius: 0.5rem;
		border: 1px solid #546880;
		background: #232b36;
		color: #f2f8ff;
	}
</style>
