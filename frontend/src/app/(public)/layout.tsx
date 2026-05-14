import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrowseBagsCTA from "@/components/BrowseBagsCTA";
import { siteGraphJsonLd } from "@/lib/seo";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraphJsonLd()) }}
      />
      <Navbar />
      <main id="main" className="min-h-screen">{children}</main>
      <BrowseBagsCTA />
      <Footer />
    </>
  );
}
