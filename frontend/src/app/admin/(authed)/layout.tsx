import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase-server";
import SignOutButton from "@/components/SignOutButton";

export const metadata = { title: "Admin — Aura Manufacturers" };

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/products/new", label: "Add Product" },
  { href: "/admin/messages", label: "Messages" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <aside className="w-60 bg-white border-r border-neutral-200 p-6 hidden md:flex md:flex-col">
        <Link href="/admin" className="block text-lg font-semibold mb-8">
          Aura<span className="text-[var(--brand)]">.</span> Admin
        </Link>
        <nav className="space-y-1 flex-1">
          {navItems.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block px-3 py-2 rounded-lg text-sm hover:bg-neutral-100"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 pt-6 border-t border-neutral-200 space-y-2">
          {user?.email && (
            <p className="text-xs text-neutral-500 break-all" title={user.email}>
              Signed in as
              <br />
              <span className="text-neutral-800 font-medium">{user.email}</span>
            </p>
          )}
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
