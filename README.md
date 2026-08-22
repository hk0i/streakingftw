# streakingftw

A win/loss/tie tally tracker for stream overlays. It plugs into OBS in two places:

- The **Dock** — a control panel with buttons (Win, Loss, Tie, Undo, New Session) for the streamer to
  click.
- The **Overlay** — a transparent overlay that shows the current tally to viewers, updating instantly
  when the dock is used.

One is a **Browser Source**, the other is a **Custom Dock**. They sync via the browser's local storage, so you have to use the same browser profile for both.

- [**Documentation**](https://hk0i.github.io/streakingftw/)
- [**Live demo — Dock**](https://hk0i.github.io/streakingftw/dock) (<https://hk0i.github.io/streakingftw/dock>)
- [**Live demo — Overlay:**](https://hk0i.github.io/streakingftw/overlay) <https://hk0i.github.io/streakingftw/overlay>

## Setup

1. In OBS Sources, add a **Custom Dock**
    1. Name it `StreakingFTW Dock` (or whatever you want to call it)
    2. Set the **URL** to: https://hk0i.github.io/streakingftw/dock
2. Add a **Browser Source** to your **Scene** in OBS.
    1. Set **URL** to: https://hk0i.github.io/streakingftw/dock
    2. Set its size:
        1. Set its **Width** to `600`
        2. Set its **Height** to `150`
        This size works great for the default 1 line layout. If you change the layout later you may have to adjust the size here.
    2. Position the overlay wherever you want the tally shown to viewers.

**Sizing the overlay:** OBS Browser Sources default to an 800×600 canvas, much bigger than one
line of tally text — that's the empty space around the edges. Right-click the source →
**Properties**, and set **Width** and **Height** there to something closer to the content, e.g.
`600×150` for a single line. Don't resize using the on-canvas drag handles instead — that
stretches the already-rendered image and it will look blurry.

**Tracking results:** Open the dock panel whenever you want to log a result, undo the last one, or
start a new session. The overlay updates instantly since it's reading the same local storage
session. Use **New Session** to start a fresh tally for the day/time you started playing.

## Developing

Install dependencies, then start the dev server:

```sh
npm install
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Type-check the project:

```sh
npm run check
```

## Building

```sh
npm run build
```

You can preview the production build with `npm run preview`.

This project is built with [`adapter-static`](https://svelte.dev/docs/kit/adapter-static) and
deployed to GitHub Pages via the workflow in `.github/workflows/`, which builds and publishes the
`build/` directory on every push to `master`. Because GitHub Pages serves project sites under
`/<repo-name>/`, the base path is configured in `vite.config.ts`.
