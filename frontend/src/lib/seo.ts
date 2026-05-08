export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://aura-manufacturers.com";

export const SITE_NAME = "Aura Manufacturers";

export const SITE_DESCRIPTION =
  "Aura Manufacturers is a Lahore-based ladies bag manufacturer crafting handbags, clutches, totes, and custom designs for women across Pakistan. Made-to-order workshop, wholesale enquiries welcome.";

export const SITE_KEYWORDS = [
  "ladies bag manufacturers",
  "ladies bag manufacturers in Lahore",
  "ladies bag manufacturers in Pakistan",
  "top ladies bag manufacturers",
  "ladies bags wholesale in Pakistan",
  "hand bags for girls",
  "hand bags for women",
  "hand bags in Pakistan",
  "hand bags in Lahore",
  "hand bags images",
  "hand bags manufacturers in Lahore",
  "designer handbags manufacturer",
];

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "en-PK",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export function breadcrumbsJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.path.startsWith("http") ? it.path : `${SITE_URL}${it.path}`,
    })),
  };
}

export const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Aura Bags Lahore",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: "+92 325 8828885",
  image: `${SITE_URL}/icon.svg`,
  logo: `${SITE_URL}/icon.svg`,
  priceRange: "PKR",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  areaServed: [
    { "@type": "Country", name: "Pakistan" },
    { "@type": "City", name: "Lahore" },
    { "@type": "City", name: "Karachi" },
    { "@type": "City", name: "Islamabad" },
  ],
  sameAs: ["https://wa.me/923258828885"],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Product",
      name: "Handmade ladies bags, clutches, totes, and custom handbags",
    },
  },
};
