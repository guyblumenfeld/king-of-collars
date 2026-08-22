import Link from "next/link";
import { notFound } from "next/navigation";
import { listPosts, getPostBySlug } from "@/lib/woo";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await listPosts(50);
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/blog/" className="text-brand text-sm">← חזרה לבלוג</Link>
      <h1 className="text-3xl font-extrabold my-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      {img && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img} alt="" className="w-full rounded-2xl mb-6" />
      )}
      <div className="wp-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}
