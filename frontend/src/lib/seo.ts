// Centralised SEO + JSON-LD definitions.
// Read by app/(public)/layout.tsx (site-wide graph) and by individual
// public pages (page-specific schemas). Designed to validate cleanly
// against Google's Rich Results test, Bing's Webmaster Tools, and to
// give AI engines (ChatGPT, Gemini, Perplexity) a single canonical
// "who we are / what we sell / how to reach us" graph.

// Canonical production origin. Always no trailing slash.
// This MUST stay identical to the host that *.vercel.app traffic is
// 301-redirected to (see `redirects()` in next.config.mjs). If canonical tags,
// OG URLs and the sitemap pointed at a different host than the redirect target,
// Google would see conflicting canonical signals and the consolidation would fail.
// Override locally with NEXT_PUBLIC_SITE_URL=http://localhost:3000 in .env.local.
// Production Vercel env should set NEXT_PUBLIC_SITE_URL=https://www.auramanufacturers.com.
// If the env var is missing (e.g. on a Vercel preview that wasn't given a Production scope),
// we still fall back to the canonical production domain so canonical/OG/sitemap URLs
// never accidentally point at a *.vercel.app host.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.auramanufacturers.com";

// True only on the production Vercel deployment (or any non-Vercel build, e.g. local
// `next build && next start`). Preview and Development deployments on Vercel get
// `noindex, nofollow` so the *.vercel.app hostnames never enter Google's index.
export const INDEXABLE =
  process.env.VERCEL_ENV !== "preview" &&
  process.env.VERCEL_ENV !== "development";

export const SITE_NAME = "Aura Manufacturers";
export const SITE_LEGAL_NAME = "Aura Manufacturers";

export const SITE_DESCRIPTION =
  "Aura Manufacturers is a Lahore-based ladies bag manufacturer crafting handbags, clutches, totes, and custom designs for women across Pakistan. Made-to-order workshop, wholesale enquiries welcome.";

export const SITE_TAGLINE =
  "Ladies bag manufacturer, handbag factory and OEM bag supplier in Lahore, Pakistan.";

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
  "handbag factory Pakistan",
  "OEM bag supplier Pakistan",
];

// Contact ----------------------------------------------------------------
export const PHONE_E164 = "+923258828885";
export const PHONE_DISPLAY = "+92 325 8828885";
export const WHATSAPP_URL = "https://wa.me/923258828885";

// Address ----------------------------------------------------------------
export const ADDRESS = {
  streetAddress: "Mehar Fayyaz Colony, Salamat pura Road, Fateh Garh",
  addressLocality: "Lahore",
  addressRegion: "Punjab",
  postalCode: "54840",
  addressCountry: "PK",
} as const;

// Workshop coordinates — sourced from the Google Maps embed on /location.
export const GEO = { latitude: 31.554653, longitude: 74.420306 } as const;

// Hours used by both UI and openingHoursSpecification.
export const HOURS_SPEC: Array<{
  dayOfWeek: string;
  opens?: string;
  closes?: string;
  closed?: boolean;
}> = [
  { dayOfWeek: "Monday",    opens: "10:00", closes: "20:00" },
  { dayOfWeek: "Tuesday",   opens: "10:00", closes: "20:00" },
  { dayOfWeek: "Wednesday", opens: "10:00", closes: "20:00" },
  { dayOfWeek: "Thursday",  opens: "10:00", closes: "20:00" },
  { dayOfWeek: "Friday",    opens: "14:30", closes: "20:00" },
  { dayOfWeek: "Saturday",  opens: "10:00", closes: "20:00" },
  { dayOfWeek: "Sunday",    closed: true },
];

export const FOUNDING_DATE = "2015";

// Optional social handles. Define the env vars to publish them in
// `sameAs` — undefined values are filtered out so we never emit
// broken/placeholder URLs in production.
const SOCIAL_LINKS = [
  WHATSAPP_URL,
  process.env.NEXT_PUBLIC_FACEBOOK_URL,
  process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  process.env.NEXT_PUBLIC_TIKTOK_URL,
  process.env.NEXT_PUBLIC_YOUTUBE_URL,
  process.env.NEXT_PUBLIC_LINKEDIN_URL,
].filter((v): v is string => typeof v === "string" && v.length > 0);

// Stable @id anchors so nodes can reference each other across pages.
export const ORG_ID            = `${SITE_URL}/#organization`;
export const LOCALBUSINESS_ID  = `${SITE_URL}/#localbusiness`;
export const WEBSITE_ID        = `${SITE_URL}/#website`;
export const LOGO_ID           = `${SITE_URL}/#logo`;

