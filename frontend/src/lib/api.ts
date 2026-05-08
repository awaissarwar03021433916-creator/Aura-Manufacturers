const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  isFeatured: boolean;
  isActive: boolean;
};

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/api/products`, {
      next: { revalidate: 60, tags: ["products"] },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/api/products/${slug}`, {
      next: { revalidate: 60, tags: ["products", `product:${slug}`] },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
