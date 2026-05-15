/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  // Tree-shake big libs in dev + prod so compile + bundle stay light.
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "@react-three/drei",
      "@react-three/fiber",
      "three",
      "@supabase/ssr",
      "@supabase/supabase-js",
    ],
  },

  // Allow next/image (or just CDN-friendly headers) for Supabase + Unsplash.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // ---------------------------------------------------------------------------
  // Canonical-host enforcement.
  // Every *.vercel.app hostname — the stable project alias
  // (aura-manufacturers.vercel.app) AND every per-deployment / preview URL
  // (aura-manufacturers-git-<branch>-<team>.vercel.app, <hash>.vercel.app) — is
  // 301-redirected to the single production domain. The pathname (:path*) and
  // the query string are carried across, so deep links and tracked URLs survive.
  // This collapses every duplicate host onto one canonical origin: Google never
  // indexes a vercel.app copy and all ranking signals consolidate on www.
  //
  // Safe by construction:
  //  - Only fires when the request Host header *ends with* `.vercel.app`, so
  //    requests to www.auramanufacturers.com are never touched.
  //  - The destination is a hard-coded absolute URL, so it cannot become an
  //    open redirect from a spoofed Host header.
  //  - Redirects are an HTTP-time routing rule, evaluated before middleware and
  //    rendering — they do not run during `next build`, so Vercel deployments
  //    (including the build/readiness checks on the vercel.app URL) are unaffected.
  // ---------------------------------------------------------------------------
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app$" }],
        destination: "https://www.auramanufacturers.com/:path*",
        // Use `statusCode: 301` explicitly — Next.js' `permanent: true` shortcut
        // emits a 308. Both are permanent and SEO-equivalent to Google, but the
        // requirement here is a literal 301.
        statusCode: 301,
      },
    ];
  },

  async headers() {
    // Build-time check: on Vercel preview / development deployments emit
    // X-Robots-Tag: noindex so *.vercel.app hosts never get indexed even if
    // a crawler ignores robots.txt or hits an asset directly.
    const isPreviewDeployment =
      process.env.VERCEL_ENV === "preview" ||
      process.env.VERCEL_ENV === "development";

    const baseHeaders = [
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "X-Content-Type-Options", value: "nosniff" },
    ];

    if (isPreviewDeployment) {
      baseHeaders.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
    }

    return [
      {
        source: "/:path*",
        headers: baseHeaders,
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
