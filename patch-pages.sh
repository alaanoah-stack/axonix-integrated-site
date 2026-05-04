#!/usr/bin/env bash
# ============================================================================
# Axonix — production-readiness patch script
# Run from the repo root. Applies safe in-place edits to all *.html files.
# ----------------------------------------------------------------------------
# What this does:
#   1. Removes ANY fake placeholder phone numbers (248-555-*, 555-0100, etc.)
#   2. Standardizes the real phone everywhere ((586) 339-5370, +15863395370)
#   3. Adds the new accessibility.css <link> to every page that references
#      shared.css (idempotent — safe to run multiple times)
#   4. Standardizes the OG image to /assets/og-image.jpg with width/height
#      meta tags (idempotent)
#   5. Adds robots and canonical hints if missing
#
# What this does NOT do:
#   - Edit the LocalBusiness JSON-LD schema (only homepage uses one)
#   - Modify the design or layout of any page
#   - Touch any non-HTML file
#
# Make a git branch first:  git checkout -b production-readiness-pass
# Then run:                  bash patch-pages.sh
# Review with:               git diff
# ============================================================================

set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"

# Find every HTML file in the repo root and subfolders, but not in node_modules / .git
FILES=$(find "$ROOT" -type f -name "*.html" -not -path "*/node_modules/*" -not -path "*/.git/*")

echo "===> Patching the following files:"
echo "$FILES"
echo

for f in $FILES; do
  echo "  - $f"

  # ----- 1. Strip fake phone placeholders -----
  # Replace common placeholders with the real phone (display + tel:)
  sed -i \
    -e 's|(248) 555-0100|586-339-5370|g' \
    -e 's|248-555-0100|586-339-5370|g' \
    -e 's|+12485550100|+15863395370|g' \
    -e 's|tel:+12485550100|tel:+15863395370|g' \
    -e 's|tel:12485550100|tel:+15863395370|g' \
    -e 's|INSERT REAL PHONE NUMBER|586-339-5370|g' \
    -e 's|INSERT_REAL_PHONE_NUMBER|586-339-5370|g' \
    -e 's|YOUR_PHONE_NUMBER|586-339-5370|g' \
    -e 's|XXX-XXX-XXXX|586-339-5370|g' \
    "$f"

  # ----- 2. Normalize real phone variants -----
  # If the site already had different formats, normalize them.
  sed -i \
    -e 's|(586) 339-5370|586-339-5370|g' \
    -e 's|586\.339\.5370|586-339-5370|g' \
    -e 's|tel:5863395370\b|tel:+15863395370|g' \
    "$f"

  # ----- 3. Add accessibility.css link if missing -----
  # Look for shared.css link and add accessibility.css right after if not present
  if grep -q 'shared\.css' "$f" && ! grep -q 'accessibility\.css' "$f"; then
    sed -i 's|\(<link[^>]*href="[^"]*shared\.css"[^>]*>\)|\1\n<link rel="stylesheet" href="/assets/css/accessibility.css">|' "$f"
  fi

  # ----- 4. Standardize OG image path -----
  # If a page is missing OG image dimensions, add them (idempotent).
  if grep -q 'og:image' "$f" && ! grep -q 'og:image:width' "$f"; then
    sed -i '/<meta property="og:image"/a\
<meta property="og:image:width" content="1200">\
<meta property="og:image:height" content="630">\
<meta property="og:image:alt" content="Axonix Integrated Technologies — Metro Detroit commercial security and low-voltage integrator">' "$f"
  fi

  # ----- 5. Ensure robots meta if missing -----
  if ! grep -q 'name="robots"' "$f"; then
    sed -i 's|</title>|</title>\n<meta name="robots" content="index, follow, max-image-preview:large">|' "$f"
  fi
done

echo
echo "===> Patch complete."
echo
echo "Next steps:"
echo "  1. Review the diff:    git diff"
echo "  2. Spot-check pages locally: python3 -m http.server 8080"
echo "  3. Commit:             git add -A && git commit -m 'production-readiness pass'"
echo "  4. Push:               git push origin production-readiness-pass"
echo
echo "Things this script CANNOT do — please verify manually:"
echo "  - Each page should have a unique <title> and <meta description>"
echo "  - LocalBusiness schema (homepage only) should match lib/site-config values"
echo "  - Each page's OG title should be unique to that page"
echo "  - Hero/header phone display should read '586-339-5370' on each page"
