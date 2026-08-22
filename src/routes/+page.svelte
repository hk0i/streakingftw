<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	let origin = $state('');

	onMount(() => {
		origin = window.location.origin;
	});

	const dockUrl = $derived(`${origin}${base}/dock`);
	const overlayUrl = $derived(`${origin}${base}/overlay`);
</script>

<div class="backdrop">
<div class="page">
	<h1>streakingftw</h1>
	<p>
		A win/loss/tie tally tracker for stream overlays. A control panel you click, and a
		transparent overlay OBS reads — they stay in sync automatically.
	</p>

	<h2>1. Add the dock to OBS</h2>
	<p>
		In OBS, add a <strong>Browser Source</strong> set to <a href={dockUrl}>{dockUrl}</a> —
		right-click the link and "Copy Link" to grab it. This is the control panel: Win, Loss, Tie,
		Undo, New Session.
	</p>
	<p>
		You won't see it update from the scene view — right-click the source and choose
		<strong>Interact</strong> to open a window where you can actually click its buttons.
	</p>

	<h2>2. Add the overlay to OBS</h2>
	<p>
		Add a second <strong>Browser Source</strong> set to <a href={overlayUrl}>{overlayUrl}</a>,
		placed in your scene wherever you want the tally shown to viewers.
	</p>
	<p>
		Both sources must be on the <strong>same origin</strong> — syncing happens via the browser's
		local storage, which is per-origin. Browser Sources in the same OBS install share that
		storage automatically, so as long as both URLs match (same domain, same base path), the dock
		and overlay will stay in sync.
	</p>
	<p>
		To size the overlay: OBS Browser Sources default to an 800×600 canvas, much bigger than one
		line of tally text — that's the empty space around the edges. Right-click the source →
		<strong>Properties</strong>, and set <strong>Width</strong> and <strong>Height</strong> there
		to something closer to the content, e.g. <code>600×150</code> for a single line. Don't resize
		using the on-canvas drag handles instead — that stretches the already-rendered image and looks
		blurry, whereas the overlay's font size is set in viewport units and re-renders crisp at
		whatever Width/Height you set in Properties.
	</p>

	<h2>3. Track wins, losses, and ties</h2>
	<p>
		Open the dock's <strong>Interact</strong> window whenever you want to log a result, undo the
		last one, or start a new session. The overlay updates instantly since it's reading the same
		local storage session.
	</p>
	<p>
		You can also open the dock URL in a regular browser tab instead of using Interact — just make
		sure it's the exact same URL as the overlay source.
	</p>
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
</style>
