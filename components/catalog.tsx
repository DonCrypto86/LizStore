"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpDown, MessageCircle, Share2, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatGuarani, whatsappUrl } from "@/lib/format";
import { createClient } from "@/lib/supabase/client";
import { TENANT_SLUG } from "@/lib/tenant";
import { WaveAnimation } from "@/components/wave-animation";

const filters = [
  ["todos", "Todos"], ["mujeres", "Mujeres"], ["hombres", "Hombres"], ["ninos", "Niños"]
] as const;

const heroTitles = [
  { lead: "Tu estilo, ", accent: "más cerca." },
  { lead: "Detalles que ", accent: "te hacen única." },
  { lead: "Diseños que ", accent: "enamoran." },
  { lead: "Siéntete ", accent: "tú", tail: " todos los días." }
] as const;

export function Catalog({ products }: { products: Product[] }) {
  const [active, setActive] = useState("todos");
  const [priceSort, setPriceSort] = useState<"none" | "asc" | "desc">("none");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const shown = useMemo(() => {
    const filtered = products.filter((p) => active === "todos" || p.category === active);
    if (priceSort === "none") return filtered;
    return [...filtered].sort((a, b) => priceSort === "asc" ? a.price - b.price : b.price - a.price);
  }, [active, priceSort, products]);
  const groupedView = active === "todos" && priceSort === "none";

  function togglePriceSort() {
    setPriceSort((current) => current === "none" ? "asc" : current === "asc" ? "desc" : "none");
  }

  function productUrl(product: Product) {
    const url = new URL(window.location.href);
    url.searchParams.set("producto", product.id);
    url.hash = "productos";
    return url.toString();
  }

  function openProduct(product: Product) {
    setSelectedProduct(product);
    window.history.replaceState(null, "", productUrl(product));
  }

  function closeProduct() {
    setSelectedProduct(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("producto");
    url.hash = "productos";
    window.history.replaceState(null, "", url);
  }

  async function shareProduct(product: Product) {
    const url = productUrl(product);
    const text = `${product.name} — ${formatGuarani(product.price)}`;

    if (navigator.share) {
      try {
        const response = await fetch(product.image_url);
        if (!response.ok) throw new Error("No se pudo descargar la imagen");
        const blob = await response.blob();
        const extension = blob.type.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
        const safeName = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "producto";
        const image = new File([blob], `${safeName}.${extension}`, { type: blob.type || "image/jpeg" });
        const shareData = { title: product.name, text: `${text}\n${url}`, files: [image] };

        if (!navigator.canShare || navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          await navigator.share({ title: product.name, text, url });
        }
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        try {
          await navigator.share({ title: product.name, text, url });
          return;
        } catch (fallbackError) {
          if (fallbackError instanceof DOMException && fallbackError.name === "AbortError") return;
        }
      }
    }

    window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, "_blank", "noopener,noreferrer");
  }

  useEffect(() => {
    const productId = new URLSearchParams(window.location.search).get("producto");
    if (!productId) return;
    const linkedProduct = products.find((product) => product.id === productId);
    if (linkedProduct) setSelectedProduct(linkedProduct);
  }, [products]);

  useEffect(() => {
    const lastVisit = Number(localStorage.getItem("liz-store-last-visit") || 0);
    if (Date.now() - lastVisit < 30 * 60 * 1000) return;

    let visitorId = localStorage.getItem("liz-store-visitor-id");
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("liz-store-visitor-id", visitorId);
    }

    createClient().rpc("record_page_visit", { tenant_slug: TENANT_SLUG, new_visitor_id: visitorId }).then(({ error }) => {
      if (!error) localStorage.setItem("liz-store-last-visit", String(Date.now()));
    });
  }, []);

  useEffect(() => {
    if (!selectedProduct) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && closeProduct();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProduct]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setTitleIndex((current) => (current + 1) % heroTitles.length), 4000);
    return () => window.clearInterval(timer);
  }, []);

  function renderProducts(items: Product[]) {
    return <div className="grid">
      {items.map((product) => (
        <article className="card" key={product.id}>
          <button className="image-wrap product-image-button" type="button" onClick={() => openProduct(product)} aria-label={`Ampliar foto de ${product.name}`}>
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
    </div>;
  }

  return (
    <>
      <section className="hero">
        <nav className="nav shell">
          <a className="brand brand-logo-link" href="#inicio" aria-label="Liz Store, inicio">
            <Image className="liz-logo" src="/brand/liz-store-logo.png" alt="Liz Store — Moda para toda la familia" width={398} height={230} priority />
          </a>
          <div className="nav-actions">
            <a className="wendelo-credit header-credit" href="https://wendelo.online" target="_blank" rel="noreferrer" aria-label="Producto de WENDELO">
              <Image src="/brand/wendelo-mark.png" alt="" width={20} height={18}/><span>Producto de<br/><strong>wendelo.online</strong></span>
            </a>
            <a className="nav-contact" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp"><Image className="nav-whatsapp-icon" src="/brand/whatsapp.jpg" alt="" width={42} height={42} /></a>
          </div>
        </nav>
        <div className="hero-content shell" id="inicio">
          <div className="official"><span>Representación oficial de</span><Image className="romance-logo" src="/brand/romance-logo.avif" alt="Romance" width={110} height={44} /></div>
          <h1 className="hero-title"><span className="hero-title-slide" key={titleIndex}>{heroTitles[titleIndex].lead}<em>{heroTitles[titleIndex].accent}</em>{"tail" in heroTitles[titleIndex] ? heroTitles[titleIndex].tail : ""}</span></h1>
          <p>Desde 2005, Romance combina calidad, diseño e innovación. Colecciones de moda íntima, fitness y casual, más cerca de vos con atención personal y asesoramiento directo.</p>
          <a className="primary" href="#productos">Ver colección <ArrowRight size={18} /></a>
          <div className="hero-note"><span>Atención personal</span><span>•</span><span>Envíos en Paraguay</span></div>
        </div>
        <WaveAnimation />
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
          <button className={`price-sort ${priceSort !== "none" ? "active" : ""}`} onClick={togglePriceSort} aria-label={priceSort === "none" ? "Ordenar por precio de menor a mayor" : priceSort === "asc" ? "Ordenar por precio de mayor a menor" : "Quitar orden por precio"}>Precio {priceSort === "asc" ? <ArrowUp size={14}/> : priceSort === "desc" ? <ArrowDown size={14}/> : <ArrowUpDown size={14}/>}</button>
        </div>
        {groupedView ? <div className="category-groups">
          {filters.slice(1).map(([value, label]) => {
            const items = shown.filter((product) => product.category === value);
            if (!items.length) return null;
            return <section className="category-section" key={value} aria-labelledby={`category-${value}`}>
              <div className="category-title"><h3 id={`category-${value}`}>{label}</h3><span>{items.length} {items.length === 1 ? "producto" : "productos"}</span></div>
              {renderProducts(items)}
            </section>;
          })}
        </div> : renderProducts(shown)}
      </main>
      <section className="cta"><Image className="cta-background" src="/brand/cta-background.png" alt="" fill sizes="100vw"/><div className="shell cta-content"><span>¿Necesitás ayuda para elegir?</span><h2>Escribile a Liz</h2><p>Atención personalizada y rápida por WhatsApp.</p><a href={whatsappUrl()} target="_blank"><MessageCircle size={19}/> 0993 376 335</a></div></section>
      <footer className="shell"><div className="footer-brand"><Image className="liz-logo footer-logo" src="/brand/liz-store-logo.png" alt="Liz Store" width={318} height={184} /></div><a className="wendelo-credit footer-credit" href="https://wendelo.online" target="_blank" rel="noreferrer"><Image src="/brand/wendelo-mark.png" alt="WENDELO" width={22} height={20}/><span>Producto de<br/><strong>wendelo.online</strong></span></a><div className="footer-romance"><span>Representación oficial de</span><Image src="/brand/romance-logo.avif" alt="Romance" width={88} height={35} /></div></footer>
      {selectedProduct && (
        <div className="product-lightbox" role="dialog" aria-modal="true" aria-label={`Foto ampliada de ${selectedProduct.name}`} onClick={closeProduct}>
          <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button className="lightbox-close" type="button" onClick={closeProduct} aria-label="Cerrar imagen"><X size={22} /></button>
            <div className="lightbox-image">
              <Image src={selectedProduct.image_url} alt={selectedProduct.name} fill sizes="95vw" priority />
            </div>
            <div className="lightbox-caption"><strong>{selectedProduct.name}</strong><span>{formatGuarani(selectedProduct.price)}</span></div>
            <div className="lightbox-actions">
              <button className="lightbox-share" type="button" onClick={() => shareProduct(selectedProduct)}><Share2 size={18} /> Compartir en mi estado</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
