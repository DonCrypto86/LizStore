import Image from "next/image";
import { ArrowRight, BarChart3, Building2, Check, ChevronDown, Clock3, MessageCircle, Palette, Share2, Smartphone, Store, TrendingUp, Users } from "lucide-react";
import DemoSection from "./DemoSection";

const contactUrl = "https://michael-iseli.online/es/#contact";

const steps = [
["01", "Cargás tus productos", "Fotos, precios y detalles, todo desde un panel simple."],
["02", "Compartís un solo enlace", "Tu catálogo siempre actualizado, sin reenviar listas ni fotos."],
["03", "Tu cliente elige", "Mira, filtra y abre el producto desde cualquier celular."],
["04", "La consulta llega a WhatsApp", "Con el producto ya identificado para atender más rápido."],
];

const faqs = [
["¿Es una tienda online?", "No. WENDELO es un catálogo digital pensado para facilitar la venta por WhatsApp, sin carrito ni pagos complicados."],
["¿Puedo actualizar mis productos?", "Sí. Tenés un área privada para agregar, editar, ocultar o eliminar productos cuando quieras."],
["¿Necesito conocimientos técnicos?", "No. El panel está pensado para que cualquier persona pueda manejarlo desde el celular o la computadora."],
["¿WENDELO reemplaza WhatsApp?", "No. Lo complementa: organiza tus productos y lleva cada consulta directamente a tu WhatsApp."],
];

