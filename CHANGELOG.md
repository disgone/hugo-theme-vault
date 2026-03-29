# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.0](https://github.com/disgone/hugo-theme-vault/compare/hugo-theme-vault-v3.0.0...hugo-theme-vault-v3.1.0) (2026-03-29)


### Added

* **theme:** add smooth theme transition and remove toggle padding ([#35](https://github.com/disgone/hugo-theme-vault/issues/35)) ([14933a5](https://github.com/disgone/hugo-theme-vault/commit/14933a572b49d1e0b10194e8429bb98a66d5bcf2))

## [3.0.0](https://github.com/disgone/hugo-theme-vault/compare/hugo-theme-vault-v2.0.0...hugo-theme-vault-v3.0.0) (2026-03-29)


### ⚠ BREAKING CHANGES

* **templates:** The site param tokenSeperator has been renamed to tokenSeparator to correct the spelling. Update your config:

### Fixed

* module shortcode resolution, custom asset hooks, LVHA cascade ([#32](https://github.com/disgone/hugo-theme-vault/issues/32)) ([9a3158a](https://github.com/disgone/hugo-theme-vault/commit/9a3158a8e4750b97096de6fa0f881b82855a423b))
* **templates:** rename tokenSeperator param to tokenSeparator ([#33](https://github.com/disgone/hugo-theme-vault/issues/33)) ([28a2fda](https://github.com/disgone/hugo-theme-vault/commit/28a2fda136ebf64e5bae211be71625ee6840b8e1))

## [2.0.0](https://github.com/disgone/hugo-theme-vault/compare/hugo-theme-vault-v1.0.0...hugo-theme-vault-v2.0.0) (2026-03-28)


### ⚠ BREAKING CHANGES

* major theme overhaul ([#30](https://github.com/disgone/hugo-theme-vault/issues/30))

### Added

* major theme overhaul ([#30](https://github.com/disgone/hugo-theme-vault/issues/30)) ([80556e7](https://github.com/disgone/hugo-theme-vault/commit/80556e7aaed471e101d82cee0970076356145913))

## [1.0.0](https://github.com/Disgone/hugo-theme-vault/releases/tag/v1.0.0) (2026-03-28)

### Added
- Dark/light theme toggle with sun/moon icons
- Automatic system preference detection for theme
- localStorage persistence for theme selection across navigation
- 5 theme schemes: vault-light, vault-dark, nord, catppuccin-mocha, catppuccin-frappe
- Theme configuration via `[params.theme]` in config.toml
- Variable fonts (Geist family: serif, sans, heading, mono)
- Auto-detecting image dimensions for local images
- Lazy loading for images (enabled by default)
- WebP image format support with `<picture>` fallback markup
- Image display modes: `fill` (object-fit) and `fit` (contain)
- SCSS layered architecture: Base, Content, Layout, Component layers
- Design token system with semantic color mapping
- Example site with setup script
- Hugo Modules support
- Hugo Pipes CSS pipeline (SCSS, fingerprinting, SRI)
- Resource hints for faster loading
- Conditional syntax highlighting CSS

### Fixed
- Dark mode persistence across navigation
- Image dimension detection for responsive shortcodes
- Aspect ratio handling to prevent resize squash
- Footer default copyright year and title
