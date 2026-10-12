import type { CartItem, WooProduct } from "./types";

type GtagItem = { item_id: string; item_name: string; price: number; quantity: number };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Woo prices are minor-unit strings ("4900" with minor_unit 2 = 49.00).
const money = (p: string, minor: number) => Number(p) / 10 ** minor;

export const productItem = (p: WooProduct, quantity = 1): GtagItem => ({
  item_id: String(p.id),
  item_name: p.name,
  price: money(p.prices.price, p.prices.currency_minor_unit),
  quantity,
});

export const cartItem = (it: CartItem): GtagItem => ({
  item_id: String(it.id),
  item_name: it.name,
  price: money(it.prices.price, it.prices.currency_minor_unit),
  quantity: it.quantity,
});

// No-op until gtag.js has loaded (and for ad-blocked visitors); never throws.
export function track(event: string, items: GtagItem[]) {
  try {
    window.gtag?.("event", event, {
      currency: "ILS",
      value: items.reduce((n, i) => n + i.price * i.quantity, 0),
      items,
    });
  } catch {}
}
