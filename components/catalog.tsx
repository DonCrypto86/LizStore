"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpDown, MessageCircle, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatGuarani, whatsappUrl } from "@/lib/format";

const filters = [
  ["todos", "Todos"], ["mujeres", "Mujeres"], ["hombres", "Hombres"], ["ninos", "Niños"]
] as const;

export function Catalog({ products }: { products: Product[] }) {
  const [active, setActive] = useState("todos");
  const [priceSort, setPriceSort] = useState<"none" | "asc" | "desc">("none");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const shown = useMemo(() => {
    const filtered = products.filter((p) => active === "todos" || p.category === active);
    if (priceSort === "none") return filtered;
    return [...filtered].sort((a, b) => priceSort === "asc" ? a.price - b.price : b.price - a.price);
  }, [active, priceSort, products]);

  function togglePriceSort() {
    setPriceSort((current) => current === "asc" ? "desc" : "asc");
  }

  useEffect(() => {
    if (!selectedProduct) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setSelectedProduct(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProduct]);

  return (
    <>
      <section className="hero">
        <nav className="nav shell">
          <a className="brand brand-logo-link" href="#inicio" aria-label="Liz Store, inicio">
            <Image className="liz-logo" src="/brand/liz-store-logo.png" alt="Liz Store — Moda para toda la familia" width={398} height={230} priority />
          </a>
          <a className="nav-contact" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp"><Image className="nav-whatsapp-icon" src="/brand/whatsapp.jpg" alt="" width={42} height={42} /></a>
        </nav>
        <div className="hero-content shell" id="inicio">
          <div className="official"><span>Representación oficial de</span><Image className="romance-logo" src="/brand/romance-logo.avif" alt="Romance" width={110} height={44} /></div>
          <h1>Tu estilo, <em>más cerca.</em></h1>
          <p>
            <span className="hero-brand-copy">Desde 2005, Romance combina <br className="mobile-break" />calidad, diseño e innovación.</span>
            <span className="hero-whatsapp">Colecciones de moda íntima, fitness y casual, <br className="mobile-break" />más cerca de vos con atención personal y asesoramiento directo.</span>
          </p>
          <a className="primary" href="#productos">Ver colección <ArrowRight size={18} /></a>
          <div className="hero-note"><span>Atención personal</span><span>•</span><span>Envíos en Paraguay</span></div>
        </div>
        <div className="orb orb-one"/><div className="orb orb-two"/>
      </section>

      <main className="shell catalog" id="productos">
        <div className="catalog-heading">
          <div><span className="eyebrow">Nuestra selección</span><h2>Encontrá tu favorito</h2></div>
          <span className="count">{shown.length} productos</span>
        </div>
        <div className="filters" role="group" aria-label="Filtrar productos">
          {filters.map(([value, label]) => <button key={value} className={active === value ? "active" : ""} onClick={() => setActive(value)}>{label}</button>)}
          <span className="filter-divider" aria-hidden="true" />
          <button className={`price-sort ${priceSort !== "none" ? "active" : ""}`} onClick={togglePriceSort} aria-label={priceSort === "asc" ? "Ordenar por precio de mayor a menor" : "Ordenar por precio de menor a mayor"}>Precio {priceSort === "asc" ? <ArrowUp size={14}/> : priceSort === "desc" ? <ArrowDown size={14}/> : <ArrowUpDown size={14}/>}</button>
        </div>
        <div className="grid">
          {shown.map((product) => (
            <article className="card" key={product.id}>
              <button className="image-wrap product-image-button" type="button" onClick={() => setSelectedProduct(product)} aria-label={`Ampliar foto de ${product.name}`}>
                <Image src={product.image_url} alt={product.name} fill sizes="(max-width: 640px) 50vw, 33vw" />
                <div className="badges">{product.is_new && <span>Nuevo</span>}{product.is_offer && <span>Oferta</span>}</div>
              </button>
              <div className="card-body">
                <div className="meta">{product.brand} · Ref. {product.reference}</div>
                <h3>{product.name}</h3>
                <p className="details">{[product.color, product.sizes].filter(Boolean).join(" · ")}</p>
                <div className="price">{formatGuarani(product.price)}</div>
                <a className="whatsapp" href={whatsappUrl(product.name, product.reference, product.price)} target="_blank" rel="noreferrer" aria-label={`Consultar ${product.name} por WhatsApp`}><MessageCircle size={17}/> Consultar</a>
              </div>
            </article>
          ))}
        </div>
      </main>
      <section className="cta"><div className="shell"><span>¿Necesitás ayuda para elegir?</span><h2>Escribile a Liz</h2><p>Atención personalizada y rápida por WhatsApp.</p><a href={whatsappUrl()} target="_blank"><MessageCircle size={19}/> 0993 376 335</a></div></section>
      <footer className="shell"><div className="footer-brand"><Image className="liz-logo footer-logo" src="/brand/liz-store-logo.png" alt="Liz Store" width={318} height={184} /></div><div className="footer-romance"><span>Representación oficial de</span><Image src="/brand/romance-logo.avif" alt="Romance" width={88} height={35} /></div></footer>
      {selectedProduct && (
        <div className="product-lightbox" role="dialog" aria-modal="true" aria-label={`Foto ampliada de ${selectedProduct.name}`} onClick={() => setSelectedProduct(null)}>
          <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button className="lightbox-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Cerrar imagen"><X size={22} /></button>
            <div className="lightbox-image">
              <Image src={selectedProduct.image_url} alt={selectedProduct.name} fill sizes="95vw" priority />
            </div>
            <div className="lightbox-caption"><strong>{selectedProduct.name}</strong><span>{formatGuarani(selectedProduct.price)}</span></div>
          </div>
        </div>
      )}
    </>
  );
}
