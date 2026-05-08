import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrowseBagsCTA from "@/components/BrowseBagsCTA";
import { ORG_JSON_LD, WEBSITE_JSON_LD } from "@/lib/seo";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
      />
      <Navbar />
      <main id="main" className="min-h-screen">{children}</main>
      <BrowseBagsCTA />
      <Footer />
    </>
  );
}
