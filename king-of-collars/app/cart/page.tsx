import { getProductBySlug } from "@/lib/woo";
import CartClient from "./CartClient";

export const dynamic = "force-static";

// Generic, broadly-appealing add-ons shown under the cart (not category-matched).
const RECOMMENDED_SLUGS = ["poop-bags-5pack", "finger-toothbrush", "cotton-rope-ball-figure8"];

export default async function CartPage() {
  const products = await Promise.all(RECOMMENDED_SLUGS.map((slug) => getProductBySlug(slug)));
  return <CartClient recommended={products.filter(Boolean)} />;
}
