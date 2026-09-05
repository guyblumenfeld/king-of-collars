"use client";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice, freeShippingMessage, checkoutUrl } from "@/lib/woo";

export default function CartPage() {
  const { cart, update, remove, pendingKeys } = useCart();
  const items = cart?.items ?? [];

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
          <p className="text-sm text-center text-brand font-semibold bg-brand/10 rounded-lg py-2.5 mb-4">
            {freeShippingMessage(cart!.totals.total_items, cart!.totals.currency_minor_unit)}
          </p>
          <div className="space-y-4">
            {items.map((it) => {
              const busy = pendingKeys.has(it.key);
              return (
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
                    <div className={`flex items-center gap-2 mt-2 ${busy ? "opacity-50" : ""}`}>
                      <button onClick={() => update(it.key, it.quantity - 1)} disabled={busy} className="w-8 h-8 rounded border">−</button>
                      <span className="w-8 text-center">{it.quantity}</span>
                      <button onClick={() => update(it.key, it.quantity + 1)} disabled={busy} className="w-8 h-8 rounded border">+</button>
                      <button onClick={() => remove(it.key)} disabled={busy} className="text-sm text-sale mr-4">הסרה</button>
                    </div>
                  </div>
                  <div className="font-bold">
                    {formatPrice(it.totals.line_total, { currency_minor_unit: it.totals.currency_minor_unit })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>סה״כ</span>
              <span>
                {formatPrice(cart!.totals.total_items, {
                  currency_minor_unit: cart!.totals.currency_minor_unit,
                  currency_symbol: cart!.totals.currency_symbol,
                })}
              </span>
            </div>
            {/* Plain <a>, not next/link: this leaves the SPA entirely for WP's native checkout. */}
            <a
              href={checkoutUrl(items)}
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
