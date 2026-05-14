import { WHATSAPP_NUMBER, whatsappLink } from "@/lib/whatsapp";
import Reveal from "@/components/Reveal";
import {
  SITE_URL,
  breadcrumbsJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Aura Manufacturers — Lahore Hand Bag Workshop",
  description:
    "Contact Aura Manufacturers for ladies bags, wholesale enquiries, and custom designs. WhatsApp our Lahore workshop directly for prices and timelines.",
  keywords: [
    "ladies bag manufacturers in Lahore",
    "ladies bags wholesale in Pakistan",
    "hand bags manufacturers in Lahore",
  ],
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const directLink = whatsappLink("Hi Aura Manufacturers, I'd like to know more.");
  const crumbs = breadcrumbsJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);
  const contactPage = webPageJsonLd({
    type: "ContactPage",
    url: `${SITE_URL}/contact`,
    name: "Contact Aura Manufacturers — Lahore Hand Bag Workshop",
    description:
      "Contact Aura Manufacturers in Lahore. WhatsApp +92 325 8828885 for retail orders, custom bags, wholesale and OEM enquiries.",
    breadcrumb: crumbs,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <section className="section-cream relative overflow-hidden">
        <div className="blob blob-gold blob-drift-slow w-[24rem] h-[24rem] -right-20 -top-16 opacity-35" />
        <div className="blob blob-camel w-[18rem] h-[18rem] -left-16 top-24 opacity-25" />

        <div className="relative mx-auto max-w-4xl px-6 lg:px-10 pt-24 pb-12">
          <Reveal>
            <p className="eyebrow mb-5">Get in touch</p>
            <h1 className="font-display text-5xl md:text-6xl text-[var(--ink)] mb-5">
              Contact <span className="italic text-[var(--cognac)]">us</span>.
            </h1>
            <p className="text-[var(--muted)] text-lg max-w-xl">
              The fastest way to reach us is WhatsApp — most replies within the hour
              during open hours.
            </p>
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

        <div className="relative mx-auto max-w-3xl px-6 lg:px-10 py-20">
          <Reveal>
            <div className="bg-[var(--cream)] border border-[var(--line)] p-10 grid gap-10 sm:grid-cols-2 relative overflow-hidden transition-all duration-500 ease-out-soft hover:shadow-[0_24px_60px_-32px_rgba(26,20,16,0.35)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--beige)] border border-[var(--line)] text-[var(--camel)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </span>
                  <p className="eyebrow">WhatsApp</p>
                </div>
                <a
                  href={directLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-2xl text-[var(--ink)] hover:text-[var(--camel)] transition-colors duration-400 ease-out-soft"
                >
                  +92 325 8828885
                </a>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--beige)] border border-[var(--line)] text-[var(--camel)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  </span>
                  <p className="eyebrow">Hours</p>
                </div>
                <p className="font-display text-2xl text-[var(--ink)]">Mon – Sat</p>
                <p className="text-[var(--muted)] text-sm mt-1">10 AM – 8 PM PKT</p>
              </div>

              <div className="sm:col-span-2 pt-6 border-t border-[var(--line)]">
                <a
                  href={directLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brand w-full sm:w-auto"
                >
                  Message us on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          <p className="text-[0.7rem] uppercase tracking-luxe text-[var(--muted)] mt-6">
            Number used in links · {WHATSAPP_NUMBER}
          </p>
        </div>
      </section>
    </>
  );
}
