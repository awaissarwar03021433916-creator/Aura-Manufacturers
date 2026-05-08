"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabase";
import type { Product } from "@/lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

type Mode = { kind: "create" } | { kind: "edit"; product: Product };

export default function ProductForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const initial = mode.kind === "edit" ? mode.product : null;

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [price, setPrice] = useState<string>(initial ? String(initial.price) : "");
  const [category, setCategory] = useState(initial?.category ?? "Handbag");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [images, setImages] = useState<string[]>(initial?.images ?? []);
  const [isFeatured, setIsFeatured] = useState(initial?.isFeatured ?? false);
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  function autoSlug(v: string) {
    return v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  async function uploadImages(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const supabase = getSupabaseBrowser();
      const newUrls: string[] = [];
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("product-images")
          .upload(path, file, { contentType: file.type });
        if (upErr) throw upErr;
        const { data } = supabase.storage.from("product-images").getPublicUrl(path);
        newUrls.push(data.publicUrl);
      }
      setImages((prev) => [...prev, ...newUrls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function resetForm() {
    setName("");
    setSlug("");
    setPrice("");
    setCategory("Handbag");
    setDescription("");
    setImages([]);
    setIsFeatured(false);
    setIsActive(true);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const supabase = getSupabaseBrowser();
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token ?? "";

      const body = {
        name,
        slug: slug || autoSlug(name),
        description,
        price: Number(price) || 0,
        category,
        images,
        isFeatured,
        isActive,
      };

      const url = mode.kind === "create"
        ? `${API_BASE}/api/products`
        : `${API_BASE}/api/products/${(mode as { kind: "edit"; product: Product }).product.id}`;

      const ac = new AbortController();
      const timeoutId = setTimeout(() => ac.abort(), 20000);
      let res: Response;
      try {
        res = await fetch(url, {
          method: mode.kind === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
          signal: ac.signal,
          cache: "no-store",
        });
      } catch (e) {
        if ((e as Error).name === "AbortError") {
          throw new Error("Server didn't respond in 20s. Please try again.");
        }
        throw e;
      } finally {
        clearTimeout(timeoutId);
      }
      if (!res.ok) throw new Error(`Save failed (${res.status})`);

      if (mode.kind === "create") {
        const savedName = name;
        resetForm();
        setSuccess(`Product "${savedName}" added successfully.`);
        if (successTimerRef.current) clearTimeout(successTimerRef.current);
        successTimerRef.current = setTimeout(() => setSuccess(null), 4000);
      } else {
        router.push("/admin/products");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium">Name</span>
          <input
            value={name}
            onChange={(e) => { setName(e.target.value); if (!slug) setSlug(autoSlug(e.target.value)); }}
            required
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Slug</span>
          <input
            value={slug}
            onChange={(e) => setSlug(autoSlug(e.target.value))}
            required
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Price (PKR)</span>
          <input
            type="number"
            min={0}
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
          >
            <option>Handbag</option>
            <option>Clutch</option>
            <option>Tote</option>
            <option>Crossbody</option>
            <option>Wallet</option>
            <option>Other</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium">Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
        />
      </label>

      <div>
        <span className="text-sm font-medium block mb-2">Images</span>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
          {images.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-neutral-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setImages((p) => p.filter((_, idx) => idx !== i))}
                className="absolute top-1 right-1 bg-white/90 text-xs rounded-full px-2 py-0.5"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => uploadImages(e.target.files)}
          disabled={uploading}
          className="text-sm"
        />
        {uploading && <p className="text-sm text-neutral-500 mt-2">Uploading…</p>}
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          Active (visible on public site)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
          Featured on homepage
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span className="flex-1">{success}</span>
          <button
            type="button"
            onClick={() => setSuccess(null)}
            aria-label="Dismiss"
            className="text-green-700 hover:text-green-900"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={submitting || uploading} className="btn-brand disabled:opacity-60">
          {submitting ? "Saving…" : mode.kind === "create" ? "Add Product" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