export default function Home() {
return <main>
<header className="nav shell">
<a href="#inicio" className="brand" aria-label="WENDELO inicio">
<Image className="brandSymbol" src="/brand/wendelo-symbol.png" alt="" width={58} height={58} priority />
<Image className="brandWordmark" src="/brand/wendelo-wordmark.png" alt="WENDELO" width={300} height={74} priority />
</a>
<nav><a href="#como-funciona">Cómo funciona</a><a href="#soluciones">Soluciones</a><a href="#preguntas">Preguntas</a></nav>
<a className="navCta" href="https://wa.me/595983048976" target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.48 1.32 5L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.24 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01a.93.93 0 0 0-.67.31c-.23.25-.87.85-.87 2.08 0 1.22.89 2.4 1.01 2.57.12.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.43.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29z"/></svg></a>
</header>

<section className="hero shell" id="inicio">
<div className="heroCopy">
<span className="eyebrow">CATÁLOGOS DIGITALES PARA VENDER POR WHATSAPP</span>
<h1><em>Por qué subir 30 fotos a tu Estado</em><span>si un solo enlace basta para guiar a tus clientes?</span></h1>
<p>Compartí solamente un flyer o un producto en oferta. Tus contactos abren el enlace y descubren todo tu catálogo, siempre disponible y actualizado.</p>
<div className="actions"><a className="primary" href={contactUrl} target="_blank">Quiero mi catálogo <ArrowRight size={19}/></a><a className="secondary" href="#como-funciona">Ver cómo funciona</a></div>
<div className="trust"><span><Check/> Diseño personalizado</span><span><Check/> Administración simple</span><span><Check/> Hecho para Paraguay</span></div>
</div>
<div className="heroVisual" aria-label="Vista previa de un catálogo WENDELO">
<div className="glow"></div>
<div className="phone videoPhone">
<video className="phoneVideo" autoPlay muted loop playsInline preload="metadata" aria-label="Demostración del catálogo Liz-Store">
<source src="/media/liz-store-demo.mp4" type="video/mp4" />
</video>
</div>
<div className="floating sequence one"><Share2/> Compartí por WhatsApp</div>
<div className="floating sequence two"><BarChart3/> Fácil de administrar</div>
<div className="floating sequence three"><Clock3/> Ahorrá tiempo</div>
<div className="floating sequence four"><TrendingUp/> Optimizá tus ventas</div>
</div>
</section>

<section className="problem">
<div className="shell problemGrid"><div><span className="eyebrow">MENOS CAOS, MÁS VENTAS</span><h2>Nadie quiere mirar una docena de fotos en tu Estado.</h2></div><div><p>Los Estados desaparecen a las 24 horas y tenés que volver a publicar todo, una y otra vez.</p><p className="accent">Con WENDELO compartís tu catálogo una sola vez: tus contactos lo descubren solos, vos ahorrás horas de trabajo cada semana, y tu marca se presenta siempre prolija y profesional. Y como nadie se pierde ningún producto, te llegan más consultas — y vendés más.</p></div></div>
</section>

<section className="how shell" id="como-funciona">
<div className="sectionHead"><span className="eyebrow">SIMPLE DESDE EL PRIMER DÍA</span><h2>Así funciona WENDELO</h2><p>Sin complicaciones técnicas. Una herramienta práctica para vender como ya vendés, pero mucho mejor organizada.</p></div>
<div className="steps">{steps.map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
</section>

<section className="solutions" id="soluciones"><div className="shell">
<div className="sectionHead center"><span className="eyebrow">DOS SOLUCIONES, UNA MISMA IDEA</span><h2>Elegí el WENDELO que acompaña tu negocio</h2></div>
<div className="plans">
<article className="plan featured"><div className="planIcon"><Store/></div><span className="tag">PARA EMPRENDEDORES Y COMERCIOS</span><h3>WENDELO</h3><p>Tu catálogo digital personalizado para mostrar productos y recibir consultas por WhatsApp.</p><ul><li><Check/> Tu catálogo completo y organizado</li><li><Check/> Diseño con tu logo y colores</li><li><Check/> Panel privado de administración</li><li><Check/> Filtros, precios y botón de WhatsApp</li><li><Check/> Primer año incluido</li></ul><div className="price"><small>IMPLEMENTACIÓN ÚNICA</small><strong>Gs. 600.000</strong><span>Desde el segundo año: Gs. 180.000/año</span></div><a href={contactUrl} target="_blank">Quiero mi WENDELO <ArrowRight/></a></article>
<article className="plan enterprise"><div className="planIcon"><Building2/></div><span className="tag">PARA EQUIPOS DE VENTA Y EMPRESAS</span><h3>WENDELO <em>EMPRESAS</em></h3><p>Catálogos personales para cada vendedor, con imagen unificada y gestión central para toda la empresa.</p><ul><li><Check/> Un catálogo por vendedor</li><li><Check/> Gestión centralizada de productos</li><li><Check/> Identidad visual consistente</li><li><Check/> Métricas por vendedor o campaña</li><li><Check/> Implementación mediante piloto</li></ul><div className="enterpriseNote"><Users/><div><strong>Propuesta a medida</strong><span>Definimos juntos el alcance ideal para tu equipo.</span></div></div><a href={contactUrl} target="_blank">Solicitar una demostración <ArrowRight/></a></article>
</div>
</div></section>

<section className="benefits shell"><div className="benefitVisual"><div className="benefitLogo"><Image src="/brand/wendelo-symbol.png" alt="Símbolo WENDELO" width={260} height={260}/></div></div><div><span className="eyebrow">PENSADO PARA VENDER CERCA</span><h2>Tu vidriera digital, en el bolsillo de cada cliente.</h2><div className="benefitList"><article><Smartphone/><div><h3>Siempre disponible</h3><p>Un enlace permanente que funciona en cualquier celular.</p></div></article><article><Palette/><div><h3>Tu propia identidad</h3><p>Diseño adaptado a los colores, logo y estilo de tu negocio.</p></div></article><article><MessageCircle/><div><h3>Atención personal</h3><p>Cada consulta llega directamente a tu WhatsApp.</p></div></article></div></div></section>

<DemoSection/>

<section className="faq shell" id="preguntas"><div className="sectionHead"><span className="eyebrow">PREGUNTAS FRECUENTES</span><h2>Todo lo que necesitás saber</h2></div><div className="faqList">{faqs.map(([q,a]) => <details key={q}><summary>{q}<ChevronDown/></summary><p>{a}</p></details>)}</div></section>

<section className="finalCta"><div className="shell"><Image src="/brand/wendelo-symbol.png" alt="" width={70} height={70}/><span className="eyebrow">EMPEZÁ A MOSTRAR MEJOR</span><h2>Tu próximo cliente ya está en WhatsApp.</h2><p>Dale una forma más simple de descubrir todo lo que vendés.</p><a className="primary" href={contactUrl} target="_blank">Crear mi catálogo <ArrowRight/></a></div></section>

<footer className="shell">
<div className="footerTop">
<div className="footerWendelo">
<div className="footerBrand">
<Image src="/brand/wendelo-symbol.png" alt="" width={58} height={58}/>
<Image src="/brand/wendelo-wordmark.png" alt="WENDELO" width={155} height={39}/>
</div>
<p>Catálogos digitales para vender por WhatsApp.</p>
</div>
<a className="footerCreator" href="https://michael-iseli.online/es" target="_blank">
<span>WENDELO es un producto de</span>
<Image src="/brand/michael-iseli-logo.webp" alt="Michael Iseli" width={280} height={75}/>
</a>
</div>
<p className="footerCopyright">© 2026 WENDELO. Todos los derechos reservados.</p>
</footer>
</main>;
}
