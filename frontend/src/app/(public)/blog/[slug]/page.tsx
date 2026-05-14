import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getAllPosts, getPost } from "@/lib/blog";
import { SITE_URL, ORG_ID, LOGO_ID } from "@/lib/seo";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Article not found" };
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: post.hero.src, width: 1400, height: 800, alt: post.hero.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.hero.src],
    },
  };
}

function renderBody(body: string) {
  // Tiny markdown-ish parser: blank-line paragraphs, ## h2, * h3, - ul, 1. ol.
  const blocks = body.split(/\n\s*\n/);
  let listBuffer: { kind: "ul" | "ol"; items: string[] } | null = null;
  const out: React.ReactNode[] = [];

  function flushList() {
    if (!listBuffer) return;
    const Tag = listBuffer.kind;
    out.push(
      <Tag
        key={out.length}
        className={
          Tag === "ul"
            ? "list-disc pl-6 my-6 space-y-2 text-[var(--ink)]/85 leading-relaxed"
            : "list-decimal pl-6 my-6 space-y-2 text-[var(--ink)]/85 leading-relaxed"
        }
      >
        {listBuffer.items.map((it, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: inline(it) }} />
        ))}
      </Tag>
    );
    listBuffer = null;
  }

  function inline(s: string) {
    return s
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  }

  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;

    if (block.startsWith("## ")) {
      flushList();
      out.push(
        <h2
          key={out.length}
          className="font-display text-2xl md:text-3xl text-[var(--ink)] mt-14 mb-5"
        >
          {block.slice(3).trim()}
        </h2>
      );
      continue;
    }

    const ulMatch = block.split("\n").every((l) => /^- /.test(l.trim()));
    if (ulMatch) {
      flushList();
      listBuffer = {
        kind: "ul",
        items: block.split("\n").map((l) => l.trim().replace(/^- /, "")),
      };
      flushList();
      continue;
    }

    const olMatch = block.split("\n").every((l) => /^\d+\.\s/.test(l.trim()));
    if (olMatch) {
      flushList();
      listBuffer = {
        kind: "ol",
        items: block.split("\n").map((l) => l.trim().replace(/^\d+\.\s/, "")),
      };
      flushList();
      continue;
    }

    flushList();
    out.push(
      <p
        key={out.length}
        className="text-[var(--ink)]/85 leading-relaxed text-[15.5px] my-5"
        dangerouslySetInnerHTML={{ __html: inline(block) }}
      />
    );
  }
  flushList();
  return out;
}

export default function BlogPostPage({ params }: Params) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    name: post.title,
    description: post.description,
    image: [post.hero.src],
    author: { "@type": "Organization", name: post.author, url: SITE_URL, "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": `${SITE_URL}/blog#blog` },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: "en-PK",
    keywords: post.tags.join(", "),
    articleSection: post.tags[0],
    about: { "@id": ORG_ID },
    thumbnailUrl: post.hero.src,
    logo: { "@id": LOGO_ID },
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const others = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

      <article>
        <section className="section-cream relative overflow-hidden">
          <div className="blob blob-gold blob-drift-slow w-[24rem] h-[24rem] -right-20 -top-16 opacity-35" />
          <div className="relative mx-auto max-w-3xl px-6 lg:px-10 pt-20 pb-10">
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-6 text-[0.65rem] uppercase tracking-luxe text-[var(--muted)]">
                <Link href="/" className="hover:text-[var(--camel)]">Home</Link>
                {" · "}
                <Link href="/blog" className="hover:text-[var(--camel)]">Blog</Link>
              </nav>
              <p className="eyebrow mb-4">{post.tags[0]}</p>
              <h1 className="font-display text-4xl md:text-5xl text-[var(--ink)] leading-[1.1] mb-6">
                {post.title}
              </h1>
              <p className="text-[var(--muted)] text-lg leading-relaxed mb-6">
                {post.description}
              </p>
              <p className="text-[0.7rem] uppercase tracking-luxe text-[var(--muted)]">
                {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric", month: "long", year: "numeric",
                })}
                {" · "}{post.readMinutes} min read · By {post.author}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Reveal>
              <figure className="border border-[var(--line)] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.hero.src}
                  alt={post.hero.alt}
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
                <figcaption className="sr-only">{post.hero.alt}</figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        <section className="section-cream relative">
          <div className="relative mx-auto max-w-3xl px-6 lg:px-10 py-16">
            <Reveal>
              <div className="prose-aura">{renderBody(post.body)}</div>
            </Reveal>

            <Reveal delay={120}>
              <aside className="mt-16 pt-10 border-t border-[var(--line)]">
                <p className="eyebrow mb-3">Tags</p>
                <ul className="flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <li
                      key={t}
                      className="text-[0.65rem] uppercase tracking-luxe text-[var(--muted)] border border-[var(--line)] px-3 py-1"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>
          </div>
        </section>

        {others.length > 0 && (
          <section className="section-beige relative overflow-hidden">
            <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-16">
              <p className="eyebrow mb-6">Continue reading</p>
              <ul className="grid md:grid-cols-3 gap-x-6 gap-y-10">
                {others.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="group block">
                      <div className="product-frame mb-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.hero.src} alt={p.hero.alt} loading="lazy" />
                      </div>
                      <h3 className="font-display text-lg text-[var(--ink)] group-hover:text-[var(--camel)] transition-colors duration-400 leading-snug">
                        {p.title}
                      </h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
