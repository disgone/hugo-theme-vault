---
author: "Demo Author"
date: 2026-03-15
title: "Vault Theme Configuration Guide"
description: "A complete reference for configuring and customizing the Vault Hugo theme."
categories: ["Documentation"]
tags: ["configuration", "reference", "hugo"]
type: post
---

Vault is a minimalist Hugo theme built for blogs and personal sites. It features clean typography, responsive design, and a carefully curated color system that works seamlessly across light and dark modes.

## Configuration Parameters

The theme behavior is controlled through standard Hugo site configuration. These are the parameters that Vault uses most frequently.

baseURL
: The root URL of your site, e.g. `https://example.com/`. This value is required by Hugo and should always be set.

title
: Your site's display name, shown in the browser tab and site header.

theme
: Add `"hugo-theme-vault"` to this array to enable the theme.

languageCode
: Set to your locale, such as `"en-US"`. Controls date formatting and other localization.

params.description
: A short description for your site, used in meta tags and the site header.

params.author
: The author's name, displayed in post metadata.

params.colorScheme
: Sets the default color scheme. Options include `vault-light`, `vault-dark`, `nord`, `catppuccin-mocha`, and `catppuccin-frappe`.

## Installation

Install using one of these methods:

1. **Hugo modules** — Import the theme via Hugo's native module system for a dependency-free setup:
   ```bash
   hugo mod init github.com/yourusername/your-site
   hugo mod get github.com/yourusername/hugo-theme-vault
   ```
2. **Git submodule** — Add the repository as a submodule to keep the theme isolated from your content:
   ```bash
   git submodule add https://github.com/yourusername/hugo-theme-vault.git themes/hugo-theme-vault
   ```
3. **Clone directly** — Clone the theme into your `themes/` directory and run `hugo server` from the `exampleSite` folder for immediate development.

## Color Schemes

Vault ships with five carefully balanced color palettes. Each scheme defines base colors, text contrast levels, and accent colors that work together to maintain visual hierarchy across both modes.

| Scheme | Page Background | Text | Primary Accent | Secondary Accent |
|--------|-----------------|------|----------------|------------------|
| vault-light | `#eaeaea` | `#252a34` | `#ff2e63` (pink) | `#08d9d6` (cyan) |
| vault-dark | `#181825` | `#cdd6f4` | `#ff2e63` (pink) | `#08d9d6` (cyan) |
| nord | `#2e3440` | `#eceff4` | `#88c0d0` (ice blue) | `#81a1c1` (steel) |
| catppuccin-mocha | `#1e1e2e` | `#cdd6f4` | `#f5c2e7` (pink) | `#89b4fa` (blue) |
| catppuccin-frappe | `#303446` | `#c6d0f5` | `#f2a5c5` (rose) | `#b8baee` (lavender) |

Switch schemes dynamically using the theme toggle, or set a default in your configuration file.

## Using Shortcodes

Vault includes two custom shortcodes for embedding images with accessibility and performance features built in.

### vault-image

Use this for inline or contextual images where no caption is needed:

{{< vault-image src="photo.jpg" alt="Golden sunset over mountain ridge" >}}

Use this shortcode:

```markdown
{{</* vault-image src="photo.jpg" alt="Golden sunset over mountain ridge" */>}}
```

The shortcode automatically generates WebP variants, sets appropriate dimensions to prevent layout shift, and applies lazy loading for improved performance.

### vault-figure

Use this when you want to display a caption below the image:

{{< vault-figure src="screenshot.jpg" alt="Configuration panel showing color scheme options" title="Color scheme settings in config.toml" >}}

Use this shortcode:

```markdown
{{</* vault-figure src="screenshot.jpg" alt="Configuration panel showing color scheme options" title="Color scheme settings in config.toml" */>}}
```

Additional parameters include `width`, `height`, `eager` (for above-fold images), and `longdesc` for linking to detailed descriptions of complex visuals.

## Performance Notes

> **Tip:** Set `eager=true` on any image that appears above the fold. While lazy loading improves page speed, it can cause visible delays on hero images and featured graphics. The `eager` parameter forces immediate loading regardless of scroll position.

Always specify `alt` text that describes the image content, not its visual appearance. Screen readers announce alt text to visually impaired users — "A golden sunset" is better than "Yellow and orange gradient sky."

## CLI Quick Reference

These Hugo commands are the ones you'll use most during development.

hugo
: Build your site to the `public/` directory, processing all content and assets.

hugo server
: Start a local development server with live reload at `http://localhost:1313`.

hugo new posts/my-post.md
: Create a new post file in `content/posts/` with the default front matter template.

hugo new theme/my-theme
: Scaffold a new Hugo theme in the `themes/` directory.

---

For more details on Hugo itself, visit the [official Hugo documentation](https://gohugo.io/documentation/). For theme-specific questions, check the Vault repository for known issues and feature requests.