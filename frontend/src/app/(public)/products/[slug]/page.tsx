import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProduct } from "@/lib/api";
import { whatsappLink, productInquiryMessage } from "@/lib/whatsapp";
import Reveal from "@/components/Reveal";
import { SITE_NAME, SITE_URL, breadcrumbsJsonLd, productJsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await fetchProduct(params.slug);
  if (!product) return { title: "Bag not found" };
  const title = `${product.name} — ${product.category} | ${SITE_NAME}`;
  const description =
    (product.description?.slice(0, 155) ||
      `${product.name} — a ${product.category.toLowerCase()} hand-built by Aura Manufacturers in Lahore, Pakistan.`) +
    (product.description && product.description.length > 155 ? "…" : "");
  const url = `${SITE_URL}/products/${product.slug}`;
  const image = product.images[0];
  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: image ? [{ url: image, alt: product.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await fetchProduct(params.slug);
  if (!product) notFound();

  const product_ld = productJsonLd(product);

  const productUrl = `${SITE_URL}/products/${product.slug}`;
  const link = whatsappLink(productInquiryMessage(product.name, productUrl));
  const crumbs = breadcrumbsJsonLd([
    { name: "Home",     path: "/" },
    { name: "Bags",     path: "/products" },
    { name: product.name, path: `/products/${product.slug}` },
  ]);

  return (
    <section className="section-cream relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product_ld) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <div className="blob blob-gold blob-drift-slow w-[26rem] h-[26rem] -right-24 -top-16 opacity-35" />
      <div className="blob blob-camel w-[20rem] h-[20rem] -left-20 bottom-10 opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 grid md:grid-cols-2 gap-16">
        <Reveal>
          <div className="grid gap-4">
            <div className="relative aspect-[4/5] bg-[var(--beige)] border border-[var(--line)] overflow-hidden shadow-[0_24px_50px_-32px_rgba(26,20,16,0.4)]">
              <div className="absolute top-3 left-3 z-10 text-[0.6rem] uppercase tracking-luxe text-[var(--muted)] bg-[var(--cream)]/80 backdrop-blur px-2 py-1 border border-[var(--line)]">
                N° {product.slug.slice(0, 3).toUpperCase()}
              </div>
              {product.images[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.images[0]}
                  alt={`${product.name} — handmade ${product.category?.toLowerCase() ?? "ladies bag"} by Aura Manufacturers, Lahore`}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover transition-transform duration-[800ms] ease-out-soft hover:scale-[1.04]"
                />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(1).map((img, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={img}
                    alt={`${product.name} — view ${i + 2}`}
                    loading="lazy"
                    className="aspect-square object-cover border border-[var(--line)] transition-all duration-400 ease-out-soft hover:border-[var(--camel)] hover:-translate-y-0.5"
                  />
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="md:pt-6">
            <p className="eyebrow mb-5">{product.category}</p>
            <h1 className="font-display text-4xl md:text-5xl text-[var(--ink)] mb-6 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-10">
              <p className="font-display text-2xl text-[var(--cognac)]">
                PKR {product.price.toLocaleString()}
              </p>
              <span className="h-px flex-1 bg-gradient-to-r from-[var(--gold)] via-[var(--line)] to-transparent" />
              <span className="text-[0.65rem] uppercase tracking-luxe text-[var(--muted)]">
                Made to order
              </span>
            </div>

            <p className="text-[var(--muted)] leading-relaxed mb-12 whitespace-pre-line text-[15px]">
              {product.description}
            </p>

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand"
            >
              Order on WhatsApp
            </a>

            <div className="mt-12 pt-8 border-t border-[var(--line)] grid grid-cols-2 gap-6 text-xs uppercase tracking-luxe text-[var(--muted)]">
              <div>
                <p className="text-[var(--ink)] font-medium mb-1">Making time</p>
                <p>5–10 working days</p>
              </div>
              <div>
                <p className="text-[var(--ink)] font-medium mb-1">Made in</p>
                <p>Pakistan</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
