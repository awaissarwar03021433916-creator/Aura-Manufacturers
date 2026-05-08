-- Aura Manufacturers — Supabase schema
-- Run in Supabase SQL Editor after creating the project.

create extension if not exists "pgcrypto";

create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  slug         text unique not null,
  description  text,
  price        numeric(10,2) not null default 0,
  category     text,
  images       text[] not null default '{}',
  is_featured  boolean not null default false,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists idx_products_active on public.products (is_active);
create index if not exists idx_products_category on public.products (category);

create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  email       text,
  phone       text,
  message     text not null,
  created_at  timestamptz not null default now()
);

create table if not exists public.custom_bag_uploads (
  id          uuid primary key default gen_random_uuid(),
  image_url   text not null,
  created_at  timestamptz not null default now()
);

-- updated_at trigger for products
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.products            enable row level security;
alter table public.contact_messages    enable row level security;
alter table public.custom_bag_uploads  enable row level security;

-- Public can read active products
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products
  for select using (is_active = true);

-- Authenticated (admin) full access on products
drop policy if exists "products_admin_all" on public.products;
create policy "products_admin_all" on public.products
  for all to authenticated using (true) with check (true);

-- Anyone can submit a contact message
drop policy if exists "contact_public_insert" on public.contact_messages;
create policy "contact_public_insert" on public.contact_messages
  for insert with check (true);

drop policy if exists "contact_admin_read" on public.contact_messages;
create policy "contact_admin_read" on public.contact_messages
  for select to authenticated using (true);

-- Anyone can log a custom-bag upload
drop policy if exists "custom_bag_public_insert" on public.custom_bag_uploads;
create policy "custom_bag_public_insert" on public.custom_bag_uploads
  for insert with check (true);

drop policy if exists "custom_bag_admin_read" on public.custom_bag_uploads;
create policy "custom_bag_admin_read" on public.custom_bag_uploads
  for select to authenticated using (true);
