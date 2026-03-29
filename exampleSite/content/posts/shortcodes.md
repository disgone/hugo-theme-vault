---
author: "Demo Author"
date: 2026-03-15
title: "Shortcodes"
description: "Reference for the custom shortcodes bundled with the Vault theme, with live rendered examples."
categories: ["Documentation"]
tags: ["shortcodes", "images", "reference"]
type: post
---

Vault ships two custom shortcodes for embedding images. Both tap into Hugo's image processing pipeline to serve optimized output — WebP conversion, responsive `srcset`, and layout-shift prevention — without any manual steps.

## Local vs. Remote Images

The shortcodes behave differently depending on the image source.

**Local images** (files in `assets/`) get the full treatment:
- Converted to WebP with the original as a `<picture>` fallback
- Responsive `srcset` and `sizes` generated for both formats
- Intrinsic `width` and `height` preserved to prevent layout shift

**Remote images** (external URLs) render as a single `<img>`. Hugo cannot process remote files at build time, so no WebP conversion or `srcset` is generated. Specify `width` and `height` manually to avoid layout shift.

> **Tip:** Images in `static/` bypass the Hugo pipeline entirely and are served as-is. Move images to `assets/` to get optimization benefits.

---

## vault-image

Renders an image without a caption. Use this for contextual images embedded in flow of text.

{{< vault-image src="photo.jpg" alt="Example: Basic vault-image shortcode without parameters — Sunlight filtering through a dense forest canopy" >}}

```markdown
{{</* vault-image src="photo.jpg" alt="Example: Basic vault-image shortcode without parameters — Sunlight filtering through a dense forest canopy" */>}}
```

### With explicit dimensions

Dimensions are auto-detected for local images. For remote images, always specify them to prevent cumulative layout shift.

{{< vault-image src="photo.jpg" alt="Example: vault-image with explicit width and height parameters — Sunlight filtering through a dense forest canopy" width="800" height="500" >}}

```markdown
{{</* vault-image src="photo.jpg" alt="Example: vault-image with explicit width and height parameters — Sunlight filtering through a dense forest canopy" width="800" height="500" */>}}
```

### Parameters

`src` *(required)*
: Path relative to `assets/` for local images, or a full URL for remote images.

`alt` *(required)*
: Accessible description of the image content. Announced by screen readers and shown when the image fails to load. Write this for accessibility, not decoration — "Sunlight filtering through a forest canopy" is better than "Nice forest photo".

`title`
: Sets the HTML `title` attribute (tooltip on hover). Keep this distinct from `alt` — they serve different purposes.

`width` / `height`
: Explicit pixel dimensions. Auto-detected for local images. Required for remote images to prevent layout shift.

`eager`
: Set `eager=true` to disable lazy loading. Use this on images that appear above the fold.

`format`
: Output format override. Accepted values: `webp`, `avif`, `jpeg`, `png`. Defaults to `webp` for local images.

`longdesc`
: URL of a page or fragment containing a detailed description. Use for charts, maps, or complex diagrams where short alt text is insufficient.

`describedby`
: ID of an on-page element that describes the image. Sets `aria-describedby` on the rendered `<img>`.

`class`
: CSS class(es) applied to the rendered outer element. Use theme helpers like `inset` or `inset-left` for editorial layouts, or add your own classes.

---

## vault-figure

Wraps image in `<figure>` and `<figcaption>`. Use this when a visible caption adds meaningful context for sighted users. Accepts all same parameters as `vault-image`, plus `title` as caption text.

{{< vault-figure src="photo.jpg" alt="Example: Basic vault-figure shortcode with caption — Sunlight filtering through a dense forest canopy" title="Example: Basic vault-figure shortcode with caption" >}}

```markdown
{{</* vault-figure src="photo.jpg" alt="Example: Basic vault-figure shortcode with caption — Sunlight filtering through a dense forest canopy" title="Example: Basic vault-figure shortcode with caption" */>}}
```

### Inset layout

Use `figureClass="inset"` when you want figure to float right within article text, reduced to roughly half the column width.

{{< vault-figure src="photo.jpg" alt="Example: vault-figure with inset layout for right-aligned figure — Sunlight filtering through a dense forest canopy" title="Example: vault-figure with inset layout (figureClass=\"inset\")" figureClass="inset" >}}

```markdown
{{</* vault-figure src="photo.jpg" alt="Example: vault-figure with inset layout for right-aligned figure — Sunlight filtering through a dense forest canopy" title="Example: vault-figure with inset layout (figureClass=\"inset\")" figureClass="inset" */>}}
```

Use `figureClass="inset-left"` for a left-aligned alternative.

### Markdown images

You can also write standard Markdown syntax and let the render hook add the same responsive markup automatically. Enable Goldmark attributes in your site config (see `config.toml`), then add attributes like `class`, `figure`, or `caption` directly after the image:

````markdown
![Forest canopy](photo.jpg "Caption via Title"){ class="inset" figure="true" figureclass="inset" }

![Fallback text](photo.jpg){ loading="eager" caption="Custom **Markdown** caption" }
````

Local bundle images inherit lazy loading, responsive `srcset`, and optional `<figure>` wrappers without switching to a shortcode.

### Above-fold image with eager loading

For images that appear before the user scrolls, lazy loading causes a noticeable delay. Use `eager=true` to force immediate loading.

{{< vault-figure src="screenshot.jpg" alt="Example: vault-figure with eager loading for above-fold images — Theme configuration panel showing color scheme options" title="Example: vault-figure with eager loading (eager=true) for above-fold images" eager=true >}}

```markdown
{{</* vault-figure src="screenshot.jpg" alt="Example: vault-figure with eager loading for above-fold images — Theme configuration panel showing color scheme options" title="Example: vault-figure with eager loading (eager=true) for above-fold images" eager=true */>}}
```

### Additional parameters

`title`
: The caption rendered in `<figcaption>`. Write this for sighted users who want context — keep it distinct from `alt`, which is for screen readers.

`figureClass`
: CSS class(es) applied to the rendered `<figure>` element. Use `inset` or `inset-left` for editorial layouts.

All other parameters are the same as `vault-image`.

---

## Accessibility Checklist

Before publishing any post with images:

- [ ] `alt` describes what the image shows, not its visual style
- [ ] `alt` and `title` (caption) are distinct — each written for a different audience
- [ ] Decorative images use `alt=""` to be skipped by screen readers
- [ ] Complex visuals (charts, maps, diagrams) include a `longdesc` or `describedby` reference
- [ ] Above-fold images use `eager=true`
- [ ] Images live in `assets/`, not `static/`
