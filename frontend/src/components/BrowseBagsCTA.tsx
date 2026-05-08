"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Reveal from "./Reveal";

/** Routes where this global CTA is *not* rendered. */
const SUPPRESS_PATHS = [
  "/",          // homepage already has a dedicated "View Bags" CTA
  "/products",  // user is already on the bags page
];

function isSuppressed(pathname: string | null): boolean {
  if (!pathname) return false;
  if (SUPPRESS_PATHS.includes(pathname)) return true;
  // also skip individual product detail pages
  if (pathname.startsWith("/products/")) return true;
  return false;
}

export default function BrowseBagsCTA() {
  const pathname = usePathname();
  if (isSuppressed(pathname)) return null;

  return (
    <section
      aria-labelledby="browse-bags-global-heading"
      className="section-cream relative overflow-hidden border-t border-[var(--line)]"
    >
      <div className="blob blob-camel w-[20rem] h-[20rem] -right-16 -top-12 opacity-25 pointer-events-none" />
      <div className="blob blob-gold w-[18rem] h-[18rem] -left-12 bottom-0 opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 text-center">
        <Reveal>
          <p className="eyebrow mb-4">Our Collection</p>
          <h2
            id="browse-bags-global-heading"
            className="font-display text-3xl md:text-5xl text-[var(--ink)] mb-6 leading-[1.1]"
          >
            Browse our latest{" "}
            <span className="italic text-[var(--cognac)]">hand bags</span>
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto leading-relaxed mb-10 text-[15px]">
            Totes, clutches, crossbody styles and more — built piece by piece in our
            Lahore workshop and shipped across Pakistan.
          </p>
          <Link
            href="/products"
            prefetch
            aria-label="Browse all hand bags by Aura Manufacturers"
            className="btn-brand inline-flex items-center gap-2"
          >
            Browse Bags
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
  );
}
