# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- Dock (`/dock`): button heights (win/loss/tie, undo/new-session, settings,
  profile select), the win/loss/tie font size, and the page's padding/gaps
  now scale down smoothly as the available viewport height shrinks (via CSS
  `clamp()`), so the dock stays usable in short OBS browser-source windows.
  Sizing is unchanged above ~530-600px of viewport height; below that it
  shrinks toward a usable floor, targeting a 300px-tall window as the
  minimum.
