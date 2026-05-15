import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // On Vercel preview / development deployments, block all crawling so
  // *.vercel.app hostnames never get into search indexes. The metadata-level
  // `robots: noindex` and the `X-Robots-Tag` response header (set in
  // next.config.mjs) provide belt-and-braces coverage.
  if (!INDEXABLE) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      host: SITE_URL,
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/admin/*"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
