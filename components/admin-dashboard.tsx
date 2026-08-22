"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { Download, Eye, EyeOff, LogOut, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { formatGuarani } from "@/lib/format";
import type { Product } from "@/lib/types";
import { productImports } from "@/lib/product-import";

export function AdminDashboard({ initialProducts, email }: { initialProducts: Product[]; email: string }) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [editing, setEditing] = useState<Product | null | undefined>();
  const [busy, setBusy] = useState(false);
  const [importing, setImporting] = useState(false);

  async function toggle(product: Product) {
    const status = product.status === "published" ? "hidden" : "published";
    const { error } = await createClient().from("products").update({ status }).eq("id", product.id);
    if (!error) setProducts(products.map((p) => p.id === product.id ? { ...p, status } : p));
  }
  async function remove(product: Product) {
    if (!confirm(`¿Seguro que querés eliminar “${product.name}”?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from("products").delete().eq("id", product.id);
    if (!error) setProducts(products.filter((p) => p.id !== product.id));
  }
  async function signOut() { await createClient().auth.signOut(); router.push("/admin/login"); router.refresh(); }
  async function importPhotos() {
    if (!confirm("¿Importar los 24 productos como ocultos para editarlos después?")) return;
    setImporting(true);
    const supabase = createClient();
    const { data: existing } = await supabase.from("products").select("reference").in("reference", productImports.map((p) => p.reference));
    const references = new Set((existing ?? []).map((p) => p.reference));
    const pending = productImports.filter((p) => !references.has(p.reference));
    if (!pending.length) { alert("Las 24 fotos ya fueron importadas."); setImporting(false); return; }
    const { data, error } = await supabase.from("products").insert(pending).select();
    if (error) alert(`No se pudieron importar: ${error.message}`);
    else setProducts([...(data as Product[]), ...products]);
    setImporting(false);
  }

  return <main className="admin-shell">
    <header className="admin-header"><div className="brand admin-brand"><span className="brand-mark">L</span><span><strong>Liz Store</strong><small>Administración</small></span></div><button className="ghost" onClick={signOut}><LogOut size={17}/> Salir</button></header>
    <div className="admin-title"><div><span className="eyebrow">{email}</span><h1>Mis productos</h1><p>{products.length} productos en total</p></div><div className="admin-title-actions"><button className="import" onClick={importPhotos} disabled={importing}><Download size={19}/> {importing ? "Importando…" : "Importar 24 fotos"}</button><button className="add" onClick={() => setEditing(null)}><Plus size={19}/> Agregar producto</button></div></div>
    <div className="product-list">{products.map((p) => <article className="admin-product" key={p.id}><div className="thumb"><Image src={p.image_url} fill alt="" sizes="72px" /></div><div className="admin-product-info"><span className={`status ${p.status}`}>{p.status === "published" ? "Publicado" : "Oculto"}</span><h2>{p.name}</h2><p>{formatGuarani(p.price)} · {p.category}</p></div><div className="admin-actions"><button onClick={() => setEditing(p)} aria-label="Editar"><Pencil size={17}/></button><button onClick={() => toggle(p)} aria-label={p.status === "published" ? "Ocultar" : "Publicar"}>{p.status === "published" ? <EyeOff size={17}/> : <Eye size={17}/>}</button><button className="danger" onClick={() => remove(p)} aria-label="Eliminar"><Trash2 size={17}/></button></div></article>)}</div>
    {editing !== undefined && <ProductModal product={editing} busy={busy} setBusy={setBusy} close={() => setEditing(undefined)} saved={(product) => { setProducts(editing ? products.map(p => p.id === product.id ? product : p) : [product, ...products]); setEditing(undefined); }} />}
  </main>;
}

function ProductModal({ product, close, saved, busy, setBusy }: { product: Product | null; close: () => void; saved: (p: Product) => void; busy: boolean; setBusy: (b: boolean) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); const form = new FormData(e.currentTarget); const supabase = createClient();
    try {
      let image_url = product?.image_url ?? "";
      const file = fileRef.current?.files?.[0];
      if (file) {
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("product-images").upload(path, file, { cacheControl: "31536000", upsert: false });
        if (error) throw error;
        image_url = supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl;
      }
      if (!image_url) throw new Error("Elegí una imagen.");
      const payload = { name:String(form.get("name")), brand:String(form.get("brand")), reference:String(form.get("reference")), price:Number(form.get("price")), category:String(form.get("category")), sizes:String(form.get("sizes") ?? ""), color:String(form.get("color") ?? ""), short_note:String(form.get("short_note") ?? ""), status:String(form.get("status")), is_new:form.get("is_new") === "on", is_offer:form.get("is_offer") === "on", image_url };
      const query = product ? supabase.from("products").update(payload).eq("id", product.id).select().single() : supabase.from("products").insert(payload).select().single();
      const { data, error } = await query; if (error) throw error; saved(data as Product);
    } catch (error) { alert(error instanceof Error ? error.message : "No se pudo guardar."); } finally { setBusy(false); }
  }
  return <div className="modal-backdrop"><div className="modal"><div className="modal-head"><div><span className="eyebrow">Producto</span><h2>{product ? "Editar producto" : "Agregar producto"}</h2></div><button onClick={close}><X/></button></div><form className="product-form" onSubmit={submit}><label className="upload"><Upload/><span>{product ? "Cambiar imagen" : "Elegir imagen"}</span><small>JPG, PNG o WebP</small><input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" capture="environment" required={!product}/></label><div className="form-grid"><label>Nombre<input name="name" defaultValue={product?.name} required /></label><label>Marca<input name="brand" defaultValue={product?.brand ?? "Romance"} required /></label><label>Referencia<input name="reference" defaultValue={product?.reference} required /></label><label>Precio en Gs.<input name="price" type="number" min="0" step="1000" defaultValue={product?.price} required /></label><label>Categoría<select name="category" defaultValue={product?.category ?? "mujeres"}><option value="mujeres">Mujeres</option><option value="hombres">Hombres</option><option value="ninos">Niños</option></select></label><label>Estado<select name="status" defaultValue={product?.status ?? "published"}><option value="published">Publicado</option><option value="hidden">Oculto</option></select></label><label>Tallas (opcional)<input name="sizes" defaultValue={product?.sizes}/></label><label>Color (opcional)<input name="color" defaultValue={product?.color}/></label><label className="wide">Nota corta (opcional)<input name="short_note" defaultValue={product?.short_note}/></label></div><div className="checks"><label><input name="is_new" type="checkbox" defaultChecked={product?.is_new}/> Nuevo</label><label><input name="is_offer" type="checkbox" defaultChecked={product?.is_offer}/> Oferta</label></div><button className="save" disabled={busy}>{busy ? "Guardando…" : "Guardar producto"}</button></form></div></div>;
}
