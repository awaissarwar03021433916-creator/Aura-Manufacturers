import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Hand Bags for Women — Made-to-Order in Lahore",
  description:
    "Design a custom hand bag with Aura Manufacturers in Lahore. Upload a sample image, message us on WhatsApp, and we'll quote materials, price, and timeline for your bag.",
  keywords: [
    "designer handbags manufacturer",
    "ladies bag manufacturers in Lahore",
    "hand bags for women",
    "hand bags for girls",
    "hand bags in Pakistan",
  ],
  alternates: { canonical: "/custom-bags" },
  openGraph: {
    title: "Custom Hand Bags — Aura Manufacturers, Lahore",
    description:
      "Send us a sample image and we'll build the bag — fabric, hardware, and finish chosen with you. WhatsApp-based ordering across Pakistan.",
    type: "website",
  },
};

export default function CustomBagsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
