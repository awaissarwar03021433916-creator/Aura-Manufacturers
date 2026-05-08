import Link from "next/link";
import { WHATSAPP_NUMBER, whatsappLink } from "@/lib/whatsapp";

export default function Footer() {
  const directLink = whatsappLink("Hi Aura Manufacturers, I'd like to know more.");

  return (
    <footer className="relative mt-24 bg-[#1A1410] text-[#FAF7F2] border-t border-[#2E251D] overflow-hidden">
      {/* Top hairline gold accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A961] to-transparent" />

      {/* Subtle dot pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(201,169,97,0.35) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
      {/* Soft gold glow blob */}
      <div
        aria-hidden
        className="absolute -top-32 right-0 h-[24rem] w-[24rem] rounded-full pointer-events-none"
        style={{ background: "rgba(201,169,97,0.08)", filter: "blur(80px)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 text-sm">
        <div className="lg:col-span-1">
          <h3 className="font-display text-2xl mb-4 text-[#FAF7F2]">
            Aura<span className="text-[#C9A961]">.</span>{" "}
            <span className="text-xs uppercase tracking-[0.18em] text-[#C9A961]/80 font-sans align-middle">
              Manufacturers
            </span>
          </h3>
          <p className="text-[#FAF7F2]/65 leading-relaxed">
            Handmade ladies bags — handbags, clutches, totes, and custom designs
            made one piece at a time.
          </p>
          <span className="block mt-6 h-px w-12 bg-[#C9A961]" />
        </div>

        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[#C9A961] mb-5 font-medium">
            Explore
          </p>
          <ul className="space-y-3 text-[#FAF7F2]/85">
            <li><Link href="/products" className="transition-colors duration-400 hover:text-[#C9A961]">Bags</Link></li>
            <li><Link href="/custom-bags" className="transition-colors duration-400 hover:text-[#C9A961]">Custom</Link></li>
            <li><Link href="/about" className="transition-colors duration-400 hover:text-[#C9A961]">About</Link></li>
            <li><Link href="/contact" className="transition-colors duration-400 hover:text-[#C9A961]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[#C9A961] mb-5 font-medium">
            Reach Us
          </p>
          <ul className="space-y-3 text-[#FAF7F2]/85">
            <li>
              <span className="text-[#FAF7F2]/55">WhatsApp · </span>
              <a className="transition-colors duration-400 hover:text-[#C9A961]" href={directLink} target="_blank" rel="noopener noreferrer">
                +92 325 8828885
              </a>
            </li>
            <li><Link href="/timing" className="transition-colors duration-400 hover:text-[#C9A961]">Open Hours</Link></li>
            <li><Link href="/location" className="transition-colors duration-400 hover:text-[#C9A961]">Find Our Shop</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[#C9A961] mb-5 font-medium">
            Stay in touch
          </p>
          <p className="text-[#FAF7F2]/65 leading-relaxed mb-5">
            Have a design in mind? Send us a sample image and we&rsquo;ll keep chatting on
            WhatsApp.
          </p>
          <a
            href={directLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#C9A961] text-[#C9A961] px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] font-medium transition-all duration-400 ease-out-soft hover:bg-[#C9A961] hover:text-[#1A1410]"
          >
            Message us
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>

      <div className="relative border-t border-[#2E251D]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.7rem] uppercase tracking-[0.18em] text-[#FAF7F2]/55">
          
         <p className="text-[#FAF7F2]/40">Ladies Bags Manufacturers · Aura Edition</p>
          <p>© {new Date().getFullYear()} Aura Manufacturers · Made in Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
