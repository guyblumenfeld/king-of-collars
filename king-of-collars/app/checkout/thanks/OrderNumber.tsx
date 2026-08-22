"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/CartProvider";

export default function OrderNumber() {
  const order = useSearchParams().get("order");
  const { refresh } = useCart();

  // The Store API empties the cart on checkout — sync the header badge.
  useEffect(() => {
    refresh();
  }, [refresh]);

  if (!order) return null;
  return (
    <p className="text-lg mb-2">
      מספר הזמנה: <span className="font-bold text-brand">#{order}</span>
    </p>
  );
}
