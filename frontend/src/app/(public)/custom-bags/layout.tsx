import type { Metadata } from "next";
import {
  SITE_URL,
  ORG_ID,
  breadcrumbsJsonLd,
  howToJsonLd,
  webPageJsonLd,
  faqJsonLd,
} from "@/lib/seo";

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

const CUSTOM_FAQ = [
  {
    q: "How does a custom bag order work?",
    a: "Upload a reference image on our Custom Bags page. We continue on WhatsApp with fabric and hardware options, quote price + lead time, and start production after a 50% advance.",
  },
  {
    q: "How long does a custom bag take?",
    a: "Typical lead time is 10–18 working days from sample approval, depending on materials, hardware sourcing, and finish complexity.",
  },
  {
    q: "Can I supply my own fabric or leather?",
    a: "Yes. Send us the material spec or ship a swatch to our Lahore workshop. We'll confirm consumption (yardage) and adjust the unit cost accordingly.",
  },
];

const crumbs = breadcrumbsJsonLd([
  { name: "Home", path: "/" },
  { name: "Custom Bags", path: "/custom-bags" },
]);

const webpage = webPageJsonLd({
  type: "WebPage",
  url: `${SITE_URL}/custom-bags`,
  name: "Custom Hand Bags — Made-to-Order in Lahore",
  description:
    "Custom ladies hand bags from Aura Manufacturers, Lahore. Send a sample image, get a WhatsApp quote, and we'll stitch the bag in our workshop.",
  breadcrumb: crumbs,
});

const howTo = howToJsonLd({
  name: "How to order a custom hand bag from Aura Manufacturers",
  description:
    "Three steps to commission a one-of-one hand bag from our Lahore workshop — upload a reference, chat on WhatsApp, approve sample and pay.",
  totalTime: "PT5M",
  image: `${SITE_URL}/icon.svg`,
  steps: [
    {
      name: "Upload a reference image",
      text: "Open the Custom Bags page and upload a clear photo of the bag you want — front view preferred, under 8 MB.",
      url: `${SITE_URL}/custom-bags`,
    },
    {
      name: "Continue on WhatsApp",
      text: "After upload, tap Continue on WhatsApp. We reply with material, hardware and stitching options, plus a written price and lead time.",
      url: "https://wa.me/923258828885",
    },
    {
      name: "Approve sample, dispatch finished bag",
      text: "Pay a 50% advance, approve a digital sample drawing, and we'll stitch and dispatch your bag inside the agreed lead time.",
    },
  ],
});

const customService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/custom-bags#service`,
  name: "Custom Ladies Bag Manufacturing",
  serviceType: "Custom handbag manufacturing",
  provider: { "@id": ORG_ID },
  areaServed: [
    { "@type": "Country", name: "Pakistan" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United States" },
  ],
  description:
    "One-of-one custom ladies hand bags built to a customer reference image. Fabric, leather, hardware and lining specified in writing before production.",
  offers: {
    "@type": "Offer",
    priceCurrency: "PKR",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "PKR",
      minPrice: 2500,
      maxPrice: 25000,
    },
    availability: "https://schema.org/InStock",
  },
};

const faq = faqJsonLd(CUSTOM_FAQ);

export default function CustomBagsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(customService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      {children}
    </>
  );
}
