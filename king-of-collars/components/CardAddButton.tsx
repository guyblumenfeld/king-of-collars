"use client";
import { useState } from "react";
import type { WooProduct } from "@/lib/types";
import { useCart } from "./CartProvider";

// Compact add-to-cart used on listing cards (homepage + /products).
// Simple products add directly. Variable products add their DEFAULT variation
// (first term of each variation attribute) so the card stays a one-tap action;
// shoppers who want another size/colour can open the product page.
export default function CardAddButton({ product }: { product: WooProduct }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const isVariable = product.type === "variable";
  const variationAttrs = product.attributes?.filter((a) => a.has_variations) ?? [];

  async function handleAdd() {
    setError(false);
    const variation = isVariable
      ? variationAttrs
          .map((a) => {
            const defaultAttr = product.default_attributes?.find(
              (d) => d.name === a.name
            );
            const value = defaultAttr?.option ?? a.terms[0]?.name;
            return value ? { attribute: a.name, value } : null;
          })
          .filter((v): v is { attribute: string; value: string } => v !== null)
      : undefined;
    // Optimistic: show success immediately, the CartProvider reconciles/rolls back in the background.
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

  if (!product.is_in_stock) {
    return (
      <button
        disabled
        className="w-full rounded-full py-2 text-sm font-semibold bg-gray-100 text-gray-400 cursor-not-allowed"
      >
        אזל מהמלאי
      </button>
    );
  }

  const label = error ? "שגיאה, נסו שוב" : done ? "נוסף לעגלה ✓" : "הוספה לעגלה";

  return (
    <button
      onClick={handleAdd}
      aria-label={`הוספה לעגלה: ${product.name}`}
      className={`w-full rounded-full py-2 text-sm font-semibold transition disabled:opacity-60 ${
        error
          ? "bg-sale text-white"
          : done
            ? "bg-brand-dark text-white"
            : "bg-brand text-white hover:bg-brand-dark"
      }`}
    >
      {label}
    </button>
  );
}
