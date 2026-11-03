import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listProducts, listCategories } from "@/lib/woo";
import { CATEGORY_CONTENT } from "@/lib/category-content";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return Object.keys(CATEGORY_CONTENT).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = CATEGORY_CONTENT[params.slug];
  if (!c) return {};
  return {
    title: c.title,
    description: c.meta,
    alternates: { canonical: `/category/${params.slug}` },
    openGraph: { title: c.title, description: c.meta },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const c = CATEGORY_CONTENT[params.slug];
  if (!c) notFound();
  const [all, cats] = await Promise.all([listProducts({ per_page: 100 }), listCategories()]);
  const products = all.filter((p) => p.categories.some((x) => x.slug === params.slug));
  const others = cats.filter((x) => x.count > 0 && CATEGORY_CONTENT[x.slug] && x.slug !== params.slug);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="max-w-content mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/products/" className="hover:underline">החנות</Link> / {c.h1}
      </nav>
      <h1 className="text-2xl font-bold mb-6">{c.h1}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      <div className="max-w-3xl space-y-3 text-gray-700 mb-10">
        {c.intro.map((t, i) => <p key={i}>{t}</p>)}
      </div>

      <section className="max-w-3xl mb-10">
        <h2 className="text-xl font-bold mb-3">איך בוחרים?</h2>
        <ul className="list-disc pr-5 space-y-2 text-gray-700">
          {c.guide.map((g) => <li key={g.label}><strong>{g.label}:</strong> {g.text}</li>)}
        </ul>
      </section>

      <section className="max-w-3xl mb-10">
        <h2 className="text-xl font-bold mb-3">שאלות נפוצות</h2>
        <dl className="space-y-4">
          {c.faq.map((f) => (
            <div key={f.q}>
              <dt className="font-semibold">{f.q}</dt>
              <dd className="text-gray-700">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="max-w-3xl mb-10">
        <h2 className="text-xl font-bold mb-3">משלוח והחזרות</h2>
        <p className="text-gray-700">
          משלוח חינם בקנייה מעל ₪150 לנקודת חלוקה (UPS) או מעל ₪300 למשלוח עד הבית. זמן אספקה משוער: 1-5 ימי עסקים.
          איסוף עצמי אפשרי בקיבוץ אורים בתיאום מראש. ניתן לבטל עסקה עד 14 ימים מיום קבלת המוצר, כשהמוצר באריזתו המקורית,
          סגור ולא משומש. לפרטים מלאים: <Link href="/terms/" className="text-brand underline">התקנון</Link>.
        </p>
      </section>

      <div className="flex flex-wrap gap-2">
        {others.map((o) => (
          <Link key={o.id} href={`/category/${o.slug}/`} className="px-4 py-2 rounded-full text-sm border bg-white border-gray-300 hover:border-brand">
            {o.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
