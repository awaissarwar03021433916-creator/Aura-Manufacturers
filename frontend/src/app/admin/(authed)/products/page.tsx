import Link from "next/link";
import type { Product } from "@/lib/api";
import DeleteProductButton from "./DeleteProductButton";

export const dynamic = "force-dynamic";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

async function fetchProductsAdmin(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/api/products`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function AdminProductsPage() {
  const products = await fetchProductsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold">Products</h1>
          <p className="text-neutral-600 mt-1">{products.length} total</p>
        </div>
        <Link href="/admin/products/new" className="btn-brand">+ Add Product</Link>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-neutral-500">
                  No products yet. <Link href="/admin/products/new" className="text-[var(--brand)] underline">Add the first one</Link>.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3">
                    <div className="w-12 h-12 bg-neutral-100 rounded-lg overflow-hidden">
                      {p.images[0] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-neutral-600">{p.category ?? "—"}</td>
                  <td className="px-4 py-3">PKR {p.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${p.isActive ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-600"}`}>
                      {p.isActive ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <Link href={`/admin/products/${p.id}`} className="text-[var(--brand)] hover:underline">Edit</Link>
                    <DeleteProductButton id={p.id} name={p.name} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
