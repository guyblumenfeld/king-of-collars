"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { formatPrice, freeShippingMessage, checkoutUrl } from "@/lib/woo";

export default function CartDrawer() {
  const { cart, open, setOpen, update, remove, pendingKeys } = useCart();
  const items = cart?.items ?? [];

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">העגלה שלי</h2>
          <button onClick={() => setOpen(false)} aria-label="סגירה" className="text-2xl leading-none">×</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 && <p className="text-center text-gray-500 mt-10">העגלה ריקה</p>}
          {items.map((it) => {
            const busy = pendingKeys.has(it.key);
            return (
              <div key={it.key} className="flex gap-3 items-start">
                {it.images?.[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.images[0].src} alt={it.name} className="w-16 h-16 object-contain rounded-lg bg-paper" />
                )}
                <div className="flex-1">
                  <div className="text-sm font-semibold leading-snug">{it.name}</div>
                  {it.variation?.map((v) => (
                    <div key={v.attribute} className="text-xs text-gray-500">{v.value}</div>
                  ))}
                  <div className={`flex items-center gap-2 mt-1 ${busy ? "opacity-50" : ""}`}>
                    <button onClick={() => update(it.key, it.quantity - 1)} disabled={busy} className="w-7 h-7 rounded border">−</button>
                    <span className="w-6 text-center">{it.quantity}</span>
                    <button onClick={() => update(it.key, it.quantity + 1)} disabled={busy} className="w-7 h-7 rounded border">+</button>
                    <button onClick={() => remove(it.key)} disabled={busy} className="text-xs text-sale mr-auto">הסרה</button>
                  </div>
                </div>
                <div className="text-sm font-bold">
                  {formatPrice(it.totals.line_total, { currency_minor_unit: it.totals.currency_minor_unit })}
                </div>
              </div>
            );
          })}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t space-y-3">
            <p className="text-sm text-center text-brand font-semibold bg-brand/10 rounded-lg py-2">
              {freeShippingMessage(cart!.totals.total_price, cart!.totals.currency_minor_unit)}
            </p>
            <div className="flex justify-between font-bold">
              <span>סה״כ</span>
              <span>
                {formatPrice(cart!.totals.total_price, {
                  currency_minor_unit: cart!.totals.currency_minor_unit,
                  currency_symbol: cart!.totals.currency_symbol,
                })}
              </span>
            </div>
            {/* Plain <a>, not next/link: this leaves the SPA entirely for WP's native checkout. */}
            <a
              href={checkoutUrl(items)}
              className="block text-center bg-brand text-white rounded-full py-3 font-semibold hover:bg-brand-dark"
            >
              תשלום מהיר
            </a>
            <Link
              href="/cart/"
              onClick={() => setOpen(false)}
              className="block text-center text-brand text-sm font-semibold hover:underline"
            >
              לעמוד העגלה
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
