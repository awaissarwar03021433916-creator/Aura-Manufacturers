import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import Reveal from "@/components/Reveal";
import { SITE_URL, faqJsonLd, webPageJsonLd, breadcrumbsJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ladies Bag Manufacturers in Lahore, Pakistan — Aura Manufacturers",
  description:
    "Aura Manufacturers crafts ladies bags, hand bags for women, and custom designs from a Lahore workshop. Wholesale and retail enquiries welcome across Pakistan.",
  alternates: { canonical: "/" },
};

const HOME_FAQ = [
  {
    q: "Where is Aura Manufacturers located?",
    a: "Aura Manufacturers is a ladies bag workshop in Lahore, Pakistan — Mehar Fayyaz Colony, Salamat pura Road, Fateh Garh, Lahore 54840. We ship across Pakistan and accept export enquiries.",
  },
  {
    q: "Do you manufacture custom ladies bags?",
    a: "Yes. Send us a reference image on WhatsApp (+92 325 8828885) and we'll quote fabric, hardware, price, and timeline. Custom orders are stitched in our own workshop, not outsourced.",
  },
  {
    q: "What is the typical lead time for a hand bag?",
    a: "Stock-style bags are made-to-order in 5–10 working days. Custom designs typically take 10–18 working days depending on materials and finish.",
  },
  {
    q: "Do you accept wholesale or OEM orders?",
    a: "Yes. We accept wholesale orders from 12 pieces and OEM/private-label production from 100 pieces per design. WhatsApp us with your tech pack or sample for a written PI.",
  },
  {
    q: "How do I place an order?",
    a: "All orders are confirmed on WhatsApp. Browse our products, click 'Order on WhatsApp', and our shop will reply with availability, price, and dispatch timing.",
  },
];

export default function HomePage() {
  const webpage = webPageJsonLd({
    type: "WebPage",
    url: `${SITE_URL}/`,
    name: "Ladies Bag Manufacturers in Lahore, Pakistan",
    description:
      "Aura Manufacturers — handmade ladies bags, handbags, clutches, totes, and OEM/wholesale bag manufacturing from a Lahore, Pakistan workshop.",
    breadcrumb: breadcrumbsJsonLd([{ name: "Home", path: "/" }]),
  });
  const faq = faqJsonLd(HOME_FAQ);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <HeroSection />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="divider-gold py-6">
          <span className="dot" />
        </div>
      </div>

      {/* WHY AURA */}
      <section className="section-beige section-decor relative overflow-hidden">
        <div className="blob blob-gold blob-drift-slow w-[28rem] h-[28rem] -left-32 -top-24" />
        <div className="blob blob-camel blob-drift w-[22rem] h-[22rem] -right-24 bottom-0 opacity-40" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <p className="eyebrow mb-4">Why Us</p>
                <h2 className="font-display text-4xl md:text-5xl text-[var(--ink)] max-w-xl">
                  Quietly considered. <span className="italic">Quietly made.</span>
                </h2>
              </div>
              <p className="text-[var(--muted)] max-w-sm">
                Three rules guide every bag that leaves our shop — from leather
                choice to the final stitch.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                t: "Made-to-order",
                d: "Every bag built when you order. Never mass-stocked, never rushed.",
              },
              {
                n: "02",
                t: "Custom designs",
                d: "Send a sample image — we draw it, fix it, and make it real.",
              },
              {
                n: "03",
                t: "Direct from the maker",
                d: "No middlemen. Talk to our shop directly on WhatsApp.",
              },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 120}>
                <div className="card-luxe h-full">
                  <p className="font-display text-3xl text-[var(--camel)] mb-6">{f.n}</p>
                  <h3 className="font-display text-2xl mb-3 text-[var(--ink)]">{f.t}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{f.d}</p>
                  <span className="block mt-6 h-px w-10 bg-[var(--gold)]" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="divider-gold py-6">
          <span className="dot" />
        </div>
      </div>

      {/* CTA */}
      <section className="section-cream relative overflow-hidden">
        <div className="blob blob-gold w-[24rem] h-[24rem] -right-20 -top-20 opacity-40" />
        <div className="blob blob-cognac w-[20rem] h-[20rem] -left-16 bottom-0 opacity-50" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24">
          <Reveal>
            <div className="relative border border-[var(--line)] bg-gradient-to-br from-[var(--ink)] via-[var(--cognac)] to-[var(--ink)] text-[var(--cream)] p-12 md:p-20 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(201,169,97,0.22),transparent_55%)] pointer-events-none" />
              <div className="absolute inset-0 pattern-cross opacity-40 pointer-events-none" />

              <div className="relative">
                <p className="text-[0.7rem] uppercase tracking-luxe text-[var(--gold)] mb-6">
                  Custom Bags
                </p>
                <h2 className="font-display text-4xl md:text-5xl leading-[1.1] text-balance">
                  Have a design in mind?
                  <br />
                  <span className="italic text-[var(--gold)]">We&rsquo;ll make it.</span>
                </h2>
                <p className="mt-6 text-[var(--cream)]/70 max-w-md">
                  Upload a sample image — we&rsquo;ll share the price, fabric, and timeline
                  on WhatsApp.
                </p>
              </div>
              <div className="relative md:text-right">
                <Link
                  href="/custom-bags"
                  className="inline-flex items-center justify-center bg-[var(--cream)] text-[var(--ink)] px-8 py-4 text-sm uppercase tracking-luxe font-medium border border-[var(--cream)] transition-colors duration-400 ease-out-soft hover:bg-[var(--gold)] hover:border-[var(--gold)] hover:text-[var(--ink)]"
                >
                  Start Custom Order
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VIEW BAGS — secondary CTA */}
      <section
        aria-labelledby="view-bags-heading"
        className="section-cream relative overflow-hidden"
      >
        <div className="blob blob-camel w-[20rem] h-[20rem] -right-16 -top-12 opacity-25" />
        <div className="blob blob-gold w-[18rem] h-[18rem] -left-12 bottom-0 opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 text-center">
          <Reveal>
            <p className="eyebrow mb-4">Our Collection</p>
            <h2
              id="view-bags-heading"
              className="font-display text-4xl md:text-5xl text-[var(--ink)] mb-6"
            >
              Browse our latest <span className="italic text-[var(--cognac)]">hand bags</span>
            </h2>
            <p className="text-[var(--muted)] max-w-xl mx-auto leading-relaxed mb-10">
              Totes, clutches, crossbody styles and more — built piece by piece in our
              Lahore workshop and shipped across Pakistan.
            </p>
            <Link
              href="/products"
              prefetch
              aria-label="View all hand bags by Aura Manufacturers"
              className="btn-brand inline-flex items-center gap-2"
            >
              View Bags
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
