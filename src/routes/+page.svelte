<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import obsScreenshot from '$lib/assets/screenshots/obs-streaking-ftw.png?enhanced';
	import addDockScreenshot from '$lib/assets/screenshots/add-obs-dock.png?enhanced';
	import addSourceScreenshot from '$lib/assets/screenshots/add-obs-source.png?enhanced';
	import { getLocale, getT, initLocale } from '$lib/i18n/locale.svelte';
	import LanguageToggle from '$lib/components/LanguageToggle.svelte';

	let t = $derived(getT());

	let origin = $state('');

	onMount(() => {
		origin = window.location.origin;
		initLocale();
	});

	const dockUrl = $derived(`${origin}${resolve('/dock')}`);
	const overlayUrl = $derived(`${origin}${resolve('/overlay')}`);
</script>

<div class="backdrop">
<div class="page">
	<div class="lang-row"><LanguageToggle /></div>
	<h1>{t.landing.title}</h1>
	<enhanced:img src={obsScreenshot} alt={t.landing.heroImgAlt} />
	<p>{@html t.landing.introText}</p>
	<ol>
		<li>{@html t.landing.introDockItem}</li>
		<li>{@html t.landing.introOverlayItem}</li>
	</ol>

	<h2>{t.landing.setupHeading}</h2>
	<ol>
		<li>
			{@html t.landing.setupStep1}
			<enhanced:img src={addDockScreenshot} alt={t.landing.addDockImgAlt} />
			<ol>
				<li>{@html t.landing.urlLabel} <a href={dockUrl}>{dockUrl}</a><br>
				<em>{t.landing.copyLinkHint}</em></li>
			</ol>
		</li>
		<li>
			{@html t.landing.setupStep2}
			<enhanced:img src={addSourceScreenshot} alt={t.landing.addSourceImgAlt} />
			<ol>
				<li>{@html t.landing.urlLabel} <a href={overlayUrl}>{overlayUrl}</a><br>
				<em>{t.landing.copyLinkHint}</em></li>
				<li>{t.landing.placeOverlayItem}</li>
			</ol>
		</li>
	</ol>

	<p>{@html t.landing.sizingNote}</p>

	<h2>{t.landing.trackHeading}</h2>
	<p>{@html t.landing.trackP1}</p>
	<p>{@html t.landing.trackP2}</p>

	<h2>{t.landing.badgesHeading}</h2>
	<p>{@html t.landing.badgesP1}</p>
	<ol>
		<li>{@html t.landing.badgesStep1}</li>
		<li>{@html t.landing.badgesStep2}</li>
		<li>{t.landing.badgesStep3}</li>
	</ol>
	<p>{@html t.landing.badgesFormatP}</p>

	{#if getLocale() !== 'en'}
		<p class="translation-feedback">{@html t.landing.translationFeedback}</p>
	{/if}
</div>
</div>

<style>
	.backdrop {
		min-height: 100vh;
		background: #12161c;
		color: #f2f8ff;
		font-family: sans-serif;
	}

	.page {
		max-width: 640px;
		margin: 0 auto;
		padding: 3rem 1.5rem 4rem;
		line-height: 1.6;
	}

	.lang-row {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;
	}

	h1 {
		margin: 0 0 0.5rem;
	}

	h2 {
		margin: 2.5rem 0 0.75rem;
		color: #f2f8ff;
	}

	p {
		margin: 0 0 1rem;
	}

	.page :global(a) {
		color: #73d216;
		word-break: break-all;
	}

	.translation-feedback {
		font-size: 0.8rem;
		color: #a9bcd0;
	}

	.page :global(code) {
		background: #232b36;
		padding: 0.1em 0.4em;
		border-radius: 0.25em;
	}

	.page :global(picture) {
		display: block;
		margin: 0.75rem 0 1rem;
	}

	.page :global(picture img) {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 0.5rem;
		border: 1px solid #232b36;
	}
</style>
