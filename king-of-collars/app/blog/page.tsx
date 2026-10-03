import type { Metadata } from "next";
import Link from "next/link";
import { LOCAL_POSTS } from "@/lib/local-posts";
import CategoryBadge from "@/components/CategoryBadge";

export const dynamic = "force-static";

const TITLE = "הבלוג - אלוף הקולרים";
const DESCRIPTION = "טיפים, מדריכים וסיפורים על כלבים מהבלוג של אלוף הקולרים.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

export default function BlogPage() {
  return (
    <div className="max-w-content mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">הבלוג</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {LOCAL_POSTS.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}/`}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
          >
            {p.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt="" className="w-full h-44 object-cover" loading="lazy" />
            )}
            <div className="p-4 flex flex-col gap-2 flex-1">
              <div><CategoryBadge name={p.category} /></div>
              <h2 className="font-bold leading-snug">{p.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-3 flex-1">{p.excerpt}</p>
              <span className="text-brand text-sm font-semibold">קראו עוד →</span>
            </div>
          </Link>
        ))}
      </div>
      {LOCAL_POSTS.length === 0 && <p className="text-center text-gray-500 py-10">אין מאמרים עדיין</p>}
    </div>
  );
}
