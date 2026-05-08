"use client";

import { useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase";

export default function SignOutButton({ className = "" }: { className?: string }) {
  const [loading, setLoading] = useState(false);

  async function onClick() {
    setLoading(true);
    try {
      const supabase = getSupabaseBrowser();
      await supabase.auth.signOut();
    } finally {
      window.location.assign("/admin/login");
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={
        className ||
        "text-xs uppercase tracking-luxe text-neutral-500 hover:text-red-600 transition disabled:opacity-50"
      }
    >
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}
