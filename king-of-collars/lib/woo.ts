import type { WooProduct, WooCategory, WpPost, WooPrices, WooDefaultAttribute } from "./types";

// Direct WP base (used at build time / server-side fetches).
export const WP_BASE = "https://mediumpurple-mongoose-433104.hostingersite.com";
export const STORE_API = `${WP_BASE}/wp-json/wc/store/v1`;
export const WP_API = `${WP_BASE}/wp-json/wp/v2`;

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Fetch failed ${res.status}: ${url}`);
  return res.json() as Promise<T>;
}

// ---- Catalog (build-time) ----
export async function listProducts(params: Record<string, string | number> = {}) {
  const q = new URLSearchParams({ per_page: "100", ...stringifyParams(params) });
  const products = await getJSON<WooProduct[]>(`${STORE_API}/products?${q}`);
  return withDefaultVariations(products);
}

export async function getProductBySlug(slug: string) {
  const products = await getJSON<WooProduct[]>(
    `${STORE_API}/products?slug=${encodeURIComponent(slug)}`
  );
  return (await withDefaultVariations(products))[0];
}

// The public Store API does NOT expose a variable product's chosen default variation
// (WC `default_attributes`). We need it so listing cards can one-tap "add default".
// At BUILD time we fetch it from the authenticated wc/v3 endpoint (REST key in env)
// and stamp it onto each variable product as `default_attributes`. If the key is
// absent or no default is set, cards fall back to the first term.
const WC_KEY = process.env.WC_CONSUMER_KEY || "";
const WC_SECRET = process.env.WC_CONSUMER_SECRET || "";

async function withDefaultVariations(products: WooProduct[]): Promise<WooProduct[]> {
  const variables = products.filter((p) => p.type === "variable");
  if (!variables.length || !WC_KEY || !WC_SECRET) return products;

  const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString("base64");
  await Promise.all(
    variables.map(async (p) => {
      try {
        const res = await fetch(
          `${WP_BASE}/wp-json/wc/v3/products/${p.id}?_fields=default_attributes`,
          { headers: { Authorization: `Basic ${auth}`, Accept: "application/json" } }
        );
        if (res.ok) {
          const data = (await res.json()) as { default_attributes?: WooDefaultAttribute[] };
          p.default_attributes = data.default_attributes ?? [];
        }
      } catch {
        /* leave undefined → card falls back to first term */
      }
    })
  );
  return products;
}

export function listCategories() {
  return getJSON<WooCategory[]>(`${STORE_API}/products/categories?per_page=100`);
}

// ---- Blog (build-time) ----
export function listPosts(perPage = 50) {
  return getJSON<WpPost[]>(`${WP_API}/posts?per_page=${perPage}&_embed=wp:featuredmedia`);
}
export function getPostBySlug(slug: string) {
  return getJSON<WpPost[]>(
    `${WP_API}/posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia`
  ).then((r) => r[0]);
}

function stringifyParams(p: Record<string, string | number>) {
  const out: Record<string, string> = {};
  for (const k in p) out[k] = String(p[k]);
  return out;
}

// ---- Price formatting (ILS, minor_unit usually 0 → "{n} ₪") ----
export function formatPrice(amount: string | number, prices?: Partial<WooPrices>): string {
  const minor = prices?.currency_minor_unit ?? 0;
  const n = Number(amount) / Math.pow(10, minor);
  const suffix = prices?.currency_suffix ?? " ₪";
  const prefix = prices?.currency_prefix ?? "";
  const shown = minor > 0 ? n.toFixed(minor) : String(Math.round(n));
  return `${prefix}${shown}${suffix}`;
}
