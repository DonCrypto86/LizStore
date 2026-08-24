-- WENDELO multi-tenant migration — step 1
-- Safe preparation: keeps the existing Liz Store policies active.
-- Run this once in the existing WENDELO (formerly LizStore) Supabase project.

begin;

create extension if not exists pgcrypto;

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  status text not null default 'active'
    check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.tenants (slug, name)
values
  ('liz-store', 'Liz Store'),
  ('papamuaythai', 'Papa Muay Thai Resort')
on conflict (slug) do update set name = excluded.name;

create table if not exists public.tenant_users (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  username text not null,
  role text not null default 'admin'
    check (role in ('owner', 'admin', 'editor')),
  created_at timestamptz not null default now(),
  unique (tenant_id, user_id),
  unique (username)
);

create unique index if not exists tenant_users_username_lower_idx
  on public.tenant_users (lower(username));

alter table public.products
  add column if not exists tenant_id uuid references public.tenants(id);

update public.products
set tenant_id = (select id from public.tenants where slug = 'liz-store')
where tenant_id is null;

alter table public.products alter column tenant_id set not null;

create index if not exists products_tenant_id_idx
  on public.products (tenant_id);

-- The central catalog must accept category names from different businesses.
alter table public.products drop constraint if exists products_category_check;

alter table public.page_visits
  add column if not exists tenant_id uuid references public.tenants(id);

update public.page_visits
set tenant_id = (select id from public.tenants where slug = 'liz-store')
where tenant_id is null;

alter table public.page_visits alter column tenant_id set not null;

create index if not exists page_visits_tenant_id_visited_at_idx
  on public.page_visits (tenant_id, visited_at desc);

alter table public.tenants enable row level security;
alter table public.tenant_users enable row level security;

drop policy if exists "Public can read active tenants" on public.tenants;
create policy "Public can read active tenants"
  on public.tenants for select
  using (status = 'active');

drop policy if exists "Users can read own tenant memberships" on public.tenant_users;
create policy "Users can read own tenant memberships"
  on public.tenant_users for select to authenticated
  using (user_id = auth.uid());

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tenants_updated_at on public.tenants;
create trigger tenants_updated_at
before update on public.tenants
for each row execute function public.set_updated_at();

commit;

-- Verification: the result should show two tenants. Existing products and
-- visits should all appear under liz-store after this first migration.
select
  t.slug,
  count(distinct p.id) as products,
  count(distinct v.id) as page_visits
from public.tenants t
left join public.products p on p.tenant_id = t.id
left join public.page_visits v on v.tenant_id = t.id
group by t.slug
order by t.slug;
