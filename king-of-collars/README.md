# King of Collars (אלוף הקולרים) — Storefront

Headless Next.js (App Router, TS, Tailwind, `output:'export'`) storefront for
אלוף הקולרים, a Hebrew/RTL Israeli dog-supplies store. WordPress + WooCommerce
is the backend (catalog via Store API, orders via wc/v3) — this repo is
frontend-only.

## Stack
- Next.js static export (no Node server at runtime)
- WooCommerce Store API (cart) + wc/v3 (build-time product enrichment)
- Deploying to Vercel (migrating off Hostinger static hosting)

## Backend
- WP/WooCommerce: `https://mediumpurple-mongoose-433104.hostingersite.com`
- `.co.il` domain: not yet purchased

## Local dev
```
npm install
npm run dev
```

## Build
```
rm -rf out .next && npm run build
```

## Status (as of 2026-07-12, carried over from local project notes)
- Phase 1 (catalog, cart, blog) — done, live on Hostinger.
- Phase 2 checkout — built (UPS pickup rates, WhatsApp-coordinated payment
  placeholder pending a Hype merchant account), not yet deployed:
  - `wp-snippets/checkout-endpoints.php` (shipping-rate rules + pickup-points
    proxy) must be pasted manually into WPCode in wp-admin.
  - ship.co.il API token still missing (pickup points return mock data).
  - Hype payment redirect/webhook not built.
- Open: real prices for placeholder products, logo, `.co.il` domain.

## Secrets
`WC_CONSUMER_KEY`/`WC_CONSUMER_SECRET` (wc/v3 REST key, used for build-time
default-variation enrichment) live outside this repo and must be set as
Vercel project environment variables, not committed.
