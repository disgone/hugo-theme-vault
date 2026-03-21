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
{{< vault-image src="photo.jpg" title="My Photo" >}}
```

Features:
- Lazy loading by default
- Auto-detect dimensions for local images
- Automatic WebP generation with JPG fallback
- Prevents CLS

### vault-figure (With Caption)

Use when you want semantic figure semantics with a caption:

```markdown
{{< vault-figure src="photo.jpg" title="My Photo" variant="small" >}}
```

Features:
- All features of `vault-image`
- Adds `<figure>` and `<figcaption>` tags
- Supports CSS variants (normal, small, large)
- Title is used as caption

## How to Use

Choose the shortcode based on your needs:

**For photos without captions:**
```markdown
{{< vault-image src="photo.jpg" title="My Photo" >}}
```

**For images with captions:**
```markdown
{{< vault-figure src="photo.jpg" title="My Photo" >}}
```

**For responsive layouts with variant classes:**
```markdown
{{< vault-figure src="photo.jpg" title="Photo" variant="small" >}}
{{< vault-figure src="hero.jpg" title="Hero Section" variant="large" width="1920" height="1080" eager=true >}}
```

## Performance Comparison

| Metric | Without Dimensions | With Dimensions |
|--------|-------------------|-----------------|
| CLS Score | 0.25 - 0.5 | 0.0 |
| FCP | ~1.5s | ~1.2s |
| Visual Stability | Poor | Excellent |
| SEO Impact | Negative | Positive |

## Why This Matters in 2026

- **Core Web Vitals**: CLS is a ranking factor
- **Mobile Performance**: Critical for mobile users
- **Accessibility**: Stable layouts are easier for screen readers
- **Conversion**: Layout shifts increase bounce rates

## Quick Reference

```markdown
# vault-image - Just the image
{{< vault-image src="image.jpg" title="Caption" >}}

# vault-image - With dimensions
{{< vault-image src="image.jpg" title="Caption" width="800" height="600" >}}

# vault-figure - With caption
{{< vault-figure src="image.jpg" title="Caption" >}}

# Above-fold image (preload)
{{< vault-figure src="hero.jpg" title="Hero" width="1920" height="1080" eager=true >}}
```

## Technical Details

### vault-image
- Simple `<img>` tag with all optimizations
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
