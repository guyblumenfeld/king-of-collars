"use client";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/woo";

// Unlike the Store API calls in lib/cart.ts, this navigates the browser to a real WP page —
// there's no /wpapi rewrite for bare "/", so it always needs the actual WP origin, dev or prod.
const PUBLIC_WP = process.env.NEXT_PUBLIC_WP_ORIGIN || "https://lightgreen-buffalo-540924.hostingersite.com";

export default function CartPage() {
  const { cart, update, remove, loading } = useCart();
  const items = cart?.items ?? [];

  // Rebuilds WooCommerce's own session cart server-side (see wp-snippets/checkout-endpoints.php,
  // #4) and hands the browser off to its native checkout — the Store API's Cart-Token only works
  // as a REST header, not on a plain page navigation, so there's no way to keep this cart in the
  // headless UI past this point.
  function checkoutUrl() {
    const payload = items.map((it) => ({
      id: it.id,
      qty: it.quantity,
      variation: it.variation?.length ? it.variation : undefined,
    }));
    return `${PUBLIC_WP}/?ahk_cart_load=${encodeURIComponent(JSON.stringify(payload))}`;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">העגלה שלי</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">העגלה ריקה</p>
          <Link href="/products/" className="text-brand font-semibold">המשך לקנות →</Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.key} className="bg-white rounded-2xl p-4 flex gap-4 items-center shadow-sm">
                {it.images?.[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.images[0].src} alt={it.name} className="w-20 h-20 object-contain bg-paper rounded-lg" />
                )}
                <div className="flex-1">
                  <div className="font-semibold">{it.name}</div>
                  {it.variation?.map((v) => (
                    <div key={v.attribute} className="text-xs text-gray-500">{v.value}</div>
                  ))}
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => update(it.key, it.quantity - 1)} disabled={loading} className="w-8 h-8 rounded border">−</button>
                    <span className="w-8 text-center">{it.quantity}</span>
                    <button onClick={() => update(it.key, it.quantity + 1)} disabled={loading} className="w-8 h-8 rounded border">+</button>
                    <button onClick={() => remove(it.key)} disabled={loading} className="text-sm text-sale mr-4">הסרה</button>
                  </div>
                </div>
                <div className="font-bold">
                  {formatPrice(it.totals.line_total, { currency_minor_unit: it.totals.currency_minor_unit })}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
            <div className="flex justify-between text-lg font-bold mb-4">
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
              href={checkoutUrl()}
              className="block text-center w-full bg-brand hover:bg-brand-dark text-white rounded-full py-3.5 font-bold transition-colors"
            >
              מעבר לתשלום
            </a>
            <p className="text-xs text-gray-400 text-center mt-2">
              משלוח עד הבית, איסוף מנקודת חלוקה (UPS) או איסוף עצמי
            </p>
          </div>
        </>
      )}
    </div>
  );
}
