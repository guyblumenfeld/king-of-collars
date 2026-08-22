import Link from "next/link";
import { listPosts } from "@/lib/woo";

export const dynamic = "force-static";

function plain(html: string) {
  return html.replace(/<[^>]+>/g, "").trim();
}

export default async function BlogPage() {
  const posts = await listPosts(50);
  return (
    <div className="max-w-content mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">הבלוג</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => {
          const img = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          return (
            <Link
              key={p.id}
              href={`/blog/${p.slug}/`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
            >
              {img && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img} alt="" className="w-full h-44 object-cover" loading="lazy" />
              )}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h2
                  className="font-bold leading-snug"
                  dangerouslySetInnerHTML={{ __html: p.title.rendered }}
                />
                <p className="text-sm text-gray-500 line-clamp-3 flex-1">{plain(p.excerpt.rendered)}</p>
                <span className="text-brand text-sm font-semibold">קראו עוד →</span>
              </div>
            </Link>
          );
        })}
      </div>
      {posts.length === 0 && <p className="text-center text-gray-500 py-10">אין מאמרים עדיין</p>}
    </div>
  );
}
