"use client";
import { useEffect } from "react";
import type { WooProduct } from "@/lib/types";
import { productItem, track } from "@/lib/analytics";

export default function ViewItem({ product }: { product: WooProduct }) {
  useEffect(() => {
    track("view_item", [productItem(product)]);
  }, [product]);
  return null;
}
