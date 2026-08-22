import Link from "next/link";
import type { WooProduct } from "@/lib/types";
import { formatPrice } from "@/lib/woo";
import CardAddButton from "./CardAddButton";

export default function ProductCard({ product }: { product: WooProduct }) {
  const img = product.images?.[0];
  const price = formatPrice(product.prices.price, product.prices);
  const onSale = product.on_sale;
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition flex flex-col">
      {onSale && (
        <span className="absolute top-3 right-3 z-10 bg-sale text-white text-xs font-bold rounded-full px-2.5 py-1">
          מבצע
        </span>
      )}
      <Link href={`/product/${product.slug}/`} className="block" aria-label={product.name}>
        <div className="aspect-square bg-white overflow-hidden p-3">
          {img && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img.thumbnail || img.src}
              srcSet={img.srcset || undefined}
              // cards render ~half the viewport on phones, ~1/4 on desktop
              sizes="(max-width: 768px) 45vw, 280px"
              alt={img.alt || product.name}
              width={600}
              height={600}
              className="w-full h-full object-contain group-hover:scale-105 transition"
              loading="lazy"
            />
          )}
        </div>
      </Link>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <Link href={`/product/${product.slug}/`} className="flex-1">
          <h3 className="text-sm font-semibold leading-snug line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2">
          {onSale && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.prices.regular_price, product.prices)}
            </span>
          )}
          <span className={`font-bold ${onSale ? "text-sale" : "text-brand"}`}>{price}</span>
        </div>
        {!product.is_in_stock && <span className="text-xs text-sale">אזל מהמלאי</span>}
        <CardAddButton product={product} />
      </div>
    </div>
  );
}
