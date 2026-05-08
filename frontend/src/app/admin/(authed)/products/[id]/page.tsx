import { notFound } from "next/navigation";
import ProductForm from "../ProductForm";
import type { Product } from "@/lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/api/products/admin/all`, { cache: "no-store" });
    if (!res.ok) return null;
    const list = (await res.json()) as Product[];
    return list.find((p) => p.id === id) ?? null;
  } catch {
    return null;
  }
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProductById(params.id);
  if (!product) notFound();

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2">Edit Product</h1>
      <p className="text-neutral-600 mb-8">{product.name}</p>
      <ProductForm mode={{ kind: "edit", product }} />
    </div>
  );
}
