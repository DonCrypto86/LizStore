import type { Product } from "./types";

export const demoProducts: Product[] = [
  { id: "1", name: "Conjunto Romance", brand: "Romance", reference: "8120", price: 89000, category: "mujeres", sizes: "M · G · GG", color: "Lavanda", image_url: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80", status: "published", is_new: true, is_offer: false },
  { id: "2", name: "Pijama Confort", brand: "Romance", reference: "4312", price: 125000, category: "mujeres", sizes: "P · M · G", color: "Violeta", image_url: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?auto=format&fit=crop&w=900&q=80", status: "published", is_new: false, is_offer: false },
  { id: "3", name: "Remera Essential", brand: "Romance", reference: "2290", price: 79000, category: "hombres", sizes: "M · G · GG", color: "Natural", image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80", status: "published", is_new: false, is_offer: true },
  { id: "4", name: "Conjunto Mini", brand: "Romance", reference: "1055", price: 69000, category: "ninos", sizes: "4 · 6 · 8", color: "Lila", image_url: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80", status: "published", is_new: true, is_offer: false },
  { id: "5", name: "Top Suave", brand: "Romance", reference: "8174", price: 65000, category: "mujeres", sizes: "P · M · G", color: "Blanco", image_url: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=900&q=80", status: "published", is_new: false, is_offer: false },
  { id: "6", name: "Bóxer Classic", brand: "Romance", reference: "3031", price: 49000, category: "hombres", sizes: "M · G · GG", color: "Negro", image_url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80", status: "published", is_new: false, is_offer: false }
];
