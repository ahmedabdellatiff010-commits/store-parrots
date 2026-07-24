-- Initial Supabase schema for product storefront and admin auth.
-- This migration creates products, product_images, admins, and storage policies.

-- Ensure UUID generation is available.
create extension if not exists "pgcrypto";

-- Product status enum for storefront visibility.
create type if not exists public.product_status as enum ('available', 'sold', 'hidden');

-- Products table.
create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  name text not null,
  description text not null,
  price numeric not null,
  main_image text,
  category text,
  badge text,
  stock_status text,
  status public.product_status not null default 'available',
  featured boolean not null default false,
  new_arrival boolean not null default false,
  best_seller boolean not null default false,
  video text,
  specs text[] not null default '{}',
  speaking_levels text[] not null default '{}',
  ages text[] not null default '{}',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Product images gallery table.
create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references public.products(id) on delete cascade,
  image_url text not null,
  sort_order integer not null default 0,
  created_at timestamp with time zone not null default now()
);

-- Admin users table linked to Supabase Auth.
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamp with time zone not null default now()
);

-- Enable RLS for product management.
alter table public.products enable row level security;
create policy if not exists "Public can select available products" on public.products
  for select using (status = 'available');
create policy if not exists "Admins can select all products" on public.products
  for select using (
    auth.uid() in (select user_id from public.admins)
  );
create policy if not exists "Admins can manage products" on public.products
  for insert, update, delete using (
    auth.uid() in (select user_id from public.admins)
  );

-- Enable RLS for product images.
alter table public.product_images enable row level security;
create policy if not exists "Public can select available product images" on public.product_images
  for select using (
    exists (
      select 1 from public.products
      where public.products.id = public.product_images.product_id
        and public.products.status = 'available'
    )
  );
create policy if not exists "Admins can select all product images" on public.product_images
  for select using (
    auth.uid() in (select user_id from public.admins)
  );
create policy if not exists "Admins can manage product images" on public.product_images
  for insert, update, delete using (
    auth.uid() in (select user_id from public.admins)
  );

-- Enable RLS for admin mappings so an admin can see own record.
alter table public.admins enable row level security;
create policy if not exists "Admins can manage own admin record" on public.admins
  for select using (auth.uid() = user_id);
create policy if not exists "Admins can insert own admin record" on public.admins
  for insert with check (auth.uid() = user_id);
create policy if not exists "Admins can update own admin record" on public.admins
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy if not exists "Admins can delete own admin record" on public.admins
  for delete using (auth.uid() = user_id);

-- Create storage bucket for product images.
select storage.create_bucket('product-images', '{"public": true}');

-- Enable RLS for storage objects and restrict write/delete to admins.
alter table storage.objects enable row level security;
create policy if not exists "Public read product-images objects" on storage.objects
  for select using (bucket_id = 'product-images');
create policy if not exists "Admins can manage product-images objects" on storage.objects
  for insert, update, delete using (
    bucket_id = 'product-images'
    and auth.uid() in (select user_id from public.admins)
  );
