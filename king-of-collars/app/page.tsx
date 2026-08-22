import Link from "next/link";
import { listProducts, listCategories, listPosts } from "@/lib/woo";
import ProductCard from "@/components/ProductCard";
import { CollarIcon, ShirtIcon, BallIcon, PawIcon, TruckIcon, ReturnIcon, ShieldIcon } from "@/components/icons";

export const dynamic = "force-static";

const CAT_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  "leashes-collars": CollarIcon,
  clothing: ShirtIcon,
  toys: BallIcon,
  accessories: PawIcon,
};

export default async function Home() {
  const [products, categories, posts] = await Promise.all([
    listProducts({ per_page: 8 }),
    listCategories(),
    listPosts(3),
  ]);
  const cats = categories.filter((c) => c.count > 0);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-l from-brand-dark via-brand to-brand-light text-white">
        {/* decorative paws */}
        <PawIcon className="absolute -top-6 right-8 w-32 h-32 text-white/10 rotate-12" />
        <PawIcon className="absolute bottom-4 left-10 w-24 h-24 text-white/10 -rotate-12" />
        <PawIcon className="absolute top-16 left-1/3 w-14 h-14 text-white/10 rotate-45" />
        <div className="relative max-w-content mx-auto px-4 py-20 md:py-28 text-center">
          <span className="inline-block bg-white/15 backdrop-blur rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            🇮🇱 משלוח חינם בקנייה מעל ₪199
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
            כל מה שהכלב שלך צריך
            <br className="hidden md:block" /> במקום אחד
          </h1>
          <p className="text-lg md:text-xl text-white/85 mb-9 max-w-xl mx-auto">
            אביזרים איכותיים שנבחרו בקפידה — רצועות, קולרים, ביגוד ומשחקים
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/products/"
              className="inline-block bg-white text-brand font-bold rounded-full px-9 py-3.5 shadow-lg hover:bg-paper hover:shadow-xl transition"
            >
              לחנות ←
            </Link>
            <Link
              href="/about/"
              className="inline-block border-2 border-white/60 text-white font-bold rounded-full px-7 py-3 hover:bg-white/10 transition"
            >
              מי אנחנו
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-content mx-auto px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-2">קטגוריות</h2>
        <p className="text-center text-gray-500 mb-8">מצאו בדיוק את מה שהכלב שלכם אוהב</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cats.map((c) => {
            const Icon = CAT_ICON[c.slug] ?? PawIcon;
            return (
              <Link
                key={c.id}
                href={`/products/?cat=${c.slug}`}
                className="group bg-white rounded-2xl p-7 text-center border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand/30 hover:-translate-y-0.5 transition"
              >
                <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-brand/10 text-brand grid place-items-center group-hover:bg-brand group-hover:text-white transition">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="font-bold">{c.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{c.count} מוצרים</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-content mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold">מוצרים נבחרים</h2>
          <Link href="/products/" className="text-brand text-sm font-bold hover:underline">
            לכל המוצרים ←
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/products/"
            className="inline-block bg-brand text-white font-bold rounded-full px-10 py-3.5 shadow hover:bg-brand-dark hover:shadow-lg transition"
          >
            לכל המוצרים ←
          </Link>
        </div>
      </section>

      {/* From the blog */}
      {posts.length > 0 && (
        <section className="max-w-content mx-auto px-4 py-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold">מהבלוג</h2>
            <Link href="/blog/" className="text-brand text-sm font-bold hover:underline">
              לכל המאמרים ←
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {posts.map((p) => {
              const img = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              return (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}/`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition flex flex-col"
                >
                  {img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img} alt="" className="w-full h-44 object-cover group-hover:scale-105 transition" loading="lazy" />
                  )}
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <h3
                      className="font-bold leading-snug"
                      dangerouslySetInnerHTML={{ __html: p.title.rendered }}
                    />
                    <span className="text-brand text-sm font-semibold mt-auto">קראו עוד ←</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* USP strip */}
      <section className="max-w-content mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {[
            { Icon: TruckIcon, title: "משלוח מהיר", sub: "אספקה תוך 1–4 ימי עסקים" },
            { Icon: ReturnIcon, title: "החזרה תוך 30 יום", sub: "אחריות מלאה על כל המוצרים" },
            { Icon: ShieldIcon, title: "תשלום מאובטח", sub: "קנייה בטוחה ומאובטחת" },
          ].map(({ Icon, title, sub }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 text-right">
              <div className="shrink-0 w-12 h-12 rounded-full bg-brand/10 text-brand grid place-items-center">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold">{title}</div>
                <div className="text-sm text-gray-500">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
