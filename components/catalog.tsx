"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatGuarani, whatsappUrl } from "@/lib/format";

const filters = [
  ["todos", "Todos"], ["mujeres", "Mujeres"], ["hombres", "Hombres"], ["ninos", "Niños"]
] as const;

export function Catalog({ products }: { products: Product[] }) {
  const [active, setActive] = useState("todos");
  const shown = useMemo(() => products.filter((p) => active === "todos" || p.category === active), [active, products]);

  return (
    <>
      <section className="hero">
        <nav className="nav shell">
          <a className="brand brand-logo-link" href="#inicio" aria-label="Liz Store, inicio">
            <Image className="liz-logo" src="/brand/liz-store-logo.png" alt="Liz Store — Moda para toda la familia" width={398} height={230} priority />
          </a>
          <a className="nav-contact" href={whatsappUrl()} target="_blank"><MessageCircle size={18} /> Consultar</a>
        </nav>
        <div className="hero-content shell" id="inicio">
          <div className="official"><span>Representación oficial de</span><Image className="romance-logo" src="/brand/romance-logo.avif" alt="Romance" width={110} height={44} /></div>
          <h1>Tu estilo,<br/><em>más cerca.</em></h1>
          <p>Prendas elegidas para toda la familia. Mirá, elegí y consultá directamente con Liz por WhatsApp.</p>
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
        </div>
        <div className="grid">
          {shown.map((product) => (
            <article className="card" key={product.id}>
              <div className="image-wrap">
                <Image src={product.image_url} alt={product.name} fill sizes="(max-width: 640px) 50vw, 33vw" />
                <div className="badges">{product.is_new && <span>Nuevo</span>}{product.is_offer && <span>Oferta</span>}</div>
              </div>
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
    </>
  );
}
