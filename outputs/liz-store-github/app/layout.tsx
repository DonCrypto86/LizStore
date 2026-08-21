import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liz Store Paraguay | Moda para toda la familia",
  description: "Productos Romance y moda para mujeres, hombres y niños. Consultas y pedidos directamente por WhatsApp en Paraguay.",
  openGraph: {
    title: "Liz Store Paraguay",
    description: "Moda para toda la familia · Pedidos por WhatsApp",
    locale: "es_PY",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
