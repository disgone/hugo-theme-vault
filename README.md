# Vault Hugo Theme

Vault is a responsive, minimal theme for [Hugo](https://gohugo.io/) designed for blogs and personal sites.

## Features

- Responsive design that works on all screen sizes
- Minimalist interface focused on your content
- Built-in support for tags and categories
- Syntax highlighting for code blocks
- Hidden posts option (using `hidden: true` in front matter)
- Automatic CSS processing with Hugo Pipes (SCSS, PostCSS, asset fingerprinting)
- No separate build step required

## Installation

### Git Submodule (Recommended for Production)

```bash
git submodule add https://github.com/Disgone/hugo-theme-vault.git themes/hugo-theme-vault
git submodule update --init --recursive
```

### Git Clone (Simplest)

```bash
mkdir themes
cd themes
git clone https://github.com/Disgone/hugo-theme-vault.git
```

### Hugo Module (Modern Approach)

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

## Quick Start

1. Create a new Hugo site:
   ```bash
   hugo new-site mysite
   cd mysite
   ```

2. Install the theme (choose one method above)

3. Configure your site:
   ```toml
   title = "My Vault Site"
   theme = "hugo-theme-vault"
   ```

4. Start the development server:
   ```bash
   hugo server
   ```

## Example Site

A complete example site is in `exampleSite/`. It shows all theme features and provides a starting point for your site.

To run the example site:
```bash
cd exampleSite
./setup.sh
hugo server
```

See [exampleSite/README.md](exampleSite/README.md) for detailed setup instructions.

## Customizing Vault

Add to `config.toml` under `[params]`:

```toml
[params]
  # Site description
  description = "A minimalist Hugo theme for blogs and personal sites"
  
  # Number of latest posts to show on homepage (default: 5)
  latestposts = 10
  
  # Social links (optional)
  [params.social]
    twitter = "username"
    github = "username"
    linkedin = "username"
    email = "your@email.com"
  
  # Analytics (optional)
  [params.analytics]
    google = "UA-XXXXX-Y"
    plausible = "yourdomain.com"
  
  # Custom CSS/JS (optional)
  [params.custom]
    css = ["custom.css"]
    js = ["custom.js"]
```

### Navigation Menu

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

Tags and categories are supported:

```toml
[taxonomies]
  tag = "tags"
  category = "categories"
```

## Content Structure

```
content/
├── _index.md              # Homepage
├── about.md               # About page
├── posts/                 # Blog posts
│   ├── getting-started.md
│   └── theme-development-workflow.md
```

### Creating New Posts

```bash
hugo new posts/my-new-post.md
```

Front matter example:
```yaml
---
title: "My First Post"
date: 2026-03-20
categories: ["Hugo"]
tags: ["theme", "minimal"]
hidden: false  # Set to true to hide from listings
---
```

## Building Assets

The theme uses Hugo Pipes for automatic CSS processing. No separate build step needed.

Install PostCSS dependencies for autoprefixing:
```bash
bun install
```

## License

Released under the MIT license. See [LICENSE](LICENSE.md).
