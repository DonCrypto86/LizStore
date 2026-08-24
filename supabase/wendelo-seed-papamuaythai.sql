-- WENDELO seed: Papa Muay Thai Resort
-- Run after wendelo-multitenant-step-1.sql.
-- Safe to run again: only the prepared PMT-* menu entries of this tenant
-- are replaced. Products created later with other references are preserved.

begin;

do $$
begin
  if not exists (
    select 1 from public.tenants where slug = 'papamuaythai'
  ) then
    raise exception 'Tenant papamuaythai does not exist. Run step 1 first.';
  end if;
end;
$$;

delete from public.products
where tenant_id = (select id from public.tenants where slug = 'papamuaythai')
  and reference like 'PMT-%';

insert into public.products
  (tenant_id, name, brand, reference, price, category, sizes, color,
   short_note, image_url, status, is_new, is_offer)
select
  t.id, v.name, 'Papa Muay Thai', v.reference, v.price, v.category,
  nullif(v.variants, ''), null, nullif(v.note, ''), v.image_url,
  'published', false, false
from public.tenants t
cross join (values
  ('Rollitos de Primavera', 'PMT-001', 20000, 'entradas', '', '', '/products/01.webp'),
  ('Som Tum · Ensalada de Papaya', 'PMT-002', 35000, 'entradas', '', '', '/products/02.webp'),
  ('Rollitos de Verano', 'PMT-003', 35000, 'entradas', 'Vegetariano Gs. 35.000 · Pollo Gs. 35.000 · Camarón Gs. 50.000', '', '/products/03.webp'),
  ('Laab', 'PMT-004', 40000, 'entradas', 'Cerdo o carne', 'Ensalada tailandesa con menta', '/products/04.webp'),
  ('Ensalada de Mariscos', 'PMT-005', 50000, 'entradas', '', '', '/products/05.webp'),
  ('Sate de Pollo', 'PMT-006', 30000, 'entradas', '', '', '/products/06.webp'),
  ('Cecina Tailandesa', 'PMT-007', 25000, 'entradas', '', '', '/products/07.webp'),
  ('Papas Fritas', 'PMT-008', 20000, 'entradas', '', '', '/products/08.webp'),
  ('Fideos de Cristal Fritos', 'PMT-009', 50000, 'fideos_arroz', 'Vegetariano Gs. 50.000 · Pollo Gs. 60.000', '', '/products/09.webp'),
  ('Fideos de Huevo Fritos', 'PMT-010', 45000, 'fideos_arroz', 'Vegetariano Gs. 45.000 · Pollo Gs. 55.000', '', '/products/10.webp'),
  ('Pad Thai', 'PMT-011', 50000, 'fideos_arroz', 'Vegetariano Gs. 50.000 · Pollo Gs. 60.000 · Mariscos Gs. 75.000', '', '/products/11.webp'),
  ('Pad Sii Ew', 'PMT-012', 50000, 'fideos_arroz', 'Vegetariano Gs. 50.000 · Pollo Gs. 60.000 · Mariscos Gs. 75.000', '', '/products/12.webp'),
  ('Arroz Frito', 'PMT-013', 40000, 'fideos_arroz', 'Vegetariano Gs. 40.000 · Pollo Gs. 50.000 · Mariscos Gs. 70.000', '', '/products/13.webp'),
  ('Tom Yum', 'PMT-014', 55000, 'currys_sopas', 'Vegetariano Gs. 55.000 · Pollo Gs. 65.000 · Mariscos Gs. 80.000', '', '/products/14.webp'),
  ('Tom Ka Kai', 'PMT-015', 55000, 'currys_sopas', 'Vegetariano Gs. 55.000 · Pollo Gs. 65.000 · Mariscos Gs. 80.000', '', '/products/15.webp'),
  ('Curry Rojo con Bambú', 'PMT-016', 50000, 'currys_sopas', 'Vegetariano Gs. 50.000 · Pollo Gs. 55.000 · Carne Gs. 65.000', '', '/products/16.webp'),
  ('Curry Verde', 'PMT-017', 50000, 'currys_sopas', 'Vegetariano Gs. 50.000 · Pollo Gs. 55.000 · Carne Gs. 65.000', '', '/products/17.webp'),
  ('Penang Curry', 'PMT-018', 50000, 'currys_sopas', 'Vegetariano Gs. 50.000 · Pollo Gs. 55.000 · Carne Gs. 65.000', '', '/products/18.webp'),
  ('Pescado al Vapor con Lima', 'PMT-019', 100000, 'pescados', 'Tilapia Gs. 100.000 · Salmón Gs. 120.000', '', '/products/19.webp'),
  ('Tilapia con Piña Agridulce', 'PMT-020', 120000, 'pescados', '', '', '/products/20.webp'),
  ('Pescado al Vapor con Soja Negra y Shiitake', 'PMT-021', 100000, 'pescados', 'Tilapia Gs. 100.000 · Salmón Gs. 120.000', '', '/products/21.webp'),
  ('Pescado con Curry Rojo', 'PMT-022', 100000, 'pescados', 'Tilapia Gs. 100.000 · Salmón Gs. 120.000', '', '/products/22.webp'),
  ('Salchicha Tailandesa', 'PMT-023', 50000, 'especialidades', 'Con arroz o papas', '', '/products/23.webp'),
  ('Laab con Arroz', 'PMT-024', 60000, 'especialidades', 'Cerdo o carne', '', '/products/24.webp'),
  ('Pad Kaprao', 'PMT-025', 50000, 'especialidades', 'Pollo Gs. 50.000 · Carne o cerdo Gs. 60.000 · Mariscos Gs. 80.000', '', '/products/25.webp'),
  ('Salteado con Cúrcuma', 'PMT-026', 50000, 'especialidades', 'Vegetariano Gs. 50.000 · Pollo Gs. 60.000 · Mariscos Gs. 80.000', '', '/products/26.webp'),
  ('Bananas de Coco Fritas', 'PMT-027', 20000, 'postres', '', '', '/products/27.webp'),
  ('Cerveza', 'PMT-028', 8000, 'bebidas', 'Vaso Gs. 8.000 · Botella 0,9 l Gs. 12.000', '', '/brand/papa-muay-thai-logo.webp'),
  ('Radler', 'PMT-029', 10000, 'bebidas', 'Vaso', '', '/brand/papa-muay-thai-logo.webp'),
  ('Cola / Schweppes', 'PMT-030', 6000, 'bebidas', '', '', '/brand/papa-muay-thai-logo.webp'),
  ('Jugo', 'PMT-031', 6000, 'bebidas', '', '', '/brand/papa-muay-thai-logo.webp'),
  ('Agua con Gas', 'PMT-032', 5000, 'bebidas', '', '', '/brand/papa-muay-thai-logo.webp'),
  ('Agua sin Gas', 'PMT-033', 0, 'bebidas', 'Precio por confirmar', '', '/brand/papa-muay-thai-logo.webp'),
  ('Café', 'PMT-034', 8000, 'bebidas', '', '', '/brand/papa-muay-thai-logo.webp'),
  ('Té', 'PMT-035', 8000, 'bebidas', '', '', '/brand/papa-muay-thai-logo.webp')
) as v(name, reference, price, category, variants, note, image_url)
where t.slug = 'papamuaythai';

commit;

select t.slug, count(p.id) as products
from public.tenants t
left join public.products p on p.tenant_id = t.id
where t.slug in ('liz-store', 'papamuaythai')
group by t.slug
order by t.slug;
