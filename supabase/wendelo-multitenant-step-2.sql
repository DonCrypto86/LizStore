-- WENDELO multi-tenant migration — step 2
-- Run after step 1 and after the Liz/Thorsten rows exist in tenant_users.

begin;

create or replace function public.user_has_tenant_access(requested_tenant_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.tenant_users tu
    where tu.tenant_id = requested_tenant_id
      and tu.user_id = auth.uid()
  );
$$;

revoke all on function public.user_has_tenant_access(uuid) from public;
grant execute on function public.user_has_tenant_access(uuid) to authenticated;

alter table public.products enable row level security;

drop policy if exists "Public can read published products" on public.products;
drop policy if exists "Authenticated admin can insert products" on public.products;
drop policy if exists "Authenticated admin can update products" on public.products;
drop policy if exists "Authenticated admin can delete products" on public.products;
drop policy if exists "Members can read own tenant products" on public.products;
drop policy if exists "Members can insert own tenant products" on public.products;
drop policy if exists "Members can update own tenant products" on public.products;
drop policy if exists "Members can delete own tenant products" on public.products;

create policy "Public can read published products"
  on public.products for select
  using (status = 'published');

create policy "Members can read own tenant products"
  on public.products for select to authenticated
  using (public.user_has_tenant_access(tenant_id));

create policy "Members can insert own tenant products"
  on public.products for insert to authenticated
  with check (public.user_has_tenant_access(tenant_id));

create policy "Members can update own tenant products"
  on public.products for update to authenticated
  using (public.user_has_tenant_access(tenant_id))
  with check (public.user_has_tenant_access(tenant_id));

create policy "Members can delete own tenant products"
  on public.products for delete to authenticated
  using (public.user_has_tenant_access(tenant_id));

alter table public.page_visits enable row level security;

drop policy if exists "Anonymous visitors can record visits" on public.page_visits;
drop policy if exists "Authenticated admin can read visits" on public.page_visits;
drop policy if exists "Members can read own tenant visits" on public.page_visits;

create policy "Members can read own tenant visits"
  on public.page_visits for select to authenticated
  using (public.user_has_tenant_access(tenant_id));

create or replace function public.record_page_visit(tenant_slug text, new_visitor_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  resolved_tenant_id uuid;
begin
  select id into resolved_tenant_id
  from public.tenants
  where slug = tenant_slug and status = 'active';

  if resolved_tenant_id is null then
    raise exception 'Unknown or inactive tenant';
  end if;

  insert into public.page_visits (tenant_id, visitor_id)
  values (resolved_tenant_id, new_visitor_id);
end;
$$;

revoke all on function public.record_page_visit(text, uuid) from public;
grant execute on function public.record_page_visit(text, uuid) to anon, authenticated;

-- Images stay publicly readable. New writes must use a path beginning with the
-- tenant slug, for example: papamuaythai/bulk/image.webp.
drop policy if exists "Authenticated admin can upload product images" on storage.objects;
drop policy if exists "Authenticated admin can update product images" on storage.objects;
drop policy if exists "Authenticated admin can delete product images" on storage.objects;
drop policy if exists "Members can upload own tenant product images" on storage.objects;
drop policy if exists "Members can update own tenant product images" on storage.objects;
drop policy if exists "Members can delete own tenant product images" on storage.objects;

create policy "Members can upload own tenant product images"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'product-images'
    and exists (
      select 1
      from public.tenant_users tu
      join public.tenants t on t.id = tu.tenant_id
      where tu.user_id = auth.uid()
        and t.slug = (storage.foldername(name))[1]
    )
  );

create policy "Members can update own tenant product images"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'product-images'
    and exists (
      select 1
      from public.tenant_users tu
      join public.tenants t on t.id = tu.tenant_id
      where tu.user_id = auth.uid()
        and t.slug = (storage.foldername(name))[1]
    )
  )
  with check (
    bucket_id = 'product-images'
    and exists (
      select 1
      from public.tenant_users tu
      join public.tenants t on t.id = tu.tenant_id
      where tu.user_id = auth.uid()
        and t.slug = (storage.foldername(name))[1]
    )
  );

create policy "Members can delete own tenant product images"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'product-images'
    and exists (
      select 1
      from public.tenant_users tu
      join public.tenants t on t.id = tu.tenant_id
      where tu.user_id = auth.uid()
        and t.slug = (storage.foldername(name))[1]
    )
  );

commit;

-- Verification: both rows must be true before either admin is used.
select
  t.slug,
  exists (
    select 1 from public.tenant_users tu where tu.tenant_id = t.id
  ) as has_admin
from public.tenants t
where t.slug in ('liz-store', 'papamuaythai')
order by t.slug;
