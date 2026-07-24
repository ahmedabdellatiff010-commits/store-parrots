-- Simplify products schema to match the actual storefront product data.

alter table public.products
  add column if not exists expected_age text,
  add column if not exists size text,
  add column if not exists temperament text,
  add column if not exists quantity integer not null default 1;

-- Migrate existing data from old fields before removing them.

update public.products
set
  expected_age = case
    when ages is not null and array_length(ages, 1) > 0
    then ages[1]
    else ''
  end
where expected_age is null;

update public.products
set
  size = case
    when specs is not null then (
      select split_part(item, ':', 2)
      from unnest(specs) as item
      where item like 'الحجم:%'
      limit 1
    )
    else ''
  end
where size is null;

update public.products
set
  temperament = case
    when specs is not null then (
      select split_part(item, ':', 2)
      from unnest(specs) as item
      where item like 'الطبع:%'
      limit 1
    )
    else ''
  end
where temperament is null;

-- Remove fields that are not part of the new product model.

alter table public.products
  drop column if exists category,
  drop column if exists badge,
  drop column if exists stock_status,
  drop column if exists featured,
  drop column if exists new_arrival,
  drop column if exists best_seller,
  drop column if exists specs,
  drop column if exists speaking_levels,
  drop column if exists ages;

-- Add useful constraints.

alter table public.products
  drop constraint if exists products_quantity_check;

alter table public.products
  add constraint products_quantity_check
  check (quantity >= 0);

alter table public.products
  drop constraint if exists products_price_check;

alter table public.products
  add constraint products_price_check
  check (price >= 0);
