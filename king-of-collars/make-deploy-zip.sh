#!/usr/bin/env bash
# Build the static export and drop a timestamped zip in ../deploy/.
# Usage: ./make-deploy-zip.sh   (run from the storefront/ dir)
set -euo pipefail
export PATH="$HOME/homebrew/bin:$PATH"

HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE"

DEPLOY_DIR="$HERE/../deploy"
mkdir -p "$DEPLOY_DIR"

STAMP="$(date +%Y%m%d-%H%M)"
ZIP="$DEPLOY_DIR/aluf-hakolarim-storefront-$STAMP.zip"

# WordPress/WooCommerce backend origin the browser calls for live cart actions.
# Baked into the static JS at build time. Override when a real domain is set up:
#   NEXT_PUBLIC_WP_ORIGIN=https://shop.example.co.il ./make-deploy-zip.sh
export NEXT_PUBLIC_WP_ORIGIN="${NEXT_PUBLIC_WP_ORIGIN:-https://mediumpurple-mongoose-433104.hostingersite.com}"
echo "→ cart API origin: $NEXT_PUBLIC_WP_ORIGIN"

# WC REST keys (WC_CONSUMER_KEY/SECRET) for build-time wc/v3 default_attributes
# enrichment. Without them the build still succeeds — variable-product cards
# just fall back to the first attribute term.
SECRETS="$HERE/../.secrets/woocommerce-api.env"
if [[ -f "$SECRETS" ]]; then
  set -a; . "$SECRETS"; set +a
  echo "→ WC REST keys sourced from $SECRETS"
else
  echo "⚠ $SECRETS not found — building without wc/v3 default-variation enrichment"
fi

echo "→ clean build (rm out .next so deleted content can't linger)"
rm -rf out .next
npm run build

echo "→ zipping out/ contents into $ZIP"
rm -f "$ZIP"
( cd out && zip -rq "$ZIP" . -x '.DS_Store' )

echo "✓ $ZIP"
ls -lh "$ZIP"
