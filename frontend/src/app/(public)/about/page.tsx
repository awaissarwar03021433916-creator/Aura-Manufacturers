import Reveal from "@/components/Reveal";
import {
  SITE_URL,
  breadcrumbsJsonLd,
  faqJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Aura Manufacturers — Ladies Bag Makers in Lahore",
  description:
    "Aura Manufacturers is a Lahore-based ladies bag workshop building handbags, clutches, totes, and custom designs for women across Pakistan since the early 2010s.",
  keywords: [
    "ladies bag manufacturers in Lahore",
    "ladies bag manufacturers in Pakistan",
    "top ladies bag manufacturers",
    "designer handbags manufacturer",
  ],
  alternates: { canonical: "/about" },
};

const ABOUT_FAQ = [
  {
    q: "Are bags made in-house or outsourced?",
    a: "100% in-house. Cutting, stitching, edge finishing, and final QC happen in our Lahore workshop. We do not outsource production to third-party units.",
  },
  {
    q: "What kinds of bags do you specialise in?",
    a: "Ladies handbags, clutches, totes, crossbody bags, mini bags, and structured top-handle styles. We also stitch fully custom one-of-one bags from a reference image.",
  },
  {
    q: "Do you supply to retailers outside Pakistan?",
    a: "Yes — we accept wholesale and OEM enquiries from buyers in the UAE, UK, USA, and EU. WhatsApp us with your quantities and target lead time for a written PI.",
  },
];

export default function AboutPage() {
  const crumbs = breadcrumbsJsonLd([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);
  const aboutPage = webPageJsonLd({
    type: "AboutPage",
    url: `${SITE_URL}/about`,
    name: "About Aura Manufacturers — Ladies Bag Workshop in Lahore",
    description:
      "About Aura Manufacturers — a Lahore-based ladies bag workshop. Made-to-order handbags, clutches, totes, and custom designs. Founded 2015.",
    breadcrumb: crumbs,
  });
  const faq = faqJsonLd(ABOUT_FAQ);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <section className="section-cream relative overflow-hidden">
        <div className="blob blob-gold blob-drift-slow w-[26rem] h-[26rem] -right-24 -top-20 opacity-40" />
        <div className="blob blob-camel w-[18rem] h-[18rem] -left-16 top-32 opacity-25" />

        <div className="relative mx-auto max-w-4xl px-6 lg:px-10 pt-24 pb-12">
          <Reveal>
            <p className="eyebrow mb-5">Our Story</p>
            <h1 className="font-display text-5xl md:text-6xl text-[var(--ink)] leading-tight">
              About <span className="italic text-[var(--cognac)]">Aura</span>
              <br />
              Manufacturers.
            </h1>
            <div className="mt-8 flex items-center gap-3">
              <span className="block h-px w-16 bg-[var(--gold)]" />
              <span className="text-[0.65rem] uppercase tracking-luxe text-[var(--muted)]">
                A small shop · Big care
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="divider-gold py-4">
          <span className="dot" />
        </div>
      </div>

      <section className="section-beige section-decor relative overflow-hidden">
        <div className="blob blob-cognac w-[22rem] h-[22rem] -left-24 bottom-0 opacity-35" />
        <div className="blob blob-gold w-[18rem] h-[18rem] -right-16 top-10 opacity-30" />

        <div className="relative mx-auto max-w-5xl px-6 lg:px-10 py-20">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-8 text-[var(--ink)] leading-relaxed text-lg">
                <p>
                  Aura Manufacturers is a small ladies bag shop. We design and
                  stitch every piece in-house — no outsourcing, no shortcuts.
                </p>
                <p className="text-[var(--muted)]">
                  From classic handbags and clutches to full custom designs, we focus on
                  clean stitching and the people who carry our work.
                </p>
                <p className="text-[var(--muted)]">
                  Want a bag made around your idea? Send us a sample photo on the{" "}
                  <a className="link-underline text-[var(--camel)] underline underline-offset-4" href="/custom-bags">
                    Custom Bags
                  </a>{" "}
                  page — we&rsquo;ll take it from there on WhatsApp.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=70"
                  alt="Handmade leather bag"
                  className="aspect-[3/4] w-full object-cover border border-[var(--line)]"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1605733513597-a8f8341084e6?auto=format&fit=crop&w=600&q=70"
                  alt="Stitching detail"
                  className="aspect-[3/4] w-full object-cover border border-[var(--line)] mt-8"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-16 pt-10 border-t border-[var(--line)] grid grid-cols-3 gap-6 text-center">
              {[
                { v: "100%", l: "In-house" },
                { v: "5–10", l: "Days to make" },
                { v: "1 of 1", l: "Each piece" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="relative bg-[var(--cream)] border border-[var(--line)] py-8 px-4 transition-all duration-500 ease-out-soft hover:border-[var(--camel)] hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(26,20,16,0.35)]"
                >
                  <p className="font-display text-3xl text-[var(--camel)]">{s.v}</p>
                  <p className="eyebrow mt-2">{s.l}</p>
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-px h-px w-10 bg-[var(--gold)]" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
