import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/woo";
import { LOCAL_POSTS } from "@/lib/local-posts";
import { CATEGORY_CONTENT } from "@/lib/category-content";

const SITE = "https://kingofcollars.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await listProducts({ per_page: 100 });

  const staticRoutes = ["/", "/products/", "/about/", "/contact/", "/blog/", "/terms/", "/accessibility-statement/"];

  return [
    ...staticRoutes.map((route) => ({ url: `${SITE}${route}` })),
    ...Object.keys(CATEGORY_CONTENT).map((slug) => ({ url: `${SITE}/category/${slug}/` })),
    ...products.map((p) => ({ url: `${SITE}/product/${p.slug}/` })),
    ...LOCAL_POSTS.map((p) => ({ url: `${SITE}/blog/${p.slug}/` })),
  ];
}
