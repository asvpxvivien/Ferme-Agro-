import type { Product } from "./cart-context"

export const products: Product[] = [
  {
    id: "1",
    name: "Poulet Fermier",
    category: "Volailles",
    price: 2500, // FCFA - prix unitaire
    unit: "unité",
    image: "/Photo de la ferme/Poule 1.jpg",
    description: "Poulet élevé en plein air, nourri aux grains naturels, sans antibiotiques. Disponible à l'unité ou en gros.",
  },
  {
    id: "2",
    name: "Œufs Frais Bio",
    category: "Œufs",
    price: 2500, // FCFA - prix par plateau
    unit: "plateau (30 œufs)",
    image: "/Photo de la ferme/oeufs.jpg",
    description: "Œufs de poules élevées en liberté, ramassés quotidiennement. Vendus par plateau de 30 œufs.",
  },
  {
    id: "3",
    name: "Lapin Entier",
    category: "Volailles",
    price: 3500, // FCFA - prix unitaire
    unit: "unité",
    image: "/Photo de la ferme/Lapin 1.jpg",
    description: "Lapin fermier élevé naturellement, viande tendre et savoureuse. Disponible à l'unité ou en gros.",
  },
  {
    id: "4",
    name: "Salade Verte Bio",
    category: "Légumes",
    price: 500, // FCFA
    unit: "kg",
    image: "/Photo de la ferme/Legumes 1.jpg",
    description: "Salade fraîche du jour, cultivée sans pesticides. Disponible au détail ou en gros.",
  },
  {
    id: "5",
    name: "Tomates Anciennes",
    category: "Légumes",
    price: 800, // FCFA
    unit: "kg",
    image: "/Photo de la ferme/Legumes 2.jpg",
    description: "Variétés anciennes de tomates, goût authentique. Disponible au détail ou en gros.",
  },
  {
    id: "6",
    name: "Légumes Frais du Potager",
    category: "Légumes",
    price: 600, // FCFA
    unit: "kg",
    image: "/Photo de la ferme/Legumes 3.jpg",
    description: "Mélange de légumes frais, cultivés naturellement. Disponible au détail ou en gros.",
  },
  {
    id: "7",
    name: "Carottes Bio",
    category: "Légumes",
    price: 700, // FCFA
    unit: "kg",
    image: "/Photo de la ferme/Legumes 4.jpg",
    description: "Carottes fraîches et sucrées, cultivées naturellement. Disponible au détail ou en gros.",
  },
  {
    id: "8",
    name: "Légumes Verts",
    category: "Légumes",
    price: 600, // FCFA
    unit: "kg",
    image: "/Photo de la ferme/Legumes 5.jpg",
    description: "Légumes verts frais du jardin, récoltés le matin. Disponible au détail ou en gros.",
  },
  {
    id: "9",
    name: "Courgettes",
    category: "Légumes",
    price: 650, // FCFA
    unit: "kg",
    image: "/Photo de la ferme/Legumes 6.jpg",
    description: "Courgettes tendres et savoureuses du potager. Disponible au détail ou en gros.",
  },
  {
    id: "10",
    name: "Lapin avec Bébés",
    category: "Volailles",
    price: 8000, // FCFA
    unit: "ensemble",
    image: "/Photo de la ferme/Lapin & bébé 1.jpg",
    description: "Lapin fermier avec petits, élevage naturel. Vendu en ensemble familial.",
  },
  {
    id: "11",
    name: "Lapin Fermier Premium",
    category: "Volailles",
    price: 3800, // FCFA
    unit: "unité",
    image: "/Photo de la ferme/Lapin 2.jpg",
    description: "Lapin de qualité supérieure, viande tendre. Disponible à l'unité ou en gros.",
  },
  {
    id: "12",
    name: "Poulet de Qualité",
    category: "Volailles",
    price: 2800, // FCFA
    unit: "unité",
    image: "/Photo de la ferme/Poule 3.jpg",
    description: "Poulet fermier de haute qualité, élevé avec soin. Disponible à l'unité ou en gros.",
  },
]

export const categories = ["Tous", "Volailles", "Œufs", "Légumes"]
