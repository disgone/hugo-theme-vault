# PR #30 Review Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Address all 14 Copilot review comments on PR #30 to prepare the branch for merge.

**Architecture:** Targeted fixes across templates, config, and docs. No new features — just correcting bugs, invalid markup, and misleading documentation. Group related fixes into logical commits.

**Tech Stack:** Hugo templates (Go HTML), TOML config, SCSS, Markdown

---

## Task 1: Fix page title rendering in single.html

**Files:**
- Modify: `layouts/_default/single.html:5-14`

**Problem:** The `<header>` and `<h1>` title are wrapped inside `{{ with .Description }}`, so pages without a description render with no title at all.

**Step 1: Apply fix**

Replace the entire `{{ define "main" }}` block:

```html
{{ define "main" }}
<article class='page'>
    <header>
        <h1>{{ .Title }}</h1>
        {{ with .Description }}
        <h2 class='description'>{{ . }}</h2>
        {{ end }}
    </header>
    {{ .Content }}
</article>
{{ end }}
```

**Step 2: Verify with hugo server**

Run: `hugo server` from `exampleSite/`
Check: Navigate to a page without a description — title should render. Navigate to a page with a description — both title and description should render.

**Step 3: Commit**

```
fix(templates): render page title unconditionally in single layout
```

---

## Task 2: Fix Hugo module mount syntax in hugo.toml

**Files:**
- Modify: `hugo.toml`

**Problem:** Uses invalid array-of-objects TOML syntax (`module = [ { mounts = [...] } ]`). Hugo expects `[module]` with `[[module.mounts]]` table array syntax.

**Step 1: Apply fix**

Replace entire file contents:

```toml
[module]
[[module.mounts]]
source = "assets"
target = "assets"

[[module.mounts]]
source = "layouts"
target = "layouts"

[[module.mounts]]
source = "static"
target = "static"
```

**Step 2: Verify**

Run: `hugo server` from `exampleSite/`
Check: Site builds without module/mount warnings.

**Step 3: Commit**

```
fix(config): use correct TOML syntax for Hugo module mounts
```

---

## Task 3: Fix hardcoded copyright year in baseof.html

**Files:**
- Modify: `layouts/_default/baseof.html:22`

**Problem:** Copyright year is hardcoded to "2026". Should use `now.Year` as default.

**Step 1: Apply fix**

Change line 22 from:
```html
<p class='copyright'>&copy; {{ default "2026" .Site.Params.copyright_year }} {{ .Site.Title }}</p>
```
To:
```html
<p class='copyright'>&copy; {{ default now.Year .Site.Params.copyright_year }} {{ .Site.Title }}</p>
```

**Step 2: Verify**

Run: `hugo server` from `exampleSite/`
Check: Footer shows current year.

**Step 3: Commit**

```
fix(templates): use dynamic year for default copyright
```

---

## Task 4: Fix theme-selector.html — invalid HTML and accessibility

**Files:**
- Modify: `layouts/partials/theme-selector.html`
- Modify: `layouts/partials/menu.html`

**Problems:**
1. `<script>` is a sibling of `<li>` inside `<ul>` — invalid HTML.
2. `hidden` attribute on checkbox prevents keyboard/screen-reader access.

**Step 1: Fix theme-selector.html**

Remove the `hidden` attribute from the checkbox (keep `sr-only` class for visual hiding). Move the `<script>` inside the `<li>`:

```html
<li>
    <input type="checkbox" id="theme-toggle" class="sr-only">
    <label for="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
        <svg id="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <svg id="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
    </label>
    <script>
    (function() {
        var toggle = document.getElementById("theme-toggle");
        if (document.documentElement.classList.contains("dark")) {
            toggle.checked = true;
        }
        toggle.addEventListener("change", function() {
            if (this.checked) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }
        });
    })();
    </script>
</li>
```

Note: `<script>` inside `<li>` is valid HTML (flow content is permitted inside `<li>`). No changes needed to `menu.html`.

