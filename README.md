# Aura Manufacturers — Ladies Bags Website

A showcase website with WhatsApp-driven orders and a Shopify-style admin panel.

- **Frontend:** Next.js 14 (App Router, TypeScript, Tailwind)
- **Backend:** ASP.NET Core 8 Web API
- **Database / Auth / Storage:** Supabase

See [`MEMORY.md`](./MEMORY.md) for the project context and
[`C:\Users\HP\.claude\plans\i-want-to-build-fizzy-moore.md`](C:\Users\HP\.claude\plans\i-want-to-build-fizzy-moore.md)
for the full plan.

---

## Project Layout

```
aura-manufacturers/
├── frontend/                       # Next.js app
├── backend/AuraManufacturers.Api/  # .NET 8 Web API
├── supabase/                       # SQL schema + storage policies
├── MEMORY.md
└── README.md
```

---

## Setup Steps

### 1. Supabase
1. Create a project at https://supabase.com.
2. In the SQL editor, run [`supabase/schema.sql`](./supabase/schema.sql).
3. Create two storage buckets: `product-images` and `custom-bag-uploads`.
   Apply the policies in [`supabase/storage-setup.md`](./supabase/storage-setup.md).
4. Project Settings → API: copy `Project URL`, `anon` key, `service_role` key, and JWT secret.

### 2. Frontend
```bash
cd frontend
cp .env.local.example .env.local
# fill NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm install
npm run dev
```
Visit http://localhost:3000

### 3. Backend (.NET 8)
> Requires .NET 8 SDK — install from https://dotnet.microsoft.com/download

```bash
cd backend/AuraManufacturers.Api
# fill values in appsettings.json (or use user-secrets)
dotnet restore
dotnet run
```
API runs at http://localhost:5000 — Swagger at http://localhost:5000/swagger

### 4. Create the admin user
In the Supabase dashboard → Authentication → Add user → email + password.
Use those credentials at http://localhost:3000/admin/login.

---

## Key Pages

| Route | Description |
|---|---|
| `/` | Homepage |
| `/products` · `/products/[slug]` | Catalog |
| `/custom-bags` | Image upload → "Continue on WhatsApp" |
| `/about` · `/contact` · `/timing` · `/location` | Info pages |
| `/admin/login` | Supabase login |
| `/admin` · `/admin/products` · `/admin/products/new` · `/admin/products/[id]` | Admin panel |

WhatsApp number used by all CTAs: **+92 325 8828885**
(set via `NEXT_PUBLIC_WHATSAPP_NUMBER`).
