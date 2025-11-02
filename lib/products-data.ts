import type { Product } from "./cart-context"

export const products: Product[] = [
  {
    id: "1",
    name: "Poulet Fermier",
    category: "Volailles",
    price: 8000, // FCFA
    unit: "kg",
    image: "/Photo de la ferme/Poule 1.jpg",
    description: "Poulet élevé en plein air, nourri aux grains naturels, sans antibiotiques",
  },
  {
    id: "2",
    name: "Œufs Frais Bio",
    category: "Œufs",
    price: 3000, // FCFA
    unit: "boîte de 6",
    image: "/Photo de la ferme/oeufs.jpg",
    description: "Œufs de poules élevées en liberté, ramassés quotidiennement",
  },
  {
    id: "3",
    name: "Lapin Entier",
    category: "Volailles",
    price: 10000, // FCFA
    unit: "kg",
    image: "/Photo de la ferme/Lapin 1.jpg",
    description: "Lapin fermier élevé naturellement, viande tendre et savoureuse",
  },
  {
    id: "4",
    name: "Salade Verte Bio",
    category: "Légumes",
    price: 1500, // FCFA
    unit: "pièce",
    image: "/Photo de la ferme/Legumes 1.jpg",
    description: "Salade fraîche du jour, cultivée sans pesticides",
  },
  {
    id: "5",
    name: "Tomates Anciennes",
    category: "Légumes",
    price: 3000, // FCFA
    unit: "kg",
    image: "/Photo de la ferme/Legumes 2.jpg",
    description: "Variétés anciennes de tomates, goût authentique",
  },
  {
    id: "6",
    name: "Légumes Frais du Potager",
    category: "Légumes",
    price: 2500, // FCFA
    unit: "kg",
    image: "/Photo de la ferme/Legumes 3.jpg",
    description: "Mélange de légumes frais, cultivés naturellement",
  },
  {
    id: "7",
    name: "Carottes Bio",
    category: "Légumes",
    price: 2000, // FCFA
    unit: "kg",
    image: "/Photo de la ferme/Legumes 4.jpg",
    description: "Carottes fraîches et sucrées, cultivées naturellement",
  },
  {
    id: "8",
    name: "Légumes Verts",
    category: "Légumes",
    price: 1800, // FCFA
    unit: "kg",
    image: "/Photo de la ferme/Legumes 5.jpg",
    description: "Légumes verts frais du jardin, récoltés le matin",
  },
  {
    id: "9",
    name: "Courgettes",
    category: "Légumes",
    price: 1800, // FCFA
    unit: "kg",
    image: "/Photo de la ferme/Legumes 6.jpg",
    description: "Courgettes tendres et savoureuses du potager",
  },
  {
    id: "10",
    name: "Lapin avec Bébés",
    category: "Volailles",
    price: 12000, // FCFA
    unit: "ensemble",
    image: "/Photo de la ferme/Lapin & bébé 1.jpg",
    description: "Lapin fermier avec petits, élevage naturel",
  },
  {
    id: "11",
    name: "Lapin Fermier Premium",
    category: "Volailles",
    price: 10500, // FCFA
    unit: "kg",
    image: "/Photo de la ferme/Lapin 2.jpg",
    description: "Lapin de qualité supérieure, viande tendre",
  },
  {
    id: "12",
    name: "Poulet de Qualité",
    category: "Volailles",
    price: 8500, // FCFA
    unit: "kg",
    image: "/Photo de la ferme/Poule 3.jpg",
    description: "Poulet fermier de haute qualité, élevé avec soin",
  },
]

export const categories = ["Tous", "Volailles", "Œufs", "Légumes"]
