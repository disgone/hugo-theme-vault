#!/bin/bash
# Setup script for exampleSite
# Creates a symlink to the theme directory for local development

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
THEME_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$SCRIPT_DIR"
mkdir -p themes
ln -sf "$THEME_ROOT" themes/hugo-theme-vault

echo "✓ Created symlink: themes/hugo-theme-vault -> $THEME_ROOT"
echo "✓ Ready to run: cd exampleSite && hugo server"
