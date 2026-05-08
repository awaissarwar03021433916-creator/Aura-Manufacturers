import Reveal from "@/components/Reveal";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Visit Our Lahore Workshop — Aura Manufacturers",
  description:
    "Find Aura Manufacturers in Lahore. Walk-in retail and wholesale buyers welcome — meet the team building your hand bag.",
  keywords: [
    "ladies bag manufacturers in Lahore",
    "hand bags in Lahore",
    "hand bags manufacturers in Lahore",
  ],
  alternates: { canonical: "/location" },
};

export default function LocationPage() {
  return (
    <>
      <section className="section-cream relative overflow-hidden">
        <div className="blob blob-gold blob-drift-slow w-[24rem] h-[24rem] -right-20 -top-16 opacity-35" />
        <div className="blob blob-camel w-[18rem] h-[18rem] -left-16 top-32 opacity-25" />

        <div className="relative mx-auto max-w-4xl px-6 lg:px-10 pt-24 pb-12">
          <Reveal>
            <p className="eyebrow mb-5">Visit our shop</p>
            <h1 className="font-display text-5xl md:text-6xl text-[var(--ink)] mb-5">
              Find <span className="italic text-[var(--cognac)]">us.</span>
            </h1>
            <p className="text-[var(--muted)] text-lg max-w-lg">
              Our shop and pickup address.
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

        <div className="relative mx-auto max-w-4xl px-6 lg:px-10 py-20">
          <Reveal>
            <div className="bg-[var(--cream)] border border-[var(--line)] p-10 mb-8 relative overflow-hidden transition-all duration-500 ease-out-soft hover:shadow-[0_24px_60px_-32px_rgba(26,20,16,0.35)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--beige)] border border-[var(--line)] text-[var(--camel)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <p className="eyebrow">Our Shop</p>
              </div>
              <p className="font-display text-2xl text-[var(--ink)]">
                Aura Manufacturers Shop
              </p>
              <div className="mt-4 space-y-1 text-[var(--muted)]">
                <p>Mehar Fayyaz Colony, Salamat pura Road Fateh Garh,Lahore</p>
                <p>Lahore, 54840</p>
                <p>Pakistan</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="aspect-video bg-[var(--cream)] border border-[var(--line)] relative overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27199.114233872493!2d74.42030559340823!3d31.554653096190453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1777719885297!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aura Manufacturers Shop Location"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
