"use client";
import { useState } from "react";
import type { WooProduct } from "@/lib/types";
import { useCart } from "./CartProvider";

export default function AddToCart({ product }: { product: WooProduct }) {
  const { add } = useCart();
  const variationAttrs = product.attributes?.filter((a) => a.has_variations) ?? [];

  // default-select first term of each variation attribute (mirrors WC default_attributes intent)
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const a of variationAttrs) if (a.terms[0]) init[a.name] = a.terms[0].name;
    return init;
  });
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const isVariable = product.type === "variable";
  const allChosen = variationAttrs.every((a) => selected[a.name]);

  async function handleAdd() {
    const variation = isVariable
      ? variationAttrs.map((a) => ({ attribute: a.name, value: selected[a.name] }))
      : undefined;
    setError(false);
    setDone(true);
    setTimeout(() => setDone(false), 1500);
    try {
      await add(product.id, 1, variation, product);
    } catch {
      setDone(false);
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  }

  return (
    <div className="space-y-4">
      {variationAttrs.map((a) => (
        <div key={a.id || a.name}>
          <div className="text-sm font-semibold mb-1">{a.name}</div>
          <div className="flex flex-wrap gap-2">
            {a.terms.map((t) => {
              const active = selected[a.name] === t.name;
              return (
                <button
                  key={t.id || t.name}
                  onClick={() => setSelected((s) => ({ ...s, [a.name]: t.name }))}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    active ? "bg-brand text-white border-brand" : "bg-white border-gray-300 hover:border-brand"
                  }`}
                >
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        disabled={!product.is_in_stock || (isVariable && !allChosen)}
        className={`w-full rounded-full py-3.5 font-bold text-lg transition disabled:opacity-50 ${
          error ? "bg-sale text-white" : "bg-brand text-white hover:bg-brand-dark"
        }`}
      >
        {!product.is_in_stock ? "אזל מהמלאי" : error ? "שגיאה, נסו שוב" : done ? "נוסף לעגלה ✓" : "הוספה לעגלה"}
      </button>
    </div>
  );
}
