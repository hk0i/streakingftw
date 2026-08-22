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

	<h2>1. Open the dock</h2>
	<p>
		<a href={dockUrl}>{dockUrl}</a> is the control panel — Win, Loss, Tie, Undo, New Session. Open
		it on whatever device you'll use to log results, and keep that tab open.
	</p>

	<h2>2. Add the overlay to OBS</h2>
	<ol>
		<li>In OBS, add a <strong>Browser Source</strong>.</li>
		<li>
			Set the URL to <a href={overlayUrl}>{overlayUrl}</a> — right-click either link above and
			"Copy Link" to grab it. It must be on the <strong>same origin</strong> as the dock tab:
			syncing happens via the browser's local storage, which is per-origin, so a dock and overlay
			pointed at different origins (or one on desktop, one on a phone) won't see each other's
			updates.
		</li>
		<li>Click a result on the dock — the overlay text should update within the OBS preview.</li>
	</ol>

	<h2>3. Sizing the overlay in OBS</h2>
	<p>
		OBS Browser Sources default to an 800×600 canvas, which is much bigger than one line of tally
		text — that's the empty space around the edges. To fix it:
	</p>
	<ul>
		<li>
			Right-click the source → <strong>Properties</strong>, and set <strong>Width</strong> and
			<strong>Height</strong> there to something closer to the content, e.g. <code>600×150</code>
			for a single line.
		</li>
		<li>
			Don't resize using the on-canvas drag handles — that stretches the already-rendered image
			and looks blurry. The overlay's font size is set in viewport units, so it re-renders crisp
			at whatever Width/Height you set in Properties.
		</li>
	</ul>
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

	ol,
	ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	li {
		margin-bottom: 0.75rem;
	}

	li:last-child {
		margin-bottom: 0;
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
