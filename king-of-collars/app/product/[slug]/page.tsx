import { notFound } from "next/navigation";
import { listProducts, getProductBySlug, formatPrice } from "@/lib/woo";
import AddToCart from "@/components/AddToCart";
import ProductGallery from "./ProductGallery";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const products = await listProducts({ per_page: 100 });
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const onSale = product.on_sale;

  return (
    <div className="max-w-content mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      <ProductGallery images={product.images} name={product.name} />

      <div>
        <h1 className="text-2xl font-bold mb-3">{product.name}</h1>
        <div className="flex items-center gap-3 mb-5">
          {onSale && (
            <span className="text-gray-400 line-through">
              {formatPrice(product.prices.regular_price, product.prices)}
            </span>
          )}
          <span className={`text-2xl font-extrabold ${onSale ? "text-sale" : "text-brand"}`}>
            {formatPrice(product.prices.price, product.prices)}
          </span>
        </div>

        {product.short_description && (
          <div
            className="wp-content text-gray-700 mb-6"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />
        )}

        <AddToCart product={product} />
      </div>

      {product.description && (
        <div className="md:col-span-2 border-t pt-8">
          <h2 className="text-xl font-bold mb-4">תיאור המוצר</h2>
          <div className="wp-content" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      )}
    </div>
  );
}
