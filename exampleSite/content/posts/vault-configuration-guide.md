---
author: "Demo Author"
date: 2026-03-15
title: "Configuration"
description: "A complete reference for configuring the Vault Hugo theme via config.toml."
categories: ["Documentation"]
tags: ["configuration", "reference", "hugo"]
type: post
---

Vault is configured through your site's `config.toml` (or `config.yaml` / `config.json`). Most behavior is controlled by standard Hugo parameters — there are no hidden config files or theme-specific formats to learn.

## Minimal Setup

A working site needs very little:

```toml
baseURL = "https://example.com/"
title   = "My Site"
theme   = ["hugo-theme-vault"]

[params]
  description = "A short description of my site"
  author      = "Your Name"
```

Everything else has a sensible default.

## Site-Level Parameters

baseURL
: The root URL of your site, e.g. `https://example.com/`. Required by Hugo. Always set this before deploying.

title
: Your site's display name. Shown in the browser tab and the site header.

theme
: Add `"hugo-theme-vault"` to this array to enable the theme.

languageCode
: Your locale, such as `"en-US"`. Controls date formatting and other locale-sensitive output. Defaults to `"en-us"`.

## params

params.description
: A short description of your site. Used in the `<meta name="description">` tag and displayed in the site header.

params.author
: The author's name, shown in post metadata.

## Color Schemes

Vault includes a light and dark palette. The theme respects the visitor's system preference (`prefers-color-scheme`) by default and provides a toggle to switch manually. The choice is persisted in `localStorage`.

| Scheme | Background | Text | Primary | Secondary |
|--------|-----------|------|---------|-----------|
| `vault-light` | `#eaeaea` | `#252a34` | `#ff2e63` | `#08d9d6` |
| `vault-dark` | `#181825` | `#cdd6f4` | `#ff2e63` | `#08d9d6` |

Additional palettes (`nord`, `catppuccin-mocha`, `catppuccin-frappe`) are defined in SCSS but not yet exposed through the toggle. See `assets/scss/_themes.scss` to customize or add schemes.

## Installation

Install using one of these methods:

1. **Hugo modules** — import the theme via Hugo's module system:
   ```bash
   hugo mod init github.com/yourusername/your-site
   hugo mod get github.com/yourusername/hugo-theme-vault
   ```
   Then add the module path to your config:
   ```toml
   [module]
     [[module.imports]]
       path = "github.com/yourusername/hugo-theme-vault"
   ```

2. **Git submodule** — keep the theme isolated from your content:
   ```bash
   git submodule add https://github.com/yourusername/hugo-theme-vault.git themes/hugo-theme-vault
   ```

3. **Clone directly** — clone into `themes/` for immediate development:
   ```bash
   git clone https://github.com/yourusername/hugo-theme-vault.git themes/hugo-theme-vault
   ```

## Post Front Matter

Front matter is written in YAML at the top of each content file.

```yaml
---
title: "Post Title"
date: 2026-03-21
description: "A short summary shown in listings and meta tags."
author: "Your Name"
categories: ["Hugo"]
tags: ["theme", "minimal"]
hidden: false
---
```

`hidden`
: Set `hidden: true` to exclude the post from listings and pagination. The post is still accessible via its direct URL.

`type`
: Set `type: post` to ensure the post uses the correct layout. This is the default for content in `content/posts/`.

---

For custom shortcodes (`vault-image` and `vault-figure`), including live rendered examples and the full parameter reference, see the [Shortcodes](/posts/shortcodes/) post. For the full Hugo configuration reference, visit [gohugo.io/documentation](https://gohugo.io/documentation/).
