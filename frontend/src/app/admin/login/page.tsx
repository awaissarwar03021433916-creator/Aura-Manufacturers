"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabase";

export default function AdminLoginPage() {
  const search = useSearchParams();
  const redirectTo = search.get("redirect") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // If already signed in (cookies survived restart), skip the form entirely.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const supabase = getSupabaseBrowser();
      const { data: { session } } = await supabase.auth.getSession();
      if (!cancelled && session) {
        window.location.replace(redirectTo);
        return;
      }
      if (!cancelled) setChecking(false);
    })();
    return () => { cancelled = true; };
  }, [redirectTo]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = getSupabaseBrowser();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // Hard navigation guarantees middleware sees the freshly-set cookie.
      window.location.assign(redirectTo);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setError(msg);
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen grid place-items-center bg-neutral-50 px-4">
        <p className="text-sm text-neutral-500">Checking session…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid place-items-center bg-neutral-50 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white rounded-2xl border border-neutral-200 p-8 space-y-4">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="text-sm text-neutral-600">Sign in to manage products.</p>

        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 focus:border-[var(--brand)] focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 focus:border-[var(--brand)] focus:outline-none"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={loading} className="btn-brand w-full disabled:opacity-60">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
