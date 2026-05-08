"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Bags" },
  { href: "/garments", label: "Garments" },
  { href: "/custom-bags", label: "Custom" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/timing", label: "Hours" },
  { href: "/location", label: "Visit" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + escape-to-close while drawer open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 w-full overflow-x-clip transition-all duration-400 ease-out-soft
        bg-[#1A1410] border-b ${scrolled ? "border-[#2E251D] shadow-[0_1px_0_0_rgba(201,169,97,0.18)]" : "border-transparent"}`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto max-w-7xl grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 sm:gap-6 lg:gap-10 px-6 lg:px-10 transition-all duration-400 ease-out-soft
          ${scrolled ? "py-3" : "py-4"}`}
      >
        {/* Brand */}
        <Link
          href="/"
          className="font-display text-2xl tracking-tight text-[#FAF7F2] flex items-baseline gap-2 shrink-0"
        >
          <span>
            Aura<span className="text-[#C9A961]">.</span>
          </span>
          <span className="hidden sm:inline text-[0.65rem] uppercase tracking-luxe text-[#C9A961]/80 font-sans">
            Manufacturers
          </span>
        </Link>

        {/* Primary nav (desktop) — bumped to lg breakpoint so md tablets get the
            drawer instead of trying to squeeze 9 links into ~768px.
            Sizes use clamp() so the row scales fluidly between 1024 and 1440px,
            keeping spacing balanced even if Inter's web font hasn't loaded yet
            and a slightly wider fallback is rendering. */}
        <ul className="hidden lg:flex items-center justify-center min-w-0 flex-nowrap [gap:clamp(0.85rem,1.4vw,2rem)] uppercase tracking-luxe text-[#FAF7F2]/70 [font-size:clamp(0.68rem,0.78vw,0.78rem)]">
          {links.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <li key={l.href} className="shrink-0">
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative inline-block whitespace-nowrap py-1 transition-colors duration-400 ease-out-soft
                    ${active ? "text-[#FAF7F2]" : "hover:text-[#C9A961]"}`}
                >
                  {l.label}
                  <span
                    className={`absolute left-0 right-0 -bottom-0.5 h-px bg-[#C9A961] origin-center transition-transform duration-450 ease-out-soft
                      ${active ? "scale-x-100" : "scale-x-0"}`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2 sm:gap-3 justify-self-end shrink-0">
          <ThemeToggle />
          <Link
            href="/admin"
            prefetch={false}
            aria-label="Admin dashboard"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-[0.7rem] uppercase tracking-luxe font-medium text-[#FAF7F2]/70 border border-[#2E251D] whitespace-nowrap transition-all duration-400 ease-out-soft hover:text-[#C9A961] hover:border-[#C9A961] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1410]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Admin
          </Link>
          <Link
            href="/custom-bags"
            className="hidden sm:inline-flex items-center gap-2 bg-[#C9A961] text-[#1A1410] px-4 lg:px-5 py-2.5 text-[0.7rem] uppercase tracking-luxe font-medium border border-[#C9A961] whitespace-nowrap transition-all duration-400 ease-out-soft hover:bg-[#FAF7F2] hover:border-[#FAF7F2] hover:shadow-[0_10px_30px_-12px_rgba(201,169,97,0.45)]"
          >
            Custom Order
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center border border-[#2E251D] bg-transparent text-[#FAF7F2]/80 transition-all duration-400 ease-out-soft hover:border-[#C9A961] hover:text-[#C9A961] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1410]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 6h18" />
              <path d="M3 12h18" />
              <path d="M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-400 ease-out-soft
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <aside
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={`absolute top-0 right-0 h-full w-[86%] max-w-sm bg-[#1A1410] border-l border-[#2E251D] shadow-[0_0_60px_-10px_rgba(0,0,0,0.6)] flex flex-col transition-transform duration-400 ease-out-soft
            ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#2E251D]">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="font-display text-xl tracking-tight text-[#FAF7F2] flex items-baseline gap-2"
            >
              <span>
                Aura<span className="text-[#C9A961]">.</span>
              </span>
              <span className="text-[0.6rem] uppercase tracking-luxe text-[#C9A961]/80 font-sans">
                Manufacturers
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center border border-[#2E251D] bg-transparent text-[#FAF7F2]/80 transition-all duration-400 ease-out-soft hover:border-[#C9A961] hover:text-[#C9A961] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1410]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <ul className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1 text-[0.85rem] uppercase tracking-luxe text-[#FAF7F2]/80">
            {links.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center justify-between py-3 border-b border-[#2E251D]/60 transition-colors duration-400 ease-out-soft
                      ${active ? "text-[#C9A961]" : "hover:text-[#C9A961]"}`}
                  >
                    <span>{l.label}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={`transition-transform duration-400 ease-out-soft
                        ${active ? "translate-x-0 text-[#C9A961]" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}
                    >
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="px-6 py-5 border-t border-[#2E251D]">
            <Link
              href="/custom-bags"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#C9A961] text-[#1A1410] px-5 py-3 text-[0.72rem] uppercase tracking-luxe font-medium border border-[#C9A961] transition-all duration-400 ease-out-soft hover:bg-[#FAF7F2] hover:border-[#FAF7F2]"
            >
              Custom Order
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