const LOGO_URL =
  process.env.NEXT_PUBLIC_LOGO_URL ?? `${SITE_URL}/icon.svg`;

// Google requires a valid raster image URL on every Product. When a product
// has no images in the DB, fall back to this brand-owned hero so the schema
// always validates. PNG/JPG only — SVG and data: URLs trip the Rich Results test.
export const DEFAULT_PRODUCT_IMAGE =
  process.env.NEXT_PUBLIC_DEFAULT_PRODUCT_IMAGE ??
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80";

// Convert any product image reference into an absolute https URL. Google
// rejects relative paths in JSON-LD image fields.
function toAbsoluteUrl(u: string | undefined | null): string | null {
  if (!u) return null;
  const trimmed = u.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  if (trimmed.startsWith("/")) return `${SITE_URL}${trimmed}`;
  return `${SITE_URL}/${trimmed}`;
}

// Normalise a product's images into a guaranteed-non-empty array of absolute
// URLs. Used by both the detail-page Product node and the listing ItemList.
export function productImages(images: ReadonlyArray<string> | undefined): string[] {
  const cleaned = (images ?? [])
    .map(toAbsoluteUrl)
    .filter((v): v is string => typeof v === "string" && v.length > 0);
  return cleaned.length > 0 ? cleaned : [DEFAULT_PRODUCT_IMAGE];
}

const postalAddress = () => ({
  "@type": "PostalAddress",
  streetAddress: ADDRESS.streetAddress,
  addressLocality: ADDRESS.addressLocality,
  addressRegion: ADDRESS.addressRegion,
  postalCode: ADDRESS.postalCode,
  addressCountry: ADDRESS.addressCountry,
});

const openingHoursSpecification = () =>
  HOURS_SPEC.filter((h) => !h.closed).map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${h.dayOfWeek}`,
    opens: h.opens,
    closes: h.closes,
  }));

// Site-wide graph: Organization + LocalBusiness + WebSite + Logo.
// One `@graph` keeps all top-level entities linked by `@id` so search
// engines and LLMs can resolve the brand to one canonical record.
export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "OnlineBusiness"],
        "@id": ORG_ID,
        name: SITE_NAME,
        legalName: SITE_LEGAL_NAME,
        alternateName: ["Aura Bags Lahore", "Aura Bag Manufacturers"],
        url: SITE_URL,
        logo: { "@id": LOGO_ID },
        image: { "@id": LOGO_ID },
        description: SITE_DESCRIPTION,
        slogan: SITE_TAGLINE,
        foundingDate: FOUNDING_DATE,
        foundingLocation: {
          "@type": "Place",
          name: "Lahore, Pakistan",
          address: postalAddress(),
        },
        knowsAbout: [
          "Ladies bag manufacturing",
          "Handbag production",
          "Leather goods crafting",
          "Custom bag design",
          "OEM bag manufacturing",
          "Wholesale handbag supply",
          "Clutch and tote stitching",
          "Garment manufacturing",
        ],
        areaServed: [
          { "@type": "Country", name: "Pakistan" },
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "United States" },
          { "@type": "City", name: "Lahore" },
          { "@type": "City", name: "Karachi" },
          { "@type": "City", name: "Islamabad" },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: PHONE_E164,
            contactType: "customer service",
            contactOption: "TollFree",
            areaServed: ["PK", "AE", "GB", "US"],
            availableLanguage: ["en", "ur"],
            url: WHATSAPP_URL,
          },
          {
            "@type": "ContactPoint",
            telephone: PHONE_E164,
            contactType: "sales",
            areaServed: ["PK", "AE", "GB", "US"],
            availableLanguage: ["en", "ur"],
            url: WHATSAPP_URL,
          },
        ],
        sameAs: SOCIAL_LINKS,
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Handmade ladies handbags",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Custom design ladies bags",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "OEM / wholesale bag manufacturing",
            },
          },
        ],
      },

      {
        "@type": ["LocalBusiness", "Store", "ClothingStore"],
        "@id": LOCALBUSINESS_ID,
        name: SITE_NAME,
        alternateName: "Aura Bags Lahore Workshop",
        description:
          "Lahore-based ladies bag workshop and storefront. Handmade handbags, clutches, totes, and custom orders. Wholesale and OEM enquiries welcome.",
        url: SITE_URL,
        image: { "@id": LOGO_ID },
        logo: { "@id": LOGO_ID },
        telephone: PHONE_E164,
        priceRange: "PKR 700 – PKR 12,000",
        currenciesAccepted: "PKR",
        paymentAccepted: ["Cash", "Bank Transfer", "JazzCash", "EasyPaisa"],
        address: postalAddress(),
        geo: {
          "@type": "GeoCoordinates",
          latitude: GEO.latitude,
          longitude: GEO.longitude,
        },
        hasMap: `https://www.google.com/maps?q=${GEO.latitude},${GEO.longitude}`,
        openingHoursSpecification: openingHoursSpecification(),
        areaServed: [
          { "@type": "Country", name: "Pakistan" },
          { "@type": "City", name: "Lahore" },
          { "@type": "City", name: "Karachi" },
          { "@type": "City", name: "Islamabad" },
        ],
        parentOrganization: { "@id": ORG_ID },
        sameAs: SOCIAL_LINKS,
        knowsLanguage: ["en", "ur"],
        makesOffer: [
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Ladies handbags" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Clutches" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Tote bags" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Custom hand bags" } },
        ],
      },

      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en-PK",
        publisher: { "@id": ORG_ID },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },

      {
        "@type": "ImageObject",
        "@id": LOGO_ID,
        url: LOGO_URL,
        contentUrl: LOGO_URL,
        width: 512,
        height: 512,
        caption: `${SITE_NAME} logo`,
      },
    ],
  };
}

