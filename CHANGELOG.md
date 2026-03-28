# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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