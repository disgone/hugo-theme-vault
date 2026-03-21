---
title: "Image Accessibility & Progressive Enhancement"
date: 2026-03-20
description: "Making images accessible for screen readers and progressively enhanced"
---

# Image Accessibility & Progressive Enhancement in 2026

## The Problem: Missing Accessibility Features

### Issue 1: title vs alt Confusion

Current implementation uses `title` for both caption and alt text - this is **incorrect**:

```markdown
{{< vault-figure src="photo.jpg" title="My beautiful sunset" >}}
```

**Generates:**
```html
<img alt="My beautiful sunset" ...>
<figcaption><p>My beautiful sunset</p></figcaption>
```

**Problem:**
- Screen readers announce alt text to visually impaired users
- Caption is for sighted users to understand the image context
- Using the same text for both means screen readers get the caption, which may not be a description
- Sighted users see a caption that's not optimized for accessibility

### Issue 2: No Fallback Content

When images fail to load (network error, 404, etc.), nothing is shown:

```html
<img src="missing.jpg" alt="My sunset">
<!-- User sees broken image icon, no fallback -->
```

### Issue 3: Missing Long Descriptions

Complex images need more than short alt text. Some images require detailed descriptions for:

- Charts/graphs
- Maps
- Complex diagrams
- Screenshots

---

## The Solution: Separated title and alt

### vault-image

```markdown
{{< vault-image src="sunset.jpg" title="Beautiful sunset" alt="Golden sunset over the ocean at dusk" >}}
```

**Benefits:**
- Screen readers get proper accessibility descriptions
- Captions are separate from accessibility text
- Better user experience for all users

### vault-figure

```markdown
{{< vault-figure src="chart.jpg" title="Sales by Quarter" alt="Bar chart showing sales: Q1: 50%, Q2: 75%, Q3: 100%, Q4: 125%" >}}
```

**Benefits:**
- Separate caption and alt text
- Semantic figure semantics preserved
- Better for complex data visualization

---

## Progressive Enhancement

### What Progressive Enhancement Means

**Layer 1 (Baseline):**
```html
<img src="image.jpg" alt="Description">
```
- Works in all browsers without JavaScript
- Basic functionality for all users

**Layer 2 (Enhanced):**
```html
<img 
    src="image.jpg" 
    alt="Description" 
    width="800" 
    height="600" 
    loading="lazy">
```
- CLS prevention with dimensions
- Lazy loading for performance

**Layer 3 (Fully Enhanced):**
```html
<figure>
    <img 
        src="image.jpg.webp" 
        alt="Detailed accessibility description" 
        width="800" 
        height="600" 
        loading="eager">
    <figcaption><p>Caption for sighted users</p></figcaption>
</figure>
```
- WebP format for performance
- Lazy/eager loading control
- Semantic figure wrapper

---

## Missing Features

### 1. Fallback Content

When images fail to load, show fallback:

```html
<img 
    src="image.jpg" 
    alt="Description"
    onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
<figure style="display:none">
    <p>Unable to load image</p>
</figure>
```

### 2. Long Descriptions

For complex images, use `longdesc`:

```html
<img 
    src="chart.jpg" 
    alt="Bar chart showing sales"
    longdesc="chart-details.html#chart-1">
```

Or use ARIA:

```html
<img 
    src="chart.jpg" 
    alt="Bar chart showing sales"
    aria-describedby="chart-description">
<p id="chart-description">...</p>
```

---

## Testing Accessibility

### Automated Testing

```bash
# Lighthouse accessibility audit
npx lighthouse https://your-site.com --only-categories=accessibility
```

### Manual Testing

1. **Screen reader test** (VoiceOver/NVDA):
   - Navigate to image
   - Listen to alt text announcement
   - Verify it's descriptive, not just a caption

2. **Keyboard navigation**:
   - Tab to image
   - Press Enter
   - Verify accessible name and description

3. **Resize browser**:
   - Test with 400% zoom
   - Verify no layout shifts (CLS)

4. **Network offline**:
   - Disable network
   - Verify images still have alt text
   - Check for fallback content

---

## Best Practices

### For Simple Images

```markdown
{{< vault-image src="photo.jpg" alt="Golden retriever playing fetch" >}}
```

### For Images with Captions

```markdown
{{< vault-figure src="photo.jpg" alt="Golden retriever" title="My golden retriever" >}}
```

### For Complex Images (Charts, Maps)

```markdown
{{< vault-figure 
    src="chart.jpg" 
    alt="Bar chart showing revenue growth" 
    title="Annual Revenue by Year" 
    longdesc="chart-details.html" 
>}}
```

### For Above-Fold Images

```markdown
{{< vault-image 
    src="hero.jpg" 
    alt="Team of developers working" 
    width="1920" 
    height="1080" 
    eager=true 
>}}
```

---

## Checklist

Before publishing images:

- [ ] **Alt text exists** - Describes what the image shows
- [ ] **Alt text is not a caption** - Serves accessibility, not just decoration
- [ ] **Dimensions are specified** - Prevents CLS
- [ ] **Lazy loading is used** - For below-fold images
- [ ] **Eager loading for above-fold** - Critical images load immediately
- [ ] **WebP format** - 30% smaller files
- [ ] **Fallback content** - When image fails to load
- [ ] **Semantic HTML** - Use `<figure>` when appropriate

---

## Summary

The current implementation meets basic accessibility requirements but misses key features:

**✅ Meets:**
- Alt attribute
- Width/height for CLS prevention
- Semantic HTML (vault-figure)
- Progressive enhancement
- No JavaScript required

**❌ Needs Improvement:**
- Separate title (caption) and alt (accessibility)
- Fallback content for failed loads
- Long description support
- ARIA attributes for complex images

---

*Learn more: [web.dev/accessibility](https://web.dev/accessibility/)*
