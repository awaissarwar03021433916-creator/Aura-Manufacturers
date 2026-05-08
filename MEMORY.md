# Aura Manufacturers — Project Memory

## Project Overview
- **Name:** Aura Manufacturers
- **Business:** Ladies bags manufacturing (handbags, clutches, totes, custom bags)
- **Type:** Showcase / catalog website (NOT full e-commerce checkout — orders flow through WhatsApp)
- **Status:** Greenfield. Plan approved 2026-05-01. Plan file: `C:\Users\HP\.claude\plans\i-want-to-build-fizzy-moore.md`

## Tech Stack
- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend:** ASP.NET Core 8 Web API
- **Database:** Supabase Postgres
- **Auth:** Supabase Auth (admin login only, email + password)
- **Storage:** Supabase Storage (`product-images`, `custom-bag-uploads` buckets)

## Key Business Details
- **WhatsApp number:** `+92 3258828885` → URL form: `https://wa.me/923258828885`
- **Owner email:** awaissarwar03021433916@gmail.com

## Pages
**Public:** `/` (Home) · `/products` · `/products/[slug]` · `/custom-bags` · `/about` · `/contact` · `/timing` · `/location`

**Admin (auth-guarded):** `/admin/login` · `/admin` (dashboard) · `/admin/products` · `/admin/products/new` · `/admin/products/[id]`

## Custom Bags Flow (signature feature)
1. User clicks Custom Bags → uploads reference image
2. Image saved to Supabase Storage bucket `custom-bag-uploads` → public URL returned
3. "Continue on WhatsApp" button appears
4. Button opens `https://wa.me/923258828885?text=<encoded message + image URL>`

## Admin Add-Product Flow (Shopify-style)
Form (Next.js) → `POST /api/products` (.NET API with Supabase JWT) → images uploaded to Supabase Storage → row inserted in `products` table → redirect to `/admin/products` → list refetched.

## Database Schema (Supabase Postgres)
Tables: `products`, `contact_messages`, `custom_bag_uploads`. Full SQL in plan file.

## Project Layout
```
aura-manufacturers/
├── frontend/                       # Next.js
├── backend/AuraManufacturers.Api/  # .NET 8
├── MEMORY.md
└── README.md
```

## Environment Variables
- **frontend/.env.local:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER=923258828885`
- **backend/appsettings.json:** `ConnectionStrings:Supabase`, `Supabase:Url`, `Supabase:ServiceRoleKey`, `Supabase:JwtSecret`

## Open Items
- [ ] User to install .NET 8 SDK (not detected on machine 2026-05-01) — https://dotnet.microsoft.com/download
- [ ] Create Supabase project; capture URL + anon key + service-role key + JWT secret
- [ ] Confirm: no payment gateway (WhatsApp orders only) — assumed yes
- [ ] Brand colors / logo
- [ ] Hosting (assumed Vercel + Azure + Supabase Cloud)

## Conventions
- Imperative names; default no comments unless WHY is non-obvious
- Imports: ESM in Next.js, standard C# in .NET
- WhatsApp link helper centralized in `frontend/lib/whatsapp.ts`
- Admin route protection in `frontend/middleware.ts`

## Verification Checklist (from plan)
1. Public pages render and are mobile-responsive
2. Custom-bag upload → bucket → WhatsApp link works
3. Admin login + route guard
4. Add/edit/delete product reflects on public site instantly
5. Contact form persists to DB
6. API rejects unauthenticated admin calls (401)

---
_Last updated: 2026-05-01_