// Breadcrumb helper ------------------------------------------------------
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

// FAQ helper -------------------------------------------------------------
export function faqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

// Generic WebPage helper (used by ContactPage, AboutPage) ----------------
export function webPageJsonLd(opts: {
  type: "WebPage" | "ContactPage" | "AboutPage" | "CollectionPage";
  url: string;
  name: string;
  description: string;
  breadcrumb?: ReturnType<typeof breadcrumbsJsonLd>;
}) {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": opts.type,
    "@id": `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: "en-PK",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    primaryImageOfPage: { "@id": LOGO_ID },
  };
  if (opts.breadcrumb) node.breadcrumb = opts.breadcrumb;
  return node;
}

// HowTo helper -----------------------------------------------------------
export function howToJsonLd(opts: {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration e.g. "PT5M"
  image?: string;
  steps: Array<{ name: string; text: string; url?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
    ...(opts.image ? { image: opts.image } : {}),
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
    })),
  };
}

// Product helper ---------------------------------------------------------
// Builds a Product node that satisfies Google's Rich Results requirements:
//   required: name, image, offers{price, priceCurrency, availability}
//   strongly recommended: description, brand (with inline name), url, sku
// `image` is always coerced to a non-empty array of absolute URLs via
// `productImages()` so the snippet never fails validation on imageless rows.
export function productJsonLd(p: {
  name: string;
  slug: string;
  description?: string;
  price: number;
  category: string;
  images: string[];
  isActive: boolean;
}) {
  const url = `${SITE_URL}/products/${p.slug}`;
  const images = productImages(p.images);
  const description =
    (p.description && p.description.trim().length > 0
      ? p.description
      : `${p.name} — a ${p.category.toLowerCase()} hand-built by ${SITE_NAME} in Lahore, Pakistan.`);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: p.name,
    description,
    sku: p.slug,
    mpn: p.slug,
    category: p.category,
    image: images,
    url,
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    countryOfOrigin: { "@type": "Country", name: "Pakistan" },
    offers: {
      "@type": "Offer",
      "@id": `${url}#offer`,
      url,
      priceCurrency: "PKR",
      price: p.price,
      priceValidUntil: priceValidUntil(),
      availability: p.isActive
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      areaServed: { "@type": "Country", name: "Pakistan" },
      hasMerchantReturnPolicy: merchantReturnPolicy(),
      shippingDetails: offerShippingDetails(),
    },
  };
}

// Google nudges Product results to declare return + shipping policy. These
// reflect the made-to-order WhatsApp workflow: orders are confirmed manually,
// so we publish a 0-day return window (custom-made items are non-returnable)
// and a pan-Pakistan shipping spec.
function merchantReturnPolicy() {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "PK",
    returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
    merchantReturnLink: `${SITE_URL}/contact`,
  };
}

function offerShippingDetails() {
  return {
    "@type": "OfferShippingDetails",
    shippingDestination: {
      "@type": "DefinedRegion",
      addressCountry: "PK",
    },
    shippingRate: {
      "@type": "MonetaryAmount",
      value: 0,
      currency: "PKR",
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: 5,
        maxValue: 10,
        unitCode: "DAY",
      },
      transitTime: {
        "@type": "QuantitativeValue",
        minValue: 2,
        maxValue: 5,
        unitCode: "DAY",
      },
    },
  };
}

// Most engines want a valid future `priceValidUntil`. Roll it forward
// to one year from build/render time so it never goes stale.
function priceValidUntil(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

// Backwards-compat exports for any inline usage left in the codebase.
// (Same shape, but driven by the centralised graph nodes.)
export const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
};
export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
};
