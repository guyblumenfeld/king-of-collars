"use client";
import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import type { Cart, CartItem, WooProduct } from "@/lib/types";
import * as api from "@/lib/cart";

interface Ctx {
  cart: Cart | null;
  loading: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
  // `product` is optional but required to render an optimistic item instantly;
  // without it (e.g. cart page +/- buttons) the call falls back to non-optimistic.
  add: (
    id: number,
    qty?: number,
    variation?: { attribute: string; value: string }[],
    product?: WooProduct
  ) => Promise<void>;
  update: (key: string, qty: number) => Promise<void>;
  remove: (key: string) => Promise<void>;
  refresh: () => Promise<void>;
  pendingKeys: Set<string>;
}

const CartContext = createContext<Ctx | null>(null);

// Builds a placeholder CartItem straight from product/listing data so the UI can show
// it before the server confirms anything. Replaced wholesale once the real cart lands.
function optimisticItem(
  product: WooProduct,
  qty: number,
  variation?: { attribute: string; value: string }[]
): CartItem {
  return {
    key: `optimistic-${product.id}-${Date.now()}`,
    id: product.id,
    name: product.name,
    quantity: qty,
    images: product.images,
    prices: product.prices,
    totals: { line_total: product.prices.price, currency_minor_unit: product.prices.currency_minor_unit },
    variation: variation ?? [],
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // Snapshot to roll back to if an optimistic call fails.
  const lastConfirmedCart = useRef<Cart | null>(null);
  // Item keys with an in-flight remove — lets a single item show a
  // busy state without freezing every other +/- button in the drawer.
  const [pendingKeys, setPendingKeys] = useState<Set<string>>(new Set());
  // Debounce timers for rapid +/- clicks: one network call per item per pause,
  // not one per click, so mashing the button doesn't queue up N round-trips.
  const updateTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const refresh = useCallback(async () => {
    try {
      const fresh = await api.getCart();
      lastConfirmedCart.current = fresh;
      setCart(fresh);
    } catch (e) {
      /* cart not reachable (e.g. CORS in static preview) — ignore quietly */
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add: Ctx["add"] = async (id, qty = 1, variation, product) => {
    setOpen(true);

    if (!product) {
      // No listing data to build a placeholder from — fall back to the old blocking path.
      setLoading(true);
      try {
        const fresh = await api.addItem(id, qty, variation);
        lastConfirmedCart.current = fresh;
        setCart(fresh);
      } finally {
        setLoading(false);
      }
      return;
    }

    // Optimistic path: show the item immediately, reconcile with the server in the background.
    const before = cart;
    setCart((prev) => {
      const base: Cart = prev ?? {
        items: [],
        items_count: 0,
        totals: { total_price: "0", total_items: "0", currency_minor_unit: product.prices.currency_minor_unit, currency_symbol: product.prices.currency_symbol },
      };
      return {
        ...base,
        items: [...base.items, optimisticItem(product, qty, variation)],
        items_count: base.items_count + qty,
      };
    });

    try {
      const fresh = await api.addItem(id, qty, variation);
      lastConfirmedCart.current = fresh;
      setCart(fresh);
    } catch (e) {
      // Roll back to the last server-confirmed state; the button-level UI shows its own error.
      setCart(before ?? lastConfirmedCart.current);
      throw e;
    }
  };
  const update: Ctx["update"] = async (key, qty) => {
    // Optimistic path: reflect the new quantity/total immediately and always (every
    // click updates local state), but debounce the server call so rapid +/- clicks
    // collapse into one round-trip instead of one per click.
    const before = cart;
    setCart((prev) => {
      if (!prev) return prev;
      const items = prev.items.map((it) => {
        if (it.key !== key) return it;
        const unitPrice = Number(it.prices.price) || 0;
        return { ...it, quantity: qty, totals: { ...it.totals, line_total: String(unitPrice * qty) } };
      });
      const items_count = items.reduce((n, it) => n + it.quantity, 0);
      return { ...prev, items, items_count };
    });

    const timers = updateTimers.current;
    const existing = timers.get(key);
    if (existing) clearTimeout(existing);
    timers.set(
      key,
      setTimeout(async () => {
        timers.delete(key);
        try {
          const fresh = await api.updateItem(key, qty);
          lastConfirmedCart.current = fresh;
          setCart(fresh);
        } catch (e) {
          setCart(before ?? lastConfirmedCart.current);
        }
      }, 400)
    );
  };
  const remove: Ctx["remove"] = async (key) => {
    // Optimistic path: drop the item immediately, reconcile in the background.
    const before = cart;
    setCart((prev) => {
      if (!prev) return prev;
      const items = prev.items.filter((it) => it.key !== key);
      const items_count = items.reduce((n, it) => n + it.quantity, 0);
      return { ...prev, items, items_count };
    });
    setPendingKeys((prev) => new Set(prev).add(key));

    try {
      const fresh = await api.removeItem(key);
      lastConfirmedCart.current = fresh;
      setCart(fresh);
    } catch (e) {
      setCart(before ?? lastConfirmedCart.current);
      throw e;
    } finally {
      setPendingKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  };

  const count = cart?.items_count ?? 0;

  return (
    <CartContext.Provider value={{ cart, loading, open, setOpen, add, update, remove, refresh, pendingKeys }}>
      {children}
      {/* Screen-reader announcement of cart state changes */}
      <div aria-live="polite" className="sr-only">
        {count > 0 ? `בעגלה ${count} פריטים` : ""}
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
