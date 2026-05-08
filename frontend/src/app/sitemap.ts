import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { fetchProducts } from "@/lib/api";

export const revalidate = 3600; // re-generate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,             lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/products`,     lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/garments`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/custom-bags`,  lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/blog`,         lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/about`,        lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${SITE_URL}/contact`,      lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${SITE_URL}/location`,     lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${SITE_URL}/timing`,       lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
  ];

  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  let products: MetadataRoute.Sitemap = [];
  try {
    const list = await fetchProducts();
    products = list.map((p) => ({
      url: `${SITE_URL}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    /* If API is unreachable at build/sitemap-time, fall back to static routes only. */
  }

  return [...staticRoutes, ...posts, ...products];
}
