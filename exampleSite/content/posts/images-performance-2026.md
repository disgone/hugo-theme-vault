---
title: "Images Performance Optimization in 2026"
date: 2026-03-20
description: "Understanding CLS, srcset, and proper image sizing for modern web performance"
---

# Images Performance Optimization in 2026

## The Problem: Cumulative Layout Shift (CLS)

CLS is a Core Web Vital that measures visual stability. Images without explicit dimensions cause layout shifts as they load.

## Before: Without Width/Height Attributes

This image has no explicit dimensions. The browser doesn't know the aspect ratio until the image loads, causing the text to shift.

{{< vault-figure src="https://via.placeholder.com/800x400?text=No+Width%2FHeight+Attribute" title="Image without width/height - causes CLS!" >}}

**⚠️ Performance Impact:**
- First Contentful Paint (FCP): Slower
- Cumulative Layout Shift (CLS): Higher score (0.25+)
- User Experience: Text jumps around as image loads

## After: With Width/Height Attributes

Now we add explicit `width` and `height` attributes. The browser knows the dimensions upfront.

{{< vault-figure src="https://via.placeholder.com/800x400/3498db/ffffff?text=With+Width%2FHeight+Attributes" title="Image with width/height - no CLS!" width="800" height="400" >}}

**✅ Performance Impact:**
- First Contentful Paint (FCP): Faster
- Cumulative Layout Shift (CLS): 0.0 (perfect score)
- User Experience: Stable layout, no jumping

## Using vault-image vs vault-figure

The theme provides two shortcodes for images:

### vault-image (No Caption)

Use when you just need the image with optimization:

```markdown
{{< vault-image src="photo.jpg" alt="A mountain lake at sunrise" >}}
```

Features:
- Lazy loading by default
- Auto-detect dimensions for local images
- Local images get responsive `srcset` and `sizes`
- Local images serve WebP first with the original format as fallback
- Intrinsic dimensions stay in markup for local images to prevent CLS
- Remote images render as a single responsive `<img>` and do not get generated `srcset`

### vault-figure (With Caption)

Use when you want a semantic figure with a caption:

```markdown
{{< vault-figure src="photo.jpg" alt="A mountain lake at sunrise" title="Morning light over the water" variant="small" >}}
```

Features:
- All features of `vault-image`
- Adds `<figure>` and `<figcaption>` tags
- Supports the documented `normal` and `small` variants
- Title is used as caption

## How to Use

Choose the shortcode based on your needs:

**For photos without captions:**
```markdown
{{< vault-image src="photo.jpg" alt="A mountain lake at sunrise" >}}
```

**For images with captions:**
```markdown
{{< vault-figure src="photo.jpg" alt="A mountain lake at sunrise" title="Morning light over the water" >}}
```

**For responsive layouts with variant classes:**
```markdown
{{< vault-figure src="photo.jpg" alt="A mountain lake at sunrise" title="Morning light over the water" variant="small" >}}
{{< vault-figure src="hero.jpg" alt="A wide landscape banner" title="Hero section" width="1920" height="1080" eager=true >}}
```

## Performance Comparison

| Metric | Without Dimensions | With Dimensions |
|--------|-------------------|-----------------|
| CLS Score | 0.25 - 0.5 | 0.0 |
| FCP | ~1.5s | ~1.2s |
| Visual Stability | Poor | Excellent |
| SEO Impact | Negative | Positive |

## Local vs Remote Images

- Local images get generated `srcset` candidates for WebP and the original format.
- Local images keep intrinsic `width` and `height` in the fallback `<img>` so the browser can reserve space.
- Remote images render as a single responsive `<img>`, but the shortcode does not generate `srcset` for remote URLs.

## Why This Matters in 2026

- **Core Web Vitals**: CLS is a ranking factor
- **Mobile Performance**: Critical for mobile users
- **Accessibility**: Stable layouts are easier for screen readers
- **Conversion**: Layout shifts increase bounce rates

## Quick Reference

```markdown
# vault-image - Just the image
{{< vault-image src="image.jpg" alt="A sample image" >}}

# vault-image - With dimensions
{{< vault-image src="image.jpg" alt="A sample image" width="800" height="600" >}}

# vault-figure - With caption
{{< vault-figure src="image.jpg" alt="A sample image" title="Caption" >}}

# Above-fold image (eager loading)
{{< vault-figure src="hero.jpg" alt="A sample hero image" title="Hero" width="1920" height="1080" eager=true >}}
```

## Technical Details

### vault-image
- Local images render as `<picture>` with a WebP `<source>` plus fallback `<img>`
- The fallback `<img>` keeps intrinsic `width` and `height`
- Both WebP and fallback markup include `srcset` and `sizes` for local images
- Remote images render as a single `<img>` with responsive CSS hooks
- No semantic wrapper
- Best for standalone images

### vault-figure
- Semantic `<figure>` and `<figcaption>`
- CSS variant support
- Best for images with captions

## Testing

Run Lighthouse to measure your CLS score:

```bash
npx lighthouse https://your-site.com --view
```

A score of **0.0 - 0.1** is excellent for CLS!

---

*Learn more about Core Web Vitals: [web.dev/CLS](https://web.dev/cls/)*
