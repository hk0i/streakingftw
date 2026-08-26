export type Dictionary<T> = { [K in keyof T]: T[K] extends string ? string : Dictionary<T[K]> };

export const en = {
	dock: {
		settingsAriaLabel: 'Profile settings',
		generic: 'Generic',
		copyUrl: '🔗 Copy URL',
		win: 'Win',
		loss: 'Loss',
		tie: 'Tie',
		undo: 'Undo',
		newSession: 'New Session',
		overlayFormatLabel: 'Overlay format',
		templateHelpAriaLabel: 'Template token help'
	},
	landing: {
		title: 'streakingftw',
		heroImgAlt: 'OBS scene running StreakingFTW, with the dock and overlay in place',
		introText:
			'StreakingFTW Win Tracker is a simple win/loss/tie tally tracker.<br>StreakingFTW, or "Streaking" for short, plugs into your OBS in two places:',
		introDockItem:
			'The <strong>Dock</strong> — A control panel with buttons to click (Win, Loss, Tie, Undo, New Session) for the streamer to interact with.',
		introOverlayItem:
			'The <strong>Overlay</strong> — A transparent overlay that shows the current tally to viewers. It updates instantly when the dock is used.',
		setupHeading: 'Setup',
		setupStep1: 'In <strong>OBS Sources</strong>, add a <strong>Browser Source</strong>.',
		addDockImgAlt: 'Adding a Browser Source in OBS for the StreakingFTW dock',
		urlLabel: 'Set <strong>URL</strong> to',
		copyLinkHint: '(right-click the link and "Copy Link" to grab it.)',
		setupStep2: 'Add a second <strong>Browser Source</strong>',
		addSourceImgAlt: 'Adding a Browser Source in OBS for the StreakingFTW overlay',
		placeOverlayItem: 'Place it in your scene wherever you want the tally shown to viewers.',
		sizingNote:
			'<strong>Note:</strong> To size the overlay: OBS Browser Sources default to an 800×600 canvas, much bigger than one line of tally text — that\'s the empty space around the edges. Right-click the source → <strong>Properties</strong>, and set <strong>Width</strong> and <strong>Height</strong> there to something closer to the content, e.g. <code>600×150</code> for a single line. <strong>DO NOT</strong> resize using the on-canvas drag handles instead — that stretches the already-rendered image and it will look blurry.',
		trackHeading: '3. Track wins, losses, and ties',
		trackP1:
			"Open the <strong>Dock Panel</strong> whenever you want to log a result, undo the last one, or start a new session. The overlay updates instantly since it's reading the same local storage session.",
		trackP2:
			'Use the <strong>New Session</strong> button to start a fresh tally for your gaming session. This will keep a clear tally of the wins/losses/ties for the day/time you started playing',
		badgesHeading: '4. Add rank & role badges (optional)',
		badgesP1:
			"If you're using <strong>profiles</strong> to track separate stats per role or game mode, each profile can also show a game-specific badge. Today there's one bundled pack — <strong>Overwatch</strong> (role icons and rank tier badges, Bronze through Champion).",
		badgesStep1: 'Open the Dock and click the gear icon to open <strong>Profile settings</strong>.',
		badgesStep2:
			"Under a profile's <strong>Badge</strong> row, click a role icon and/or a rank badge to select it — click a selected one again to clear it.",
		badgesStep3:
			"The badge shows next to that profile's tally in the Dock, and on the Overlay next to that profile's text.",
		badgesFormatP:
			"To show the rank as text too, add <code>{rank}</code> to that profile's custom output format, e.g. <code>{profile_name} ({rank}) {wins}W {losses}L {ties}T</code>.",
		translationFeedback:
			'Found a translation error? <a href="https://github.com/hk0i/streakingftw/issues">Report it on GitHub</a>.'
	},
	profileSettings: {
		heading: 'Profile settings',
		closeAriaLabel: 'Close',
		generic: 'Generic',
		deletePrefix: 'Delete',
		deleteButton: 'Delete',
		customFormat: 'Custom format',
		badge: 'Badge',
		includeInLink: 'Include in link',
		copyUrlSelected: 'Copy URL for selected',
		addProfileHeading: 'Add New Profile',
		hint: 'Each profile keeps its own win/loss/tie tally and overlay link, separate from the generic session — use one per game, or role (Tank, DPS, Support), or whatever makes sense for your stream.',
		newProfilePlaceholder: 'New profile name',
		addButton: 'Add'
	},
	helpOverlay: {
		heading: 'Template tokens',
		closeAriaLabel: 'Close',
		tokenColumn: 'Token',
		meaningColumn: 'Meaning',
		hint: 'Unrecognized tokens are shown as-is, so typos are safe.'
	},
	copyUrlButton: {
		defaultLabel: 'Copy overlay URL',
		copied: 'Copied!',
		clipboardUnavailable: 'Clipboard unavailable — copy manually:'
	}
} as const;
