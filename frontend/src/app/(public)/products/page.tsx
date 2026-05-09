import Link from "next/link";
import { fetchProducts } from "@/lib/api";
import Reveal from "@/components/Reveal";
import { SITE_URL, breadcrumbsJsonLd } from "@/lib/seo";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Hand Bags for Women — Lahore-Made by Aura Manufacturers",
  description:
    "Browse hand bags for women crafted by Aura Manufacturers in Lahore — totes, clutches, crossbody styles, and made-to-order pieces shipped across Pakistan.",
  keywords: [
    "hand bags for women",
    "hand bags in Pakistan",
    "hand bags in Lahore",
    "ladies bag manufacturers in Lahore",
    "designer handbags manufacturer",
  ],
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Hand Bags for Women — Made in Lahore | Aura Manufacturers",
    description:
      "Hand bags for women, hand-built in Lahore. Browse our latest pieces or commission a custom bag for delivery anywhere in Pakistan.",
    type: "website",
  },
};

export default async function ProductsPage() {
  const products = await fetchProducts();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hand Bags for Women — Aura Manufacturers, Lahore",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: products.length,
    itemListElement: products.slice(0, 30).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/products/${p.slug}`,
      name: p.name,
      image: p.images[0],
    })),
  };
  const crumbs = breadcrumbsJsonLd([
    { name: "Home", path: "/" },
    { name: "Bags", path: "/products" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <section className="section-cream relative overflow-hidden">
        <div className="blob blob-gold blob-drift-slow w-[26rem] h-[26rem] -right-24 -top-20 opacity-40" />
        <div className="blob blob-camel w-[18rem] h-[18rem] -left-16 top-32 opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-12">
          <Reveal>
            <p className="eyebrow mb-5">Our Bags</p>
            <h1 className="font-display text-5xl md:text-6xl text-[var(--ink)] mb-4">
              Our Bags
            </h1>
            <p className="text-[var(--muted)] max-w-xl text-lg">
              Each bag is made when you order. Tap any bag to ask and chat
              with us on WhatsApp.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="block h-px w-16 bg-[var(--gold)]" />
              <span className="text-[0.65rem] uppercase tracking-luxe text-[var(--muted)]">
                {products.length > 0 ? `${products.length} bags` : "More soon"}
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
          {products.length === 0 ? (
            <Reveal>
              <div className="mx-auto max-w-xl text-center bg-[var(--cream)] border border-[var(--line)] py-20 px-10 relative overflow-hidden">
                <div className="absolute inset-0 pattern-dots opacity-60 pointer-events-none" />
                <div className="relative">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-[var(--line)] rounded-full bg-[var(--beige)]">
                    {/* Bag icon */}
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[var(--camel)]"
                    >
                      <path d="M5 8h14l-1 12H6L5 8Z" />
                      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
                    </svg>
                  </div>
                  <p className="eyebrow mb-3">Coming Soon</p>
                  <h3 className="font-display text-2xl text-[var(--ink)] mb-3">
                    New bags coming soon
                  </h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">
                    Our next set is being hand-finished. Check back soon, or message
                    us to ask about a custom bag.
                  </p>
                  <Link href="/custom-bags" className="btn-ghost">
                    Design Your Bag
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {products.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 90}>
                  <Link href={`/products/${p.slug}`} className="group block">
                    <div className="product-frame mb-5">
                      {p.images[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.images[0]}
                          alt={`${p.name} — ${p.category?.toLowerCase() ?? "ladies bag"} by Aura Manufacturers, Lahore`}
                          loading={i < 4 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[0.7rem] uppercase tracking-luxe text-[var(--muted)]">
                          Aura
                        </div>
                      )}
                      <span className="product-overlay-cta">View Product →</span>
                    </div>
                    <h3 className="font-display text-lg text-[var(--ink)] group-hover:text-[var(--camel)] transition-colors duration-400 ease-out-soft">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-xs uppercase tracking-luxe text-[var(--muted)]">
                        PKR {p.price.toLocaleString()}
                      </p>
                      <span className="block h-px flex-1 bg-[var(--line)] opacity-70 group-hover:bg-[var(--gold)] transition-colors duration-400" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
