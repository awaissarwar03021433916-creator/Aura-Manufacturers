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
