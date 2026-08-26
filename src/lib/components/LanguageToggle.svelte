<script lang="ts">
	import { getLocale, setLocale, type Locale } from '$lib/i18n/locale.svelte';

	const options: { locale: Locale; label: string }[] = [
		{ locale: 'en', label: 'EN' },
		{ locale: 'ja', label: '日本語' }
	];
</script>

<div class="language-toggle" role="group" aria-label="Language">
	{#each options as option (option.locale)}
		<button
			type="button"
			class="chip"
			class:active={getLocale() === option.locale}
			onclick={() => setLocale(option.locale)}
		>
			{option.label}
		</button>
	{/each}
</div>

<style>
	.language-toggle {
		display: flex;
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
</style>
