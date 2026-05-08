import { fetchProducts } from "@/lib/api";

export default async function AdminDashboard() {
  const products = await fetchProducts();
  const active = products.filter((p) => p.isActive).length;

  const stats = [
    { label: "Total products", value: products.length },
    { label: "Active products", value: active },
    { label: "Categories", value: new Set(products.map((p) => p.category)).size },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
      <p className="text-neutral-600 mb-8">Quick overview of your store.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-neutral-200 p-6">
            <p className="text-sm text-neutral-500">{s.label}</p>
            <p className="text-3xl font-semibold mt-1">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
