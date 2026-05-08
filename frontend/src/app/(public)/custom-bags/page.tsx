"use client";

import { useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase";
import { whatsappLink, customBagMessage } from "@/lib/whatsapp";
import Reveal from "@/components/Reveal";

type Status = "idle" | "uploading" | "ready" | "error";

export default function CustomBagsPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  function dismissPreview() {
    setPreviewUrl(null);
    setImageUrl(null);
    setStatus("idle");
    setErrorMsg(null);
  }

  async function processFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setStatus("error");
      setErrorMsg("Please choose an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setStatus("error");
      setErrorMsg("Image must be under 8 MB.");
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    setStatus("uploading");
    setErrorMsg(null);

    try {
      const supabase = getSupabaseBrowser();
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("custom-bag-uploads")
        .upload(path, file, { contentType: file.type, upsert: false });

      if (upErr) throw upErr;

      const { data } = supabase.storage.from("custom-bag-uploads").getPublicUrl(path);
      setImageUrl(data.publicUrl);
      setStatus("ready");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Upload failed. Please try again or message us directly on WhatsApp.");
    }
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  }

  async function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await processFile(file);
  }

  const link = imageUrl ? whatsappLink(customBagMessage(imageUrl)) : null;

  return (
    <section className="section-cream relative overflow-hidden">
      <div className="blob blob-gold blob-drift-slow w-[28rem] h-[28rem] -right-32 -top-20 opacity-40" />
      <div className="blob blob-camel blob-drift w-[22rem] h-[22rem] -left-24 bottom-0 opacity-30" />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-10 py-24">
        <Reveal>
          <p className="eyebrow mb-5">Custom Bags</p>
          <h1 className="font-display text-5xl md:text-6xl text-[var(--ink)] mb-6">
            A bag, <span className="italic text-[var(--cognac)]">made for you.</span>
          </h1>
          <p className="text-[var(--muted)] text-lg leading-relaxed mb-10 max-w-xl">
            Upload a sample image of the bag you have in mind. We&rsquo;ll continue the
            chat on WhatsApp with price, fabric choices, and timeline.
          </p>

          <div className="mb-10 flex items-center gap-3">
            <span className="block h-px w-16 bg-[var(--gold)]" />
            <span className="text-[0.65rem] uppercase tracking-luxe text-[var(--muted)]">
              Three steps · Upload, share, make
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=500&q=70"
              alt="Custom bag idea"
              className="aspect-square w-full object-cover border border-[var(--line)]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=70"
              alt="Leather options"
              className="aspect-square w-full object-cover border border-[var(--line)]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=500&q=70"
              alt="Finished bag"
              className="aspect-square w-full object-cover border border-[var(--line)]"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="bg-[var(--beige)] border border-[var(--line)] p-8 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 pattern-dots opacity-50 pointer-events-none" />

            <div className="relative">
              <span className="eyebrow block mb-4">Sample Image</span>

              <label
                className={`dropzone block ${dragActive ? "dropzone--active" : ""}`}
                onDragEnter={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  disabled={status === "uploading"}
                  className="sr-only"
                />
                <div className="flex flex-col items-center gap-4 py-2">
                  <span className="flex h-14 w-14 items-center justify-center border border-[var(--line)] rounded-full bg-[var(--cream)] text-[var(--camel)]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 16V4" />
                      <path d="m7 9 5-5 5 5" />
                      <path d="M5 20h14" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-display text-lg text-[var(--ink)]">
                      Drop your image here
                    </p>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      or <span className="text-[var(--camel)] underline underline-offset-4">browse files</span>
                    </p>
                  </div>
                  <p className="text-[0.65rem] uppercase tracking-luxe text-[var(--muted)]">
                    JPG · PNG · WebP · Max 8 MB
                  </p>
                </div>
              </label>

              {previewUrl && (
                <div className="mt-10">
                  <p className="eyebrow mb-4">Preview</p>
                  <div className="preview-frame relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewUrl} alt="Sample" />
                    <button
                      type="button"
                      onClick={dismissPreview}
                      aria-label="Remove image"
                      className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {status === "uploading" && (
                <p className="mt-8 text-sm text-[var(--muted)] uppercase tracking-luxe inline-flex items-center gap-3">
                  <span className="inline-block h-2 w-2 rounded-full bg-[var(--camel)] animate-pulse" />
                  Uploading…
                </p>
              )}

              {status === "error" && errorMsg && (
                <div className="mt-8 border-l-2 border-red-700/70 bg-red-700/5 px-4 py-3 text-sm text-red-800">
                  {errorMsg}
                </div>
              )}

              {status === "ready" && link && (
                <div className="mt-10 pt-8 border-t border-[var(--line)]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--gold)]/20 text-[var(--camel)]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 12 5 5L20 7" />
                      </svg>
                    </span>
                    <p className="text-[0.7rem] uppercase tracking-luxe text-[var(--camel)]">
                      Image uploaded
                    </p>
                  </div>
                  <p className="text-sm text-[var(--muted)] mb-6 leading-relaxed">
                    Chat on WhatsApp to share details and price.
                  </p>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brand"
                  >
                    Continue on WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <p className="text-xs text-[var(--muted)] mt-6 leading-relaxed">
          By uploading, you agree we can save your image to share a price.
        </p>
      </div>
    </section>
  );
}
