# Vault Theme - Example Site

This example site demonstrates the Vault Hugo theme in action. You can use it as a reference or as a starting point for your own site.

## Quick Start (Self-Contained Mode)

The simplest way to test the theme is to run it directly from the theme repository:

```bash
# From the theme root directory
cd exampleSite
./setup.sh
hugo server
```

The setup script creates a symlink to the theme directory so Hugo can find the theme files. The site will be available at http://localhost:1313

## Installation Methods

### Method 1: Self-Contained (Recommended for Theme Development)

Use this method when developing the theme or testing locally:

1. Clone the theme repository
2. Navigate to the exampleSite directory
3. Run the setup script: `./setup.sh`
4. Run Hugo: `hugo server`

The setup script creates a symlink from `exampleSite/themes/hugo-theme-vault` to the parent theme directory, allowing Hugo to find the theme files. This is the recommended approach for local theme development.

**Note**: The setup script must be run from the exampleSite directory.

### Method 2: Git Submodule

Use this method for production sites or when you want to use the theme as a dependency:

```bash
# In your Hugo site directory
git submodule add https://github.com/Disgone/hugo-theme-vault.git themes/hugo-theme-vault
git submodule update --init --recursive

# Your config.toml should have:
# theme = "hugo-theme-vault"
```

See `config/submodule.toml` for more details.

### Method 3: Hugo Module (Modern Approach)

Use Hugo's native module system for the most flexible setup:

```bash
# Initialize your site as a Hugo module
hugo mod init github.com/yourusername/your-site

# Add the theme dependency
hugo mod get github.com/Disgone/hugo-theme-vault
```

Then add the module configuration to your config.toml (see `config/hugo-module.toml`).

## Configuration

The `config.toml` file contains all configuration options:

- **Required settings**: title, theme, baseURL, languageCode
- **Params**: description, latestposts count, social links, analytics
- **Taxonomies**: tags and categories
- **Permalinks**: URL structure for posts
- **Menu**: Navigation menu items

### Customization

Uncomment and modify the advanced parameters in config.toml to customize:

- Social media links
- Analytics (Google, Plausible)
- Custom CSS/JS files
- Permalink structure

## Content Structure

```
content/
├── _index.md              # Homepage
├── posts/                 # Blog posts
│   ├── getting-started.md
│   ├── markdown-examples.md
│   ├── theme-development-workflow.md
│   └── hidden-post-example.md
├── about.md               # About page
├── contact.md             # Contact page
└── archives.md            # Archives page
```

### Creating New Content

Use Hugo's content creation commands:

```bash
# Create a new post using the blog archetype
hugo new posts/my-new-post.md

# Create a new page
hugo new about.md
```

The `blog.md` archetype includes common fields: author, date, title, description, categories, tags, and type.

## Theme Features

- **Responsive Design**: Works on all screen sizes
- **Minimalist Interface**: Focus on your content
- **Taxonomies**: Built-in support for tags and categories
- **Syntax Highlighting**: Code blocks with syntax highlighting
- **Hidden Posts**: Option to hide posts from listings using `hidden: true`
- **Fast Performance**: Hugo Pipes for optimized CSS/JS
- **Clean Code**: Well-documented and easy to customize

## Development

Hugo Pipes automatically processes SCSS files. No separate build step needed.

### Running Example Site

```bash
# From exampleSite directory
cd exampleSite
hugo server -D
```

The `-D` flag includes draft content.

## Common Issues

### Theme Not Found

If you get a "theme not found" error:

- Make sure you're running Hugo from the exampleSite directory
- Check that the theme setting in config.toml is correct
- For submodule mode, ensure submodules are initialized

### Styles Not Loading

If styles don't load:

- Run `bun install` in the theme root to install dependencies
- Check that static assets are generated correctly
- Clear your browser cache

## Support

For issues, questions, or contributions:

- GitHub: https://github.com/Disgone/hugo-theme-vault
- Issues: https://github.com/Disgone/hugo-theme-vault/issues

## License

This example site follows the same MIT license as the Vault theme.
