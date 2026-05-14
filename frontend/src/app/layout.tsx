import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/seo";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF7F2" },
    { media: "(prefers-color-scheme: dark)",  color: "#1A1410" },
  ],
  width: "device-width",
  initialScale: 1,
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  // "swap" + a metric-adjusted fallback below = zero CLS even if the webfont
  // never arrives (offline, blocked, slow link).
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
  // Next.js generates a size-adjusted local fallback whose x-height/advance
  // match Inter, so the navbar width stays identical with or without Inter.
  adjustFontFallback: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ladies Bag Manufacturers in Lahore, Pakistan | Aura Manufacturers",
    template: "%s | Aura Manufacturers",
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Fashion · Manufacturing",
  alternates: {
    canonical: "/",
    languages: { "en-PK": "/", "x-default": "/" },
  },
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Ladies Bag Manufacturers in Lahore, Pakistan | Aura Manufacturers",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Handmade ladies bags by Aura Manufacturers in Lahore, Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura Manufacturers — Ladies Bag Makers in Lahore",
    description: SITE_DESCRIPTION,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  icons: { icon: "/icon.svg" },
  verification: {
    // Paste your Google Search Console TXT/HTML verification token below when you set it up.
    // google: "PASTE_GOOGLE_SITE_VERIFICATION_TOKEN_HERE",
  },
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('aura-theme');
    var theme = stored ? stored : 'light';
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-PK">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="alternate" type="application/rss+xml" title="Aura Manufacturers Blog" href="/blog" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-[var(--bg)] text-[var(--text)]`}
      >
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
