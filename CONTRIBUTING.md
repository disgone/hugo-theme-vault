# Contributing

## Prerequisites

- [Hugo](https://gohugo.io/) 0.110+
- Git

## Development Setup

```bash
git clone https://github.com/Disgone/hugo-theme-vault.git
cd hugo-theme-vault/exampleSite
./setup.sh
hugo server
```

Visit http://localhost:1313 to preview changes.

## Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to power automated releases. Every commit must follow this format:

```
type(scope): subject
```

### Types

| Type | Purpose | Changelog |
|------|---------|-----------|
| `feat` | New feature | Added |
| `fix` | Bug fix | Fixed |
| `perf` | Performance improvement | Performance |
| `docs` | Documentation | Hidden |
| `style` | Formatting | Hidden |
| `refactor` | Internal restructuring | Hidden |
| `test` | Tests | Hidden |
| `build` | Build/dependencies | Hidden |
| `ci` | CI/CD | Hidden |
| `chore` | Maintenance | Hidden |

### Rules

- Imperative mood: "add" not "added"
- Lowercase, no period
- Under 50 characters
- Scope is optional but encouraged

### Examples

```
feat(theme): add dark mode toggle
fix(images): resolve lazy loading on Safari
docs: update shortcode parameters
refactor(scss): consolidate theme partials
```

## Version Bumps

Commits drive version bumps automatically via [release-please](https://github.com/googleapis/release-please):

| Commit | Bump |
|--------|------|
| `feat(scope)!:` or `BREAKING CHANGE:` in body | Major |
| `feat(scope):` | Minor |
| `fix(scope):` / `perf(scope):` | Patch |

Only `feat`, `fix`, and `perf` commits appear in the changelog. All other types are hidden.

## Breaking Changes

Append `!` after the type/scope and include `BREAKING CHANGE:` in the commit body with migration details:

```
feat(build)!: replace webpack with hugo pipes

BREAKING CHANGE: Remove npm build scripts. Use `hugo` directly.
```

## Pull Requests

1. Fork the repository and create a branch
2. Make your changes with conventional commits
3. Test locally with `hugo server` in the example site
4. Open a PR against `main`

When your PR is merged, release-please automatically opens (or updates) a Release PR that bumps the version and updates the changelog. The maintainer merges the Release PR when ready to publish.

## Code Style

- 4 space indentation, LF line endings, UTF-8 (see `.editorconfig`)
- SCSS: alphabetical properties, max 3 levels nesting, hyphenated class names
- HTML: semantic elements, ARIA attributes, `loading="lazy"` for images
- Hugo templates: use `{{- -}}` for whitespace control

See [AGENTS.md](AGENTS.md) for detailed code style guidelines and project structure.