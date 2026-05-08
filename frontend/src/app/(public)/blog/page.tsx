import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog — Ladies Bag Manufacturers in Lahore & Pakistan",
  description:
    "Buyer guides, wholesale tips, and craftsmanship notes from Aura Manufacturers — a Lahore-based ladies bag manufacturer working with women across Pakistan.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Aura Manufacturers Blog — Ladies Bags, Lahore",
    description:
      "Original guides on ladies bag manufacturing in Lahore and Pakistan, wholesale buying, designer handbags, and hand bag styles for women.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="section-cream relative overflow-hidden">
        <div className="blob blob-gold blob-drift-slow w-[26rem] h-[26rem] -right-24 -top-20 opacity-40" />
        <div className="blob blob-camel w-[18rem] h-[18rem] -left-16 top-32 opacity-25" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-12">
          <Reveal>
            <p className="eyebrow mb-5">Field Notes</p>
            <h1 className="font-display text-5xl md:text-6xl text-[var(--ink)] mb-4">
              The Aura Journal
            </h1>
            <p className="text-[var(--muted)] max-w-2xl text-lg">
              Original buyer guides and craftsmanship notes from a working ladies bag
              manufacturer in Lahore. Written for shop owners, wholesale buyers, and
              women buying a hand bag they want to keep for years — not seasons.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="block h-px w-16 bg-[var(--gold)]" />
              <span className="text-[0.65rem] uppercase tracking-luxe text-[var(--muted)]">
                {posts.length} essays · Updated monthly
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="divider-gold py-4">
          <span className="dot" />
        </div>
      </div>

      <section className="section-beige section-decor relative overflow-hidden">
        <div className="blob blob-cognac w-[24rem] h-[24rem] -left-32 bottom-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <li>
                  <Link href={`/blog/${p.slug}`} className="group block">
                    <article>
                      <div className="product-frame mb-5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.hero.src} alt={p.hero.alt} loading="lazy" />
                        <span className="product-overlay-cta">Read article →</span>
                      </div>
                      <p className="text-[0.65rem] uppercase tracking-luxe text-[var(--muted)] mb-2">
                        {new Date(p.publishedAt).toLocaleDateString("en-GB", {
                          day: "numeric", month: "long", year: "numeric",
                        })}{" · "}{p.readMinutes} min read
                      </p>
                      <h2 className="font-display text-xl text-[var(--ink)] group-hover:text-[var(--camel)] transition-colors duration-400 ease-out-soft leading-snug mb-2">
                        {p.title}
                      </h2>
                      <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3">
                        {p.description}
                      </p>
                    </article>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
