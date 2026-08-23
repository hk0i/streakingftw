<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import obsScreenshot from '$lib/assets/screenshots/obs-streaking-ftw.png?enhanced';
	import addDockScreenshot from '$lib/assets/screenshots/add-obs-dock.png?enhanced';
	import addSourceScreenshot from '$lib/assets/screenshots/add-obs-source.png?enhanced';

	let origin = $state('');

	onMount(() => {
		origin = window.location.origin;
	});

	const dockUrl = $derived(`${origin}${resolve('/dock')}`);
	const overlayUrl = $derived(`${origin}${resolve('/overlay')}`);
</script>

<div class="backdrop">
<div class="page">
	<h1>streakingftw</h1>
	<enhanced:img src={obsScreenshot} alt="OBS scene running StreakingFTW, with the dock and overlay in place" />
	<p>
		StreakingFTW Win Tracker is a simple win/loss/tie tally tracker.<br>
		StreakingFTW, or "Streaking" for short, plugs into your OBS in two places:
	</p>
	<ol>
		<li>The <strong>Dock</strong> — A control panel with buttons to click (Win, Loss, Tie, Undo, New Session) for the streamer to interact with.</li>
		<li>The <strong>Overlay</strong> — A transparent overlay that shows the current tally to viewers. It updates instantly when the dock is used.</li>
	</ol>

	<h2>Setup</h2>
	<ol>
		<li>
			In <strong>OBS Sources</strong>, add a <strong>Browser Source</strong>.
			<enhanced:img src={addDockScreenshot} alt="Adding a Browser Source in OBS for the StreakingFTW dock" />
			<ol>
				<li>Set <strong>URL</strong> to <a href={dockUrl}>{dockUrl}</a><br>
				<em>(right-click the link and "Copy Link" to grab it.)</em></li>
			</ol>
		</li>
		<li>
			Add a second <strong>Browser Source</strong>
			<enhanced:img src={addSourceScreenshot} alt="Adding a Browser Source in OBS for the StreakingFTW overlay" />
			<ol>
				<li>Set <strong>URL</strong> to <a href={overlayUrl}>{overlayUrl}</a><br>
				<em>(right-click the link and "Copy Link" to grab it.)</em></li>
				<li>Place it in your scene wherever you want the tally shown to viewers.</li>
			</ol>
		</li>
	</ol>

	<p>
		<strong>Note:</strong>
		To size the overlay: OBS Browser Sources default to an 800×600 canvas, much bigger than one
		line of tally text — that's the empty space around the edges. Right-click the source →
		<strong>Properties</strong>, and set <strong>Width</strong> and <strong>Height</strong> there
		to something closer to the content, e.g. <code>600×150</code> for a single line. <strong>DO NOT</strong> resize
		using the on-canvas drag handles instead — that stretches the already-rendered image and it will look
		blurry.
	</p>

	<h2>3. Track wins, losses, and ties</h2>
	<p>
		Open the <strong>Dock Panel</strong> whenever you want to log a result, undo the
		last one, or start a new session. The overlay updates instantly since it's reading the same
		local storage session.
	</p>
	<p>Use the <strong>New Session</strong> button to start a fresh tally for your gaming session. This will keep a clear tally of the wins/losses/ties for the day/time you started playing</p>
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

	a {
		color: #73d216;
		word-break: break-all;
	}

	code {
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
