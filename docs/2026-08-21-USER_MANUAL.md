# Win Tracker — User Manual

**Date:** 2026-08-21

## What you need

- OBS Studio.
- The Win Tracker URL: `https://hk0i.github.io/wintracker/`.

That's it — no install, no build step, no account.

## Setup

1. **Add the Dock** (your control panel — only you see this):
   `View → Docks → Custom Browser Docks…`, then paste:
   ```
   https://hk0i.github.io/wintracker/dock
   ```

2. **Add the Overlay** (what your viewers see):
   In your scene, add a **Browser Source**, and paste:
   ```
   https://hk0i.github.io/wintracker/overlay
   ```
   Size it to taste.

Once both are added, clicking a button in the Dock updates the Overlay instantly.

## Using the Dock (Phase 1)

- **Win / Loss / Tie** — click to record a result; the tally updates immediately.
- **Undo** — remove the most recently recorded result.
- **New Session** — closes out the current session and starts a fresh one: clears the tally
  back to zero and records a new start time.
- Your tally is saved to your browser's local storage, so it survives closing and reopening
  OBS. It is **not** sent anywhere or synced across machines.
- To fully clear saved data, use Reset, or clear OBS's browser cache for the Dock/Overlay
  sources.

## Customizing the Overlay text (Phase 1)

The Overlay renders a template you control, using tokens in curly braces:

| Token | Meaning |
|---|---|
| `{wins}` | Win count |
| `{losses}` | Loss count |
| `{ties}` | Tie count |
| `{total}` | Total games (wins + losses + ties) |

Default template: `{wins}W {losses}L {ties}T`

Examples:
- `{wins}-{losses}-{ties}` → `5-2-1`
- `Record: {wins}W {losses}L` → `Record: 5W 2L`

A misspelled or unrecognized token (e.g. `{winz}`) is shown as-is rather than breaking the
Overlay, so it's always safe to experiment.

## Using Profiles (Phase 2 — coming soon)

Once shipped, you'll be able to:
- Create named profiles (e.g. "Tank", "DPS", "Support").
- Switch your active profile from the Dock.
- Track a separate W/L/T tally per profile, alongside the session-wide total.
- Assign a custom icon to each profile, shown on the Overlay.

## Using Game Icon Packs (Phase 3 — coming soon)

Once shipped, you'll be able to select a bundled icon pack (Overwatch role/rank icons, CS2
rank icons) from a gallery in the Dock's settings, instead of uploading your own icons.

## Troubleshooting

- **Overlay isn't updating** — make sure both the Dock and Overlay are pointed at the same
  host (`hk0i.github.io`), not a local copy for one and the hosted URL for the other.
- **My counts reset unexpectedly** — this happens if OBS's browser cache/data was cleared,
  since the tally is stored in local browser storage. There is no cloud backup.
- **Overlay looks too big/small** — adjust the Browser Source's width/height in OBS; the
  overlay text scales to fit.

## FAQ

**Does this work for any game?**
Yes — the default (generic) mode is just Win/Loss/Tie and works for anything. Profiles and
icon packs (Phases 2–3) are optional, game-specific enhancements.

**Is any of my data sent anywhere?**
No. Everything is stored locally in your browser via `localStorage`. There is no server and
no account.
