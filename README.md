# streakingftw

A win/loss/tie tally tracker for stream overlays. It plugs into OBS in two places:

- **Dock** — a control panel with buttons (Win, Loss, Tie, Undo, New Session) for the streamer to
  click.
- **Overlay** — a transparent overlay that shows the current tally to viewers, updating instantly
  when the dock is used.

Both are pages served by this app and added to OBS as Browser Sources; they sync via the
browser's local storage. The app's root page has full setup instructions once it's running.

- **Documentation:** <https://hk0i.github.io/streakingftw/>
- **Live demo — Dock:** <https://hk0i.github.io/streakingftw/dock>
- **Live demo — Overlay:** <https://hk0i.github.io/streakingftw/overlay>

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
