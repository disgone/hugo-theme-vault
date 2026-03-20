---
author: "Demo Author"
date: 2026-03-05
title: "Hidden Post Example"
description: "This post demonstrates the hidden parameter feature."
categories: ["Features"]
tags: ["hidden", "demo"]
type: post
hidden: true
---

This post is hidden from the homepage and post listings because it has the `hidden: true` parameter set in its frontmatter.

## Hidden Posts

When you set `hidden: true` in a post's frontmatter, the post will not appear in:

- The homepage "Latest Posts" section
- Post listings
- Pagination

However, the post is still accessible directly via its URL if someone knows the link.

## Use Cases

Hidden posts are useful for:

- Draft posts you want to share with others before publishing
- Posts for specific audiences with direct links
- Posts that shouldn't appear in public listings
- Testing and development purposes

You can still visit this post directly if you navigate to its URL.
