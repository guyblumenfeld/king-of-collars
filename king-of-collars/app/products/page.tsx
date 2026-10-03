import type { Metadata } from "next";
import { Suspense } from "react";
import { listProducts, listCategories } from "@/lib/woo";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-static";

const TITLE = "החנות - אלוף הקולרים";
const DESCRIPTION = "כל המוצרים: רצועות, קולרים, ביגוד ומשחקים לכלבים. משלוח מהיר עד הבית.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/products" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    listProducts({ per_page: 100 }),
    listCategories(),
  ]);
  const cats = categories.filter((c) => c.count > 0);
  return (
    <Suspense>
      <ProductsClient products={products} categories={cats} />
    </Suspense>
  );
}
