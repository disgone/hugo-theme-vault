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

Renders an image without a caption. Use this for contextual images embedded in the flow of text.

{{< vault-image src="photo.jpg" alt="Sunlight filtering through a dense forest canopy" >}}

```markdown
{{</* vault-image src="photo.jpg" alt="Sunlight filtering through a dense forest canopy" */>}}
```

### With explicit dimensions

Dimensions are auto-detected for local images. For remote images, always specify them to prevent cumulative layout shift.

{{< vault-image src="photo.jpg" alt="Sunlight filtering through a dense forest canopy" width="800" height="500" >}}

```markdown
{{</* vault-image src="photo.jpg" alt="Sunlight filtering through a dense forest canopy" width="800" height="500" */>}}
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

Wraps the image in `<figure>` and `<figcaption>`. Use this when a visible caption adds meaningful context for sighted users. Accepts all the same parameters as `vault-image`, plus `title` as the caption text.

{{< vault-figure src="photo.jpg" alt="Sunlight filtering through a dense forest canopy" title="Old-growth forest, Pacific Northwest" >}}

```markdown
{{</* vault-figure src="photo.jpg" alt="Sunlight filtering through a dense forest canopy" title="Old-growth forest, Pacific Northwest" */>}}
```

### Inset layout

Use `figureClass="inset"` when you want the figure to float right within article text, reduced to roughly half the column width.

{{< vault-figure src="photo.jpg" alt="Sunlight filtering through a dense forest canopy" title="Old-growth forest, Pacific Northwest" figureClass="inset" >}}

```markdown
{{</* vault-figure src="photo.jpg" alt="Sunlight filtering through a dense forest canopy" title="Old-growth forest, Pacific Northwest" figureClass="inset" */>}}
```

Use `figureClass="inset-left"` for a left-aligned alternative.

### Above-fold image with eager loading

For images that appear before the user scrolls, lazy loading causes a noticeable delay. Use `eager=true` to force immediate loading.

{{< vault-figure src="screenshot.jpg" alt="Theme configuration panel showing color scheme options" title="Vault theme configuration — color scheme selector" eager=true >}}

```markdown
{{</* vault-figure src="screenshot.jpg" alt="Theme configuration panel showing color scheme options" title="Vault theme configuration — color scheme selector" eager=true */>}}
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
