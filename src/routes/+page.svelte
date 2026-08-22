<h1>streakingftw</h1>
<p>A win/loss/tie tally tracker for stream overlays. A control panel you click, and a
	transparent overlay OBS reads — they stay in sync automatically.</p>

<h2>1. Open the dock</h2>
<p>
	<a href="/dock">/dock</a> is the control panel — Win, Loss, Tie, Undo, New Session. Open it on
	whatever device you'll use to log results, and keep that tab open.
</p>

<h2>2. Add the overlay to OBS</h2>
<ol>
	<li>In OBS, add a <strong>Browser Source</strong>.</li>
	<li>
		Set the URL to <code>/overlay</code> on the <strong>same origin</strong> (same deployed URL)
		as the dock tab. Syncing happens via the browser's local storage, which is per-origin — a
		dock and overlay pointed at different URLs (or one on desktop, one on a phone) won't see each
		other's updates.
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
		Don't resize using the on-canvas drag handles — that stretches the already-rendered image and
		looks blurry. The overlay's font size is set in viewport units, so it re-renders crisp at
		whatever Width/Height you set in Properties.
	</li>
</ul>

<style>
	:global(body) {
		background: #12161c;
		color: #f2f8ff;
		font-family: sans-serif;
	}

	h1,
	h2 {
		color: #f2f8ff;
	}

	a {
		color: #73d216;
	}

	code {
		background: #232b36;
		padding: 0.1em 0.4em;
		border-radius: 0.25em;
	}
</style>
