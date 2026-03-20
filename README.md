# Vault Hugo Theme

Vault is a responsive, minimal theme for [Hugo](https://gohugo.io/).

<!-- Example  -->


## Using Vault

Run the following commands in your Hugo site directory:

```
mkdir themes
cd themes
git clone https://github.com/Disgone/hugo-theme-vault.git
```

More details about installing and running themes can be found in the [Hugo documentation](https://gohugo.io/themes/installing-and-using-themes/)

### Quick Start

Create a new Hugo site and add Vault as your theme:

```bash
hugo new-site mysite
cd mysite
hugo config set theme hugo-theme-vault
```

That's it! Run `hugo server` to start development, or `hugo` to build your site.

### Example Site

Here's a minimal example site to try out the theme:

**config.toml**
```toml
title = "My Vault Site"
theme = "hugo-theme-vault"

[params]
  description = "A minimalist Hugo theme"
```

**Example Content (content/posts/my-first-post.md)**
```markdown
---
title: "My First Post"
date: 2026-03-20
---

Welcome to your new Vault-powered site! This theme uses Hugo Pipes for automatic CSS processing with SCSS, PostCSS, and asset fingerprinting.
```

The theme automatically handles:
- SCSS compilation to CSS
- PostCSS with autoprefixer for vendor prefixes
- Asset fingerprinting for cache busting and security
- No separate build step required

## Customizing Vault

## Why

The previous iteration of my site was running [Ghost](https://ghost.org/) on $5/mo [Digital Ocean droplet](https://m.do.co/c/dd662b01af42) which was honestly overkill.  I wanted something which was easy to maintain while also being as portable as possible. I decided that a static site generator would be a good choice for my needs.  This theme was created as a learning activity to both familiarize myself with how Hugo works and also give me a little refresher on front-end tooling like [Yarn](https://yarnpkg.com/en/), [LESS](http://lesscss.org/) and [Webpack](https://webpack.js.org/).

## License

This theme is released under the MIT license. Please read the [license](xxx/blob/master/LICENSE.md) for more information.
