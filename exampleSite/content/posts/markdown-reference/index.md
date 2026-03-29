---
author: "Demo Author"
date: 2026-03-15
title: "Markdown Reference"
description: "A tour of standard Markdown formatting as rendered by the Vault theme."
categories: ["Content"]
tags: ["markdown", "formatting", "reference"]
type: post
---

This page exercises the Markdown elements most commonly used in blog posts and documentation. Use it to verify that the theme renders everything correctly after changes to the stylesheet.

## Headings

Headings establish document hierarchy. Hugo generates anchor links for each one automatically.

## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

---

## Paragraph Text

Vault uses a serif body typeface to keep long-form reading comfortable. Line length is capped at a readable measure and spacing between paragraphs is generous enough to separate thoughts without creating too much visual distance.

A second paragraph with *italic emphasis*, **strong emphasis**, and ***bold italic*** combined. You can also mark ~~deleted text~~ with strikethrough when tracking corrections or showing before/after comparisons.

---

## Blockquotes

A simple pull quote:

> The best writing is rewriting. Every sentence is a first draft until it proves otherwise.

A blockquote with attribution:

> Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.
>
> — Antoine de Saint-Exupéry

---

## Lists

### Unordered

- Markdown source files live in `content/`
- Layouts and partials live in `layouts/`
- Styles are written in SCSS under `assets/scss/`
  - Variables and mixins are in their own partials
  - The main entry point is `main.scss`
- Static files (fonts, favicon) live in `static/`

### Ordered

1. Install Hugo (extended version required)
2. Clone the theme into `themes/hugo-theme-vault`
3. Copy `exampleSite/config.toml` to your site root
4. Run `hugo server` to preview locally
5. Run `hugo` to build for production

### Definition List

Markdown
: A lightweight markup language that converts plain text to HTML. Hugo processes `.md` files using Goldmark.

Front matter
: YAML, TOML, or JSON metadata at the top of a content file, delimited by `---` or `+++`. Defines title, date, tags, and other page-level data.

Shortcode
: A Hugo template fragment invoked directly from Markdown content. Vault ships `vault-image` and `vault-figure` for optimized image output.

---

## Images

Vault upgrades standard Markdown image syntax with the same responsive pipeline used by the shortcodes. Because this page is a leaf bundle, the images that live beside this file are treated as page resources and gain responsive `srcset`, WebP fallbacks, and intrinsic dimensions automatically.

```markdown
![Sunrise light washing across a misty evergreen forest](forest-sunrise.jpg "Golden hour in the Cascades — photo by Anders Jildén on Unsplash")
```

![Sunrise light washing across a misty evergreen forest](forest-sunrise.jpg "Golden hour in the Cascades — photo by Anders Jildén on Unsplash")

Attributes belong on the next line so Goldmark associates them with the standalone image block. This example floats inside the text column via the `inset` helpers while rendering a caption via the `figure` wrapper:

````markdown
![Mist lifting off a glassy alpine lake at daybreak](forest-lake.jpg "Mirror Lake at dawn — photo by Joshua Earle on Unsplash")
{ 
  figure="true"
  caption="Inset example rendered via Markdown attributes"
  figureclass="inset"
  loading="eager"
}
````

![Mist lifting off a glassy alpine lake at daybreak](forest-lake.jpg "Mirror Lake at dawn — photo by Joshua Earle on Unsplash")
{ 
  figure="true"
  caption="Inset example rendered via Markdown attributes"
  figureclass="inset"
  loading="eager"
}

---

## Code

Inline code references like `hugo server`, `params.colorScheme`, and `assets/scss/main.scss` render in a monospace typeface with subtle background treatment.

### Block — Shell

```bash
# Build the site and serve locally with live reload
hugo server --disableFastRender

# Build for production
hugo --minify
```

### Block — TOML

```toml
baseURL = "https://example.com/"
title   = "My Site"
theme   = ["hugo-theme-vault"]

[params]
  description  = "A minimal Hugo theme for blogs and personal sites"
  author       = "Your Name"
  colorScheme  = "vault-dark"
```

### Block — HTML

```html
<link
  rel="stylesheet"
  href="{{ $css.RelPermalink }}"
  integrity="{{ $css.Data.Integrity }}"
  crossorigin="anonymous">
```

---

## Tables

A comparison of the bundled color schemes:

| Scheme | Mode | Primary Accent | Secondary Accent |
|--------|------|---------------|-----------------|
| `vault-light` | Light | Pink `#ff2e63` | Cyan `#08d9d6` |
| `vault-dark` | Dark | Pink `#ff2e63` | Cyan `#08d9d6` |
| `nord` | Dark | Ice blue `#88c0d0` | Steel `#81a1c1` |
| `catppuccin-mocha` | Dark | Pink `#f5c2e7` | Blue `#89b4fa` |
| `catppuccin-frappe` | Dark | Rose `#f2a5c5` | Lavender `#b8baee` |

---

## Links

Visit the [Hugo documentation](https://gohugo.io/documentation/) for the full template and configuration reference. For theme-specific topics, browse the other posts in this example site — [Configuration](/posts/vault-configuration-guide/), [Shortcodes](/posts/shortcodes/), and [Working with Images](/posts/images/).

---

## Horizontal Rule

A thematic break is produced by three or more hyphens on their own line. The rule above this section is one example; here is another:

---

End of the Markdown reference.
