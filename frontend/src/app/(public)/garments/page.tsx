import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { whatsappLink } from "@/lib/whatsapp";
import { SITE_URL, breadcrumbsJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Garments Stitching & Manufacturing in Lahore, Pakistan — Pants, Shirts, Trousers",
  description:
    "Aura Manufacturers stitches export-quality garments in bulk — pants, shirts, trousers, and custom designs — from our Lahore workshop. Wholesale and B2B enquiries welcome across Pakistan and abroad.",
  keywords: [
    "garments manufacturer in Pakistan",
    "garments manufacturers in Lahore",
    "shirt manufacturer Pakistan",
    "trouser manufacturer Lahore",
    "pants stitching wholesale Pakistan",
    "export quality garments Pakistan",
    "bulk garment manufacturing Lahore",
    "custom garments on demand",
    "ready-made garments Lahore",
    "garment stitching unit Pakistan",
    "men's and women's garment manufacturer",
    "wholesale clothing manufacturer Pakistan",
  ],
  alternates: { canonical: "/garments" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/garments`,
    title: "Garments Stitching & Manufacturing — Aura Manufacturers, Lahore",
    description:
      "Bulk garment stitching and export manufacturing from Lahore — pants, shirts, trousers, and custom designs.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Garment stitching workshop in Lahore, Pakistan — Aura Manufacturers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garments Stitching & Manufacturing — Aura Manufacturers, Lahore",
    description:
      "Pants, shirts, trousers, and custom garments — stitched in Lahore for export and wholesale.",
    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

const SERVICES = [
  {
    n: "01",
    name: "Pants",
    summary:
      "Casual, formal, and uniform pants stitched on industrial lockstitch lines with reinforced inseams, double-needle waistbands, and consistent sizing across runs.",
    image: {
      src: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
      alt: "Folded export-quality pants ready for shipment from a Lahore garment manufacturing unit",
    },
  },
  {
    n: "02",
    name: "Shirts",
    summary:
      "Men's and women's shirts in cotton, linen, oxford, and poly-cotton blends. Pattern-matched yokes, sharp collars, and bartack-reinforced stress points on every piece.",
    image: {
      src: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
      alt: "Stack of finished cotton shirts on a stitching table — Aura Manufacturers garment workshop, Pakistan",
    },
  },
  {
    n: "03",
    name: "Trousers",
    summary:
      "Formal and chino trousers cut on graded patterns. Hem allowance, side-pocket bagging, and zipper hardware specified in writing before any production starts.",
    image: {
      src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
      alt: "Tailored trousers on a workbench inside a Lahore garment manufacturing unit",
    },
  },
  {
    n: "04",
    name: "Custom Garments",
    summary:
      "Send tech packs, sketches, or sample garments. We translate them into patterns, sample, and run production to your spec — fabric, trims, labels, and packaging included.",
    image: {
      src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80",
      alt: "Custom garment pattern cutting on fabric — bulk manufacturing in Lahore, Pakistan",
    },
  },
];

const CAPABILITIES = [
  { k: "MOQ per design",   v: "from 100 pieces" },
  { k: "Lead time",        v: "18–35 working days" },
  { k: "Fabric sourcing",  v: "Faisalabad · Lahore · imported" },
  { k: "Stitching lines",  v: "Lockstitch · overlock · flatlock · bartack" },
  { k: "QC stage",         v: "AQL 2.5 inline + 100% final inspection" },
  { k: "Export packing",   v: "Polybag · hangtag · barcoded master cartons" },
];

const PROCESS = [
  {
    step: "01",
    title: "Brief & costing",
    body:
      "Share fabric specs, target unit cost, quantities, and any tech pack or sample. We come back with a written PI inside 48 hours.",
  },
  {
    step: "02",
    title: "Sample & approval",
    body:
      "Your size set or fit sample is stitched on the same line that will run production. Approve fit, fabric, and finish in writing before bulk.",
  },
  {
    step: "03",
    title: "Bulk production",
    body:
      "Cut, fuse, stitch, finish, and press on dedicated lines. Daily output reports and inline AQL inspections keep deviations visible early.",
  },
  {
    step: "04",
    title: "QC & export",
    body:
      "100% final inspection, packing per your spec, and forwarder-ready cartons. We coordinate with your CHA on documentation if you're exporting.",
  },
];

const ARTICLES = [
  {
    h: "Why Lahore is a quiet hub for export garment manufacturing",
    p: "Lahore sits at the centre of Pakistan's textile belt. Faisalabad, an hour west, weaves and dyes some of the most cost-competitive cotton in Asia. The result is a city where small-to-mid garment manufacturing units can source fabric, trims, and labelling within a 90-minute radius — turning around a 2,000-piece export order in three to four weeks without compromising stitch quality. For buyers used to Vietnam or Türkiye lead times, that velocity is genuinely useful.",
  },
  {
    h: "Pants, shirts, trousers — what changes between bulk runs",
    p: "Pants and trousers share base operations but diverge at waistbanding and pocket bagging — pants typically use elastic or curtain waistbands while formal trousers run a clean curtain with side-adjuster tabs. Shirts demand pattern-matched yokes and tighter SPI (stitches per inch) on collar and cuff topstitching. A garment manufacturer in Pakistan worth working with will price each line item separately rather than offering one blanket per-piece rate, because the labour content really is different.",
  },
  {
    h: "How export-quality QC actually works on a Pakistani line",
    p: "AQL 2.5 is the practical industry baseline for general bulk garment stitching. That means in a 1,250-piece carton, no more than 7 major and 14 minor defects pass. In our workshop a floor supervisor pulls samples every two hours during a run, a separate QC team does a 100% final inspection (zippers, buttons, pressing, threads), and a pre-shipment audit happens before cartons are sealed. If you're a first-time buyer importing wholesale clothing from Pakistan, ask to see the AQL forms before you pay the balance.",
  },
];

export default function GarmentsPage() {
  const inquiry = whatsappLink(
    "Hi Aura Manufacturers, I'd like to discuss garments stitching/manufacturing — pants/shirts/trousers/custom. Quantity and target lead time:"
  );

  // ---------- Structured data ----------
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/garments#service`,
    name: "Garments Stitching & Manufacturing",
    serviceType: "Garment manufacturing",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "City", name: "Lahore" },
      { "@type": "Place", name: "Export markets — UAE, UK, USA, EU" },
    ],
    description:
      "Export-quality bulk garment manufacturing — pants, shirts, trousers, and custom apparel — from a Lahore workshop. MOQs from 100 pieces.",
    offers: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: `${s.name} stitching & manufacturing` },
    })),
  };
  const breadcrumbs = breadcrumbsJsonLd([
    { name: "Home",     path: "/" },
    { name: "Garments", path: "/garments" },
  ]);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you manufacture garments for export?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We stitch export-quality pants, shirts, trousers, and custom garments in bulk from our Lahore workshop, with AQL 2.5 inline plus 100% final inspection and forwarder-ready packing.",
        },
      },
      {
        "@type": "Question",
        name: "What is your MOQ for bulk garment stitching?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Our standard minimum order quantity is 100 pieces per design. Lower volumes are accepted as paid sampling runs, deductible from a follow-up bulk order.",
        },
      },
      {
        "@type": "Question",
        name: "How fast can you turn around a bulk order?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Standard lead time is 18–35 working days from sample approval, depending on quantity, fabric availability, and finish complexity.",
        },
      },
      {
        "@type": "Question",
        name: "Can you stitch custom garments from a tech pack?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We accept tech packs, sketches, or physical samples, build patterns in-house, and produce sample garments before approving any bulk production.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section className="section-cream relative overflow-hidden" aria-labelledby="garments-hero">
        <div className="blob blob-gold blob-drift-slow w-[28rem] h-[28rem] -right-32 -top-20 opacity-40" />
        <div className="blob blob-camel blob-drift w-[22rem] h-[22rem] -left-24 bottom-0 opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-16 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-5 text-[0.65rem] uppercase tracking-luxe text-[var(--muted)]">
              <Link href="/" className="hover:text-[var(--camel)]">Home</Link>
              {" · "}
              <span className="text-[var(--ink)]">Garments</span>
            </nav>
            <p className="eyebrow mb-5">Beyond Bags</p>
            <h1 id="garments-hero" className="font-display text-5xl md:text-6xl text-[var(--ink)] leading-[1.05] mb-6">
              Garments Stitching <br />
              <span className="italic text-[var(--cognac)]">&amp; Manufacturing</span>
            </h1>
            <p className="text-[var(--muted)] text-lg leading-relaxed max-w-xl mb-8">
              Export-quality bulk stitching from our Lahore workshop. Pants, shirts,
              trousers, and custom garments — produced on dedicated lines, finished to
              AQL 2.5 standard, and packed for forwarder pickup.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={inquiry} target="_blank" rel="noopener noreferrer" className="btn-brand">
                Start an Enquiry
              </a>
              <Link href="/products" className="btn-outline">
                See Our Bag Range
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-3">
              <span className="block h-px w-16 bg-[var(--gold)]" />
              <span className="text-[0.65rem] uppercase tracking-luxe text-[var(--muted)]">
                Lahore · Pakistan · Wholesale &amp; export
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-[4/5] border border-[var(--line)] overflow-hidden bg-[var(--beige)] shadow-[0_24px_50px_-32px_rgba(26,20,16,0.4)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1100&q=80"
                alt="Industrial sewing machine stitching export-quality garments in a Lahore manufacturing workshop"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[0.6rem] uppercase tracking-luxe text-[var(--cream)]">
                <span className="bg-[var(--ink)]/70 backdrop-blur px-2 py-1 border border-[var(--cream)]/20">N° 02</span>
                <span className="bg-[var(--ink)]/70 backdrop-blur px-2 py-1 border border-[var(--cream)]/20">Stitching Floor</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="divider-gold py-4">
          <span className="dot" />
        </div>
      </div>

      {/* SERVICES GRID */}
      <section className="section-beige section-decor relative overflow-hidden" aria-labelledby="services-heading">
        <div className="blob blob-cognac w-[24rem] h-[24rem] -left-32 bottom-0 opacity-40" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <p className="eyebrow mb-4">Production Lines</p>
                <h2 id="services-heading" className="font-display text-4xl md:text-5xl text-[var(--ink)] max-w-xl">
                  What we stitch <span className="italic">in bulk.</span>
                </h2>
              </div>
              <p className="text-[var(--muted)] max-w-sm">
                Four core lines, each costed and quoted separately. One workshop, one
                point of contact from sample to dispatch.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.name} delay={i * 90}>
                <article className="card-luxe h-full">
                  <div className="aspect-[4/5] -mx-6 -mt-6 mb-6 overflow-hidden border-b border-[var(--line)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.image.src}
                      alt={s.image.alt}
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-[800ms] ease-out-soft hover:scale-[1.04]"
                    />
                  </div>
                  <p className="font-display text-3xl text-[var(--camel)] mb-4">{s.n}</p>
                  <h3 className="font-display text-2xl mb-3 text-[var(--ink)]">{s.name}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{s.summary}</p>
                  <span className="block mt-6 h-px w-10 bg-[var(--gold)]" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITY TABLE */}
      <section className="section-cream relative overflow-hidden" aria-labelledby="capability-heading">
        <div className="blob blob-gold w-[20rem] h-[20rem] -right-12 -top-12 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24 grid md:grid-cols-[1fr_1.4fr] gap-16">
          <Reveal>
            <p className="eyebrow mb-4">Workshop Spec</p>
            <h2 id="capability-heading" className="font-display text-4xl md:text-5xl text-[var(--ink)] mb-6 leading-[1.1]">
              The numbers behind <span className="italic">every bulk run.</span>
            </h2>
            <p className="text-[var(--muted)] leading-relaxed mb-6">
              Honest specs published up front, not pulled from a sales deck. If a
              constraint will affect your order timeline or unit cost, you&rsquo;ll know
              before any deposit moves.
            </p>
            <Link href="/about" className="link-gold text-sm uppercase tracking-luxe">
              About our workshop →
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <dl className="border border-[var(--line)] divide-y divide-[var(--line)] bg-[var(--beige)]">
              {CAPABILITIES.map((c) => (
                <div key={c.k} className="grid grid-cols-[1fr_1.4fr] gap-6 px-6 py-5">
                  <dt className="text-[0.65rem] uppercase tracking-luxe text-[var(--muted)] self-center">{c.k}</dt>
                  <dd className="text-[var(--ink)] font-medium text-[15px]">{c.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="divider-gold py-4">
          <span className="dot" />
        </div>
      </div>

      {/* PROCESS */}
      <section className="section-beige section-decor relative overflow-hidden" aria-labelledby="process-heading">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24">
          <Reveal>
            <p className="eyebrow mb-4">Production Process</p>
            <h2 id="process-heading" className="font-display text-4xl md:text-5xl text-[var(--ink)] mb-14 max-w-2xl leading-[1.1]">
              From brief to forwarder-ready <span className="italic">cartons.</span>
            </h2>
          </Reveal>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 90}>
                <li className="card-luxe h-full list-none">
                  <p className="font-display text-3xl text-[var(--camel)] mb-4">{p.step}</p>
                  <h3 className="font-display text-xl mb-3 text-[var(--ink)]">{p.title}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{p.body}</p>
                  <span className="block mt-6 h-px w-10 bg-[var(--gold)]" />
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* INFORMATIONAL / SEO ARTICLES */}
      <section className="section-cream relative overflow-hidden" aria-labelledby="insights-heading">
        <div className="relative mx-auto max-w-3xl px-6 lg:px-10 py-24">
          <Reveal>
            <p className="eyebrow mb-4">Field Notes</p>
            <h2 id="insights-heading" className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-12 leading-[1.15]">
              On bulk garment stitching <span className="italic">in Pakistan.</span>
            </h2>
          </Reveal>
          <div className="space-y-12">
            {ARTICLES.map((a, i) => (
              <Reveal key={a.h} delay={i * 80}>
                <article>
                  <h3 className="font-display text-xl md:text-2xl text-[var(--ink)] mb-4 leading-snug">
                    {a.h}
                  </h3>
                  <p className="text-[var(--ink)]/85 text-[15.5px] leading-relaxed">{a.p}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className="mt-14 pt-10 border-t border-[var(--line)] text-sm text-[var(--muted)]">
              Looking for accessories alongside garments? Browse our{" "}
              <Link href="/products" className="link-gold">hand bag range</Link>
              {" "}or commission a{" "}
              <Link href="/custom-bags" className="link-gold">custom bag</Link>{" "}— produced
              by the same Aura workshop in Lahore.
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-cream relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="blob blob-gold w-[24rem] h-[24rem] -right-20 -top-20 opacity-40" />
        <div className="blob blob-cognac w-[20rem] h-[20rem] -left-16 bottom-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pb-24">
          <Reveal>
            <div className="relative border border-[var(--line)] bg-gradient-to-br from-[var(--ink)] via-[var(--cognac)] to-[var(--ink)] text-[var(--cream)] p-12 md:p-20 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(201,169,97,0.22),transparent_55%)] pointer-events-none" />
              <div className="absolute inset-0 pattern-cross opacity-40 pointer-events-none" />

              <div className="relative">
                <p className="text-[0.7rem] uppercase tracking-luxe text-[var(--gold)] mb-6">
                  Bulk Enquiry
                </p>
                <h2 id="cta-heading" className="font-display text-4xl md:text-5xl leading-[1.1] text-balance">
                  Have a tech pack <br />
                  <span className="italic text-[var(--gold)]">or a sample?</span>
                </h2>
                <p className="mt-6 text-[var(--cream)]/70 max-w-md">
                  Send what you have — we&rsquo;ll quote material, unit cost, and lead time
                  inside 48 hours. No middlemen.
                </p>
              </div>
              <div className="relative md:text-right space-y-3">
                <a
                  href={inquiry}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[var(--cream)] text-[var(--ink)] px-8 py-4 text-sm uppercase tracking-luxe font-medium border border-[var(--cream)] transition-colors duration-400 ease-out-soft hover:bg-[var(--gold)] hover:border-[var(--gold)] hover:text-[var(--ink)]"
                >
                  WhatsApp Enquiry
                </a>
                <div className="block md:text-right">
                  <Link
                    href="/contact"
                    className="inline-block text-[0.7rem] uppercase tracking-luxe text-[var(--cream)]/70 hover:text-[var(--gold)] transition-colors"
                  >
                    Or use the contact form →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
