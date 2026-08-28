"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { WooProduct, WooCategory } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

export default function ProductsClient({
  products,
  categories,
}: {
  products: WooProduct[];
  categories: WooCategory[];
}) {
  // honor ?cat=slug from the homepage tiles — useSearchParams (not window.location)
  // so it reacts correctly to Next's client-side navigation, not just a hard page load.
  const cat = useSearchParams().get("cat");
  const [active, setActive] = useState<string>(cat ?? "all");

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.categories.some((c) => c.slug === active));

  return (
    <div className="max-w-content mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">החנות</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        <FilterBtn label="הכול" on={active === "all"} onClick={() => setActive("all")} />
        {categories.map((c) => (
          <FilterBtn key={c.id} label={c.name} on={active === c.slug} onClick={() => setActive(c.slug)} />
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {filtered.length === 0 && <p className="text-center text-gray-500 py-10">אין מוצרים בקטגוריה זו</p>}
    </div>
  );
}

function FilterBtn({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm border ${
        on ? "bg-brand text-white border-brand" : "bg-white border-gray-300 hover:border-brand"
      }`}
    >
      {label}
    </button>
  );
}
