# Supabase Storage Setup

Two buckets are required.

## 1. `product-images`
- **Public:** Yes (read)
- **Write:** Authenticated users only (admin)

Bucket policy SQL (run in SQL editor after creating the bucket via UI):

```sql
-- Anyone can read
create policy "product_images_public_read" on storage.objects
  for select using (bucket_id = 'product-images');

-- Only authenticated users can upload/update/delete
create policy "product_images_admin_write" on storage.objects
  for insert to authenticated with check (bucket_id = 'product-images');

create policy "product_images_admin_update" on storage.objects
  for update to authenticated using (bucket_id = 'product-images');

create policy "product_images_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'product-images');
```

## 2. `custom-bag-uploads`
- **Public:** Yes (read)
- **Write:** Anyone (anonymous customers upload reference images)

```sql
create policy "custom_bag_public_read" on storage.objects
  for select using (bucket_id = 'custom-bag-uploads');

create policy "custom_bag_public_insert" on storage.objects
  for insert with check (bucket_id = 'custom-bag-uploads');
```

> Add an Edge Function or DB trigger later if you want to enforce file-size or
> mime-type limits beyond the bucket settings.
