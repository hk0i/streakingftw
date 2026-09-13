# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- Dock (`/dock`): win/loss/tie and undo/new-session button heights and the
  win/loss/tie font size now scale down smoothly as the available viewport
  height shrinks (via CSS `clamp()`), so the dock stays usable in short OBS
  browser-source windows. Sizing is unchanged above ~530-600px of viewport
  height; below that it shrinks toward a usable floor, targeting a 300px-tall
  window as the minimum.
