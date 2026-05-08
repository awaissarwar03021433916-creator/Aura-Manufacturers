import ProductForm from "../ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2">Add Product</h1>
      <p className="text-neutral-600 mb-8">Create a new bag listing.</p>
      <ProductForm mode={{ kind: "create" }} />
    </div>
  );
}
