# AGENTS.md

This file provides coding standards and development commands for agentic AI coding assistants working on the hugo-theme-vault repository.

## Project Overview

Hugo theme for blogs and personal sites. Hugo 0.110+ required. Primary languages: HTML templates and SCSS (no JavaScript source code).

## Build & Run Commands

### Development
```bash
cd exampleSite
./setup.sh  # Creates symlink to theme for local dev
hugo server
```
Visit http://localhost:1313 to preview changes.

### Production Build
```bash
hugo
```

### No Testing
This theme has no test framework. Manual testing via hugo server only.

## Code Style Guidelines

### EditorConfig
- 4 space indentation (not tabs)
- LF line endings
- UTF-8 charset
- Trim trailing whitespace
- No final newline (per .editorconfig)

### Hugo Templates (.html)

**Whitespace Control:**
- Use `{{- ` and ` -}}` to trim surrounding whitespace
- Default: `{{ }}` preserves whitespace

**Block Definitions:**
```html
{{ define "title" }}{{ .Title }}{{ end }}
{{ define "main" }}{{ .Content }}{{ end }}
{{ block "footer" . }}default{{ end }}
```

**Partials:**
```html
{{ partial "path/to/partial.html" . }}
```

**Variables & Logic:**
- Use `$` for shorthand: `$var := .Get "param"`
- Use `with` for conditional blocks: `{{ with .Description }}{{ . }}{{ end }}`
- Use `if/else` for boolean logic

**Functions:**
- Use Hugo's pipe syntax: `{{ .Title | markdownify }}`
- Default values: `{{ default "value" .Param }}`

### SCSS

**Variables:**
```scss
// Theme configuration - edit assets/scss/_settings.scss
$font-family-serif: "Literata", Georgia, serif;

// CSS custom property aliases
$color-primary: var(--color-primary, #ff2e63);
```

**Mixins for Responsive Breakpoints:**
```scss
@include screen-lrg { ... }    // min-width: 992px
@include screen-medm { ... }   // min-width: 768px
@include screen-med { ... }    // 768px - 991px
```

**Nesting:**
- Max 3 levels deep to avoid selector bloat
- Use variables for repeated values

**Naming Conventions:**
- Use hyphens: `.content-grid`, `.site-header`
- IDs for anchors only: `#site-header`, `#home-welcome`

**Selector Ordering (within files):**
1. Base HTML elements (with common elements first): html, body, a, h1-h6, img, p, main
2. Remaining base elements alphabetically
3. Classes alphabetically
4. Pseudo selectors
5. IDs
6. Media queries (at end of file)

**Property Ordering:**
- Alphabetical (asc) within selectors

**SCSS Organization:**
- Foundation partials (`_tokens.scss`, `_themes.scss`, `_variables.scss`, `_mixins.scss`, `_fonts.scss`, `_reset.scss`) imported first
- Base layer (`_base.scss`) for document and element defaults (all base HTML element rules belong here)
- Content layer (`_content.scss`) for article-specific and typography classes
- Layout layer (`_layout.scss`) for site shell, header, footer, pagination
- Component partials (`_vault-figure.scss`, `_theme-toggle.scss`, etc.) for reusable blocks
- `main.scss` is the single entrypoint importing foundation then layers in order
- Component-specific rules (including media queries) belong in component partials, not in base/content/layout layers
- Colocated media queries: keep responsive rules at end of file using breakpoint mixins

**Imports Order:**
```scss
@import 'tokens';
@import 'themes';
@import 'variables';
@import 'mixins';
@import 'fonts';
@import 'reset';
@import 'base';
@import 'layout';
@import 'content';
@import 'vault-figure';
@import 'theme-toggle';
```

### HTML

**Semantic Elements:**
- Use `<article>`, `<header>`, `<main>`, `<footer>`, `<section>`, `<aside>`
- Heading hierarchy: h1-h6 properly nested

**Accessibility:**
- ARIA attributes where needed: `aria-describedby`
- Alt text required: `alt="{{ $alt }}"`
- Progressive enhancement: `<noscript>` fallbacks
- Use `loading="lazy"` for images (eager for above-fold)

**Inline Styles:**
- Minimize inline styles
- Only exception: critical CSS in baseof.html head for performance

### CSS Pipeline

Processing: `.scss` → `toCSS` → `fingerprint` → `Integrity`

Example:
```html
{{ $css := resources.Get "scss/main.scss" | toCSS | fingerprint }}
<link rel="stylesheet" href="{{ $css.RelPermalink }}" integrity="{{ $css.Data.Integrity }}" crossorigin="anonymous">
```

## Project Structure

```
layouts/
  _default/        # Base templates
  partials/         # Reusable components
  shortcodes/       # Markdown shortcodes
assets/scss/        # Stylesheets
  _base.scss        # Document and element defaults
  _content.scss     # Article/content styling
  _layout.scss      # Site shell and layout
  _vault-figure.scss # Figure shortcode styling
  _theme-toggle.scss # Theme toggle styling
  _tokens.scss      # Color schemes and tokens
  _themes.scss      # CSS custom property emission
  _variables.scss   # Sass variable aliases
  _mixins.scss      # Shared mixins and breakpoints
  _fonts.scss       # Font imports
  _reset.scss       # CSS reset
  main.scss         # Entrypoint importing all partials
  syntax.scss       # Syntax highlighting (separate pipeline)
static/             # Static files (fonts, favicon)
archetypes/         # Content templates (default.md, blog.md)
exampleSite/        # Demo site (development/testing)
```

## Shortcodes

### vault-image
```markdown
{{< vault-image src="photo.jpg" alt="Description" >}}
```
Features: lazy loading, auto-detect dimensions, WebP conversion, progressive enhancement.

Parameters: `src` (required), `alt` (required), `title`, `width`, `height`, `eager`, `format`, `longdesc`, `describedby`.

### vault-figure
```markdown
{{< vault-figure src="photo.jpg" alt="Description" title="Caption" >}}
```
Same as vault-image with caption display.

## Content

Front matter format (YAML):
```yaml
---
title: "Post Title"
date: 2026-03-21
description: "Post description"
categories: ["Hugo"]
tags: ["theme", "minimal"]
hidden: false  # Hide from listings
---
```

Use `hugo new posts/my-post.md` to create content.