**Step 2: Verify**

Run: `hugo server` from `exampleSite/`
Check: Theme toggle still works. Validate HTML output — no `<script>` as direct child of `<ul>`. Tab to the toggle — it should be keyboard-focusable.

**Step 3: Commit**

```
fix(a11y): move script inside li, remove hidden from toggle
```

---

## Task 5: Fix noscript fallback in vault-image.html

**Files:**
- Modify: `layouts/partials/vault-image.html:154`

**Problem:** `<noscript>` fallback has `style="display:none"` which hides the image when JS is disabled — defeating the purpose of the fallback.

**Step 1: Apply fix**

Change line 154 from:
```html
<img src="{{ $img.RelPermalink }}" alt="{{ $fallbackContent }}" style="display:none">
```
To:
```html
<img src="{{ $img.RelPermalink }}" alt="{{ $fallbackContent }}">
```

**Step 2: Commit**

```
fix(a11y): remove display:none from noscript image fallback
```

---

## Task 6: Fix remote image width/height in vault-image.html

**Files:**
- Modify: `layouts/partials/vault-image.html:139-142`

**Problem:** When `resources.Get` returns nil (remote/external images), `$outWidth`/`$outHeight` are never set from the user-provided `$width`/`$height` params. The `<img>` tag omits dimensions even when the shortcode user supplies them.

**Step 1: Apply fix**

Replace lines 139-142:

```
{{- if and $img (not $outWidth) (not $outHeight) -}}
    {{- $outWidth = $img.Width -}}
    {{- $outHeight = $img.Height -}}
{{- end -}}
```

With:

```
{{- if and (not $outWidth) (not $outHeight) -}}
    {{- if $img -}}
        {{- $outWidth = $img.Width -}}
        {{- $outHeight = $img.Height -}}
    {{- else -}}
        {{- with $width }}{{ $outWidth = . }}{{ end -}}
        {{- with $height }}{{ $outHeight = . }}{{ end -}}
    {{- end -}}
{{- end -}}
```

This ensures that when `$img` is nil (remote image), the user-supplied `width`/`height` params are used.

**Step 2: Commit**

```
fix(shortcodes): apply user-provided dimensions for remote images
```

---

## Task 7: Fix font preload URLs in head/includes.html

**Files:**
- Modify: `layouts/partials/head/includes.html:5-6`

**Problem:** Font preload URLs use string concatenation with `.Site.BaseURL` which breaks if `baseURL` lacks a trailing slash. Use `absURL` instead.

**Step 1: Apply fix**

Change lines 5-6 from:
```html
<link rel="preload" href="{{ .Site.BaseURL }}fonts/Geist-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{{ .Site.BaseURL }}fonts/GeistMono-Variable.woff2" as="font" type="font/woff2" crossorigin>
```
To:
```html
<link rel="preload" href="{{ "fonts/Geist-Variable.woff2" | absURL }}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{{ "fonts/GeistMono-Variable.woff2" | absURL }}" as="font" type="font/woff2" crossorigin>
```

**Step 2: Commit**

```
fix(templates): use absURL for font preload paths
```

---

## Task 8: Remove unused params.theme config and docs

**Files:**
- Modify: `exampleSite/config.toml:10-12` — remove `[params.theme]` block
- Modify: `exampleSite/content/posts/vault-configuration-guide.md` — remove/rewrite `params.colorScheme` and scheme-cycling claims

**Problem:** `[params.theme]` config and `params.colorScheme` docs describe features that don't exist. The toggle is light/dark only, not multi-scheme. Remove the non-functional config and correct the docs.

**Step 1: Remove [params.theme] from exampleSite/config.toml**

Delete lines 10-12:
```toml
[params.theme]
  default = "light"
  available = ["light", "dark"]
```

**Step 2: Rewrite vault-configuration-guide.md**

Remove the `params.colorScheme` parameter entry (around lines 51-52):

