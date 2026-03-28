# Vault Hugo Theme

A responsive, minimal Hugo theme for blogs and personal sites.

## Quick Start

1. Create a new Hugo site:
   ```bash
   hugo new-site mysite
   cd mysite
   ```

2. Add the theme:
   ```bash
   git submodule add https://github.com/Disgone/hugo-theme-vault.git themes/hugo-theme-vault
   ```

3. Configure your site:
   ```toml
   title = "My Vault Site"
   theme = "hugo-theme-vault"
   ```

4. Start the development server:
   ```bash
   hugo server
   ```

Visit http://localhost:1313 to see your site.

### Try the Example Site

Explore the theme features quickly with the example site:

```bash
cd exampleSite
./setup.sh
hugo server
```

Visit http://localhost:1313 to see all features in action.

## Installation

### Git Submodule

```bash
git submodule add https://github.com/Disgone/hugo-theme-vault.git themes/hugo-theme-vault
```

### Git Clone

```bash
mkdir themes
cd themes
git clone https://github.com/Disgone/hugo-theme-vault.git
```

### Hugo Module

```bash
hugo mod init github.com/yourusername/your-site
hugo mod get github.com/Disgone/hugo-theme-vault
```

Add to your `config.toml`:
```toml
[module]
  [[module.imports]]
    path = "github.com/Disgone/hugo-theme-vault"
```

## Configuration

### Site Parameters

Add to `config.toml` under `[params]`:

```toml
[params]
  description = "A minimalist Hugo theme for blogs and personal sites"
  latestposts = 10  # Number of posts on homepage (default: 5)

  [params.social]
    twitter = "username"
    github = "username"
    linkedin = "username"
    email = "your@email.com"

  [params.analytics]
    google = "UA-XXXXX-Y"
    plausible = "yourdomain.com"

  [params.custom]
    css = ["custom.css"]
    js = ["custom.js"]
```

### Navigation

Configure your main navigation in `config.toml`:

```toml
[[menu.main]]
  name = "Home"
  url = "/"
  weight = 1

[[menu.main]]
  name = "About"
  url = "/about/"
  weight = 2
```

### Taxonomies

Add tags and categories:

```toml
[taxonomies]
  tag = "tags"
  category = "categories"
```

## Content

### Content Structure

```
content/
├── _index.md              # Homepage
├── about.md               # About page
└── posts/                 # Blog posts
    ├── getting-started.md
    └── theme-development-workflow.md
```

### Create New Posts

```bash
hugo new posts/my-new-post.md
```

Front matter:
```yaml
---
title: "My First Post"
date: 2026-03-20
categories: ["Hugo"]
tags: ["theme", "minimal"]
hidden: false  # Hide from listings when true
---
```

## Features

- Responsive design for all screen sizes
- Minimalist interface focused on your content
- Tags and categories
- Syntax highlighting for code blocks
- Hide posts with `hidden: true` in front matter
- Automatic CSS processing with Hugo Pipes
- No separate build step required

## Shortcodes

### Image Component

```markdown
{{< vault-image src="photo.jpg" alt="My Photo" >}}
```

Features:
- Lazy loading by default
- Local images get responsive `srcset` and `sizes`
- Local images serve WebP first with the original format as fallback
- Local images keep intrinsic `width` and `height` in the fallback markup for layout stability
- Remote images render as a single responsive `<img>` and do not get generated `srcset`

Parameters:
- `src` (required): Image path or URL
- `alt` (required): Accessibility description
- `title` (optional): Caption text for `vault-figure`
- `width`, `height` (optional): Dimensions in pixels
- `sizes` (optional): Override the default responsive slot size for local images
- `eager` (optional): Use `loading="eager"`
- `class` (optional): CSS class(es) on the rendered element
- `longdesc` (optional): URL to long description
- `describedby` (optional): ARIA attribute

### Image with Caption

```markdown
{{< vault-figure src="photo.jpg" alt="My Photo" title="My Photo Caption" >}}
```

Same parameters as `vault-image`, plus:
- `figureClass` (optional): CSS class(es) on the `<figure>` element, e.g. `inset` or `inset-left`

## Build Assets

The theme uses Hugo Pipes for automatic CSS processing. No separate build step needed.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

MIT License. See [LICENSE](LICENSE.md).
