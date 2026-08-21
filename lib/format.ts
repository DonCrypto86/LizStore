export const formatGuarani = (value: number) => `Gs. ${new Intl.NumberFormat("es-PY").format(value)}`;

export function whatsappUrl(name?: string, reference?: string, price?: number) {
  const base = name
    ? `Hola Liz, me interesa este producto: ${name} - Ref. ${reference} - ${formatGuarani(price ?? 0)}`
    : "Hola Liz, quisiera consultar por los productos de Liz Store.";
  return `https://wa.me/595993376335?text=${encodeURIComponent(base)}`;
}