```markdown
params.colorScheme
: The default color scheme. See [Color Schemes](#color-schemes) below for accepted values.
```

Replace the "Color Schemes" section (lines 54-71) with an accurate description:

```markdown
## Color Schemes

Vault includes a light and dark palette. The theme respects the visitor's system preference (`prefers-color-scheme`) by default and provides a toggle to switch manually. The choice is persisted in `localStorage`.

| Scheme | Background | Text | Primary | Secondary |
|--------|-----------|------|---------|-----------|
| `vault-light` | `#eaeaea` | `#252a34` | `#ff2e63` | `#08d9d6` |
| `vault-dark` | `#181825` | `#cdd6f4` | `#ff2e63` | `#08d9d6` |

Additional palettes (`nord`, `catppuccin-mocha`, `catppuccin-frappe`) are defined in SCSS but not yet exposed through the toggle. See `assets/scss/_themes.scss` to customize or add schemes.
```

**Step 3: Commit**

```
fix(docs): remove undocumented params.theme config, correct scheme docs
```

---

## Task 9: Fix exampleSite README — remove misleading bun install instruction

**Files:**
- Modify: `exampleSite/README.md:146-150`

**Problem:** Troubleshooting section says to run `bun install` but `package.json` has empty devDependencies and no build scripts. Hugo Pipes handles CSS processing natively.

**Step 1: Apply fix**

Replace the "Styles Not Loading" section (lines 146-150):

```markdown
### Styles Not Loading

If styles don't load:

- Run `bun install` in the theme root to install dependencies
- Check that static assets are generated correctly
- Clear your browser cache
```

With:

```markdown
### Styles Not Loading

If styles don't load:

- Ensure Hugo 0.110+ is installed (Hugo Pipes handles SCSS natively)
- Check that the theme is properly linked or installed
- Clear your browser cache
```

**Step 2: Commit**

```
fix(docs): replace incorrect bun install troubleshooting advice
```

---

## Task 10: Remove hugo_stats.json from git tracking

**Files:**
- Remove from tracking: `exampleSite/hugo_stats.json`

**Problem:** Generated file is committed but also gitignored. Causes noisy diffs.

**Step 1: Remove from tracking**

```bash
git rm --cached exampleSite/hugo_stats.json
```

**Step 2: Commit**

```
chore: remove tracked hugo_stats.json (already gitignored)
```

---

## Task 11: Verify and push

**Step 1: Run hugo server to verify all changes**

```bash
cd exampleSite && hugo server
```

Check:
- Site builds without errors/warnings
- Pages render titles correctly (with and without descriptions)
- Theme toggle works and is keyboard-accessible
- Footer shows current year
- Font preloads work
- Images render with correct dimensions

**Step 2: Push to remote**

```bash
git push
```

---

## Commit Summary

| # | Message | Files |
|---|---------|-------|
| 1 | `fix(templates): render page title unconditionally in single layout` | `single.html` |
| 2 | `fix(config): use correct TOML syntax for Hugo module mounts` | `hugo.toml` |
| 3 | `fix(templates): use dynamic year for default copyright` | `baseof.html` |
| 4 | `fix(a11y): move script inside li, remove hidden from toggle` | `theme-selector.html` |
| 5 | `fix(a11y): remove display:none from noscript image fallback` | `vault-image.html` |
| 6 | `fix(shortcodes): apply user-provided dimensions for remote images` | `vault-image.html` |
| 7 | `fix(templates): use absURL for font preload paths` | `head/includes.html` |
| 8 | `fix(docs): remove undocumented params.theme config, correct scheme docs` | `config.toml`, `vault-configuration-guide.md` |
| 9 | `fix(docs): replace incorrect bun install troubleshooting advice` | `exampleSite/README.md` |
| 10 | `chore: remove tracked hugo_stats.json (already gitignored)` | `hugo_stats.json` |

Note: Tasks 5 and 6 both touch `vault-image.html` — they can be combined into a single commit if preferred.
