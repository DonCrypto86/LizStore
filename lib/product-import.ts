import type { Category } from "./types";

export type ProductImport = {
  name: string;
  brand: string;
  reference: string;
  price: number;
  category: Category;
  sizes: string;
  color: string;
  short_note: string;
  image_url: string;
  status: "hidden";
  is_new: boolean;
  is_offer: boolean;
};

const item = (number: number, name: string, brand: string, category: Category, color: string): ProductImport => ({
  name,
  brand,
  reference: `PEND-${String(number).padStart(3, "0")}`,
  price: 0,
  category,
  sizes: "",
  color,
  short_note: "Pendiente de completar",
  image_url: `/products/product-${String(number).padStart(2, "0")}.png`,
  status: "hidden",
  is_new: true,
  is_offer: false
});

export const productImports: ProductImport[] = [
  item(1, "Calza fitness gris", "Fitness", "mujeres", "Gris"),
  item(2, "Remera con limones", "October", "mujeres", "Amarillo"),
  item(3, "Bombacha con encaje", "Romance", "mujeres", "Negro"),
  item(4, "Bóxer clásico", "Euro", "hombres", "Negro"),
  item(5, "Bombacha clásica", "Romance", "mujeres", "Rojo"),
  item(6, "Bombacha clásica", "Romance", "mujeres", "Celeste"),
  item(7, "Soutien con aro", "Romance", "mujeres", "Violeta"),
  item(8, "Bombacha tiro alto", "Romance", "mujeres", "Rojo"),
  item(9, "Conjunto con encaje", "Romance", "mujeres", "Negro"),
  item(10, "Conjunto liso", "Everlast", "mujeres", "Rosa"),
  item(11, "Conjunto con encaje", "Romance", "mujeres", "Negro"),
  item(12, "Bombacha infantil estampada", "RMC Kids", "ninos", "Rosa"),
  item(13, "Bombacha tiro alto", "Warner's", "mujeres", "Negro"),
  item(14, "Bóxer clásico", "Euro", "hombres", "Salmón"),
  item(15, "Bombacha con lazo", "Romance", "mujeres", "Negro"),
  item(16, "Bóxer clásico", "Euro", "hombres", "Azul"),
  item(17, "Bombacha con encaje", "Romance", "mujeres", "Azul oscuro"),
  item(18, "Bóxer clásico", "Euro", "hombres", "Negro"),
  item(19, "Bóxer deportivo", "Jockey", "hombres", "Negro"),
  item(20, "Bombacha tiro alto", "Romance", "mujeres", "Negro"),
  item(21, "Conjunto infantil", "RMC Kids", "ninos", "Rosa"),
  item(22, "Bombacha con encaje", "Romance", "mujeres", "Beige"),
  item(23, "Calza fitness", "Fitness", "mujeres", "Negro"),
  item(24, "Bombacha eco", "Lupo", "mujeres", "Negro")
];
