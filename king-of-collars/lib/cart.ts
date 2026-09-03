"use client";
import type { Cart } from "./types";

// Where the WooCommerce Store API lives.
// - In `next dev`, next.config.js rewrites "/wpapi/*" → the WP host (same-origin, no CORS).
// - In the static production build, NEXT_PUBLIC_WP_ORIGIN is a Vercel env var so the
//   browser calls the WP host directly. WP sends the right CORS headers for this.
const PUBLIC_WP = process.env.NEXT_PUBLIC_WP_ORIGIN || "";
const STORE = PUBLIC_WP ? `${PUBLIC_WP}/wp-json/wc/store/v1` : "/wpapi/wc/store/v1";

const TOKEN_KEY = "ahk_cart_token";
const NONCE_KEY = "ahk_cart_nonce";

function lsGet(k: string) {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
}
function lsSet(k: string, v: string | null) {
  if (typeof window === "undefined" || !v) return;
  try {
    localStorage.setItem(k, v);
  } catch {
    /* private mode / storage disabled — fall back to in-memory below */
  }
}

// Mirror of the persisted values, so a write works even if localStorage is blocked.
let token: string | null = lsGet(TOKEN_KEY);
let nonce: string | null = lsGet(NONCE_KEY);

async function call<T = Cart>(path: string, opts: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) headers["Cart-Token"] = token;
  if (nonce) headers["Nonce"] = nonce;

  const res = await fetch(`${STORE}${path}`, { ...opts, headers, credentials: "omit" });

  // The Store API rotates the Cart-Token and hands back a fresh Nonce on every response.
  const newToken = res.headers.get("Cart-Token");
  if (newToken) {
    token = newToken;
    lsSet(TOKEN_KEY, newToken);
  }
  const newNonce = res.headers.get("Nonce");
  if (newNonce) {
    nonce = newNonce;
    lsSet(NONCE_KEY, newNonce);
  }

  if (!res.ok) {
    // Woo returns {code, message} — surface the message (e.g. missing checkout field).
    let msg = `Cart error ${res.status}`;
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

// Writes require a valid Nonce. On a cold first action (e.g. add-to-cart with nothing
// cached) we must GET /cart once to obtain a Cart-Token + Nonce, otherwise WP returns
// 401 woocommerce_rest_missing_nonce.
async function ensureSession(): Promise<void> {
  if (!nonce) await call("/cart");
}

export const getCart = () => call("/cart");

export const addItem = async (
  id: number,
  quantity = 1,
  variation?: { attribute: string; value: string }[]
) => {
  await ensureSession();
  return call("/cart/add-item", {
    method: "POST",
    body: JSON.stringify({ id, quantity, variation }),
  });
};

export const updateItem = async (key: string, quantity: number) => {
  await ensureSession();
  return call("/cart/update-item", { method: "POST", body: JSON.stringify({ key, quantity }) });
};

export const removeItem = async (key: string) => {
  await ensureSession();
  return call("/cart/remove-item", { method: "POST", body: JSON.stringify({ key }) });
};
