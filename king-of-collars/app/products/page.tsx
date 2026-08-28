import { Suspense } from "react";
import { listProducts, listCategories } from "@/lib/woo";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-static";

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
