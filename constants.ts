import { LocationCoords, Product, SocialLinks } from "./types";

export const SOCIAL_LINKS: SocialLinks = {
  instagram: "https://www.instagram.com/sami_fragrance01",
  facebook: "https://www.facebook.com/alexandr.fragrance",
  tiktok: "https://tiktok.com/@sami_fragrance",
  phone: "50997060"
};

// Coordinates provided: 36.80919632774013, 10.18100838824717
export const STORE_LOCATION: LocationCoords = {
  lat: 36.80919632774013,
  lng: 10.18100838824717
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Nuit de Tunis",
    category: "Homme",
    price: 120,
    description: "Une fragrance intense aux notes de bois de oud et d'ambre.",
    image: "https://picsum.photos/id/103/500/500", // Placeholder representing nature/luxury
    isNew: true
  },
  {
    id: 2,
    name: "Jasmin Royal",
    category: "Femme",
    price: 95,
    description: "La pureté du jasmin tunisien mélangée à la vanille douce.",
    image: "https://picsum.photos/id/21/500/500",
  },
  {
    id: 3,
    name: "Sami Signature",
    category: "Unisexe",
    price: 150,
    description: "Notre best-seller. Un mélange unique d'agrumes et de musc.",
    image: "https://picsum.photos/id/36/500/500",
    isNew: true
  },
  {
    id: 4,
    name: "Ambre Sauvage",
    category: "Homme",
    price: 110,
    description: "Pour l'homme moderne. Notes épicées et cuir.",
    image: "https://picsum.photos/id/48/500/500",
  },
  {
    id: 5,
    name: "Rose d'Orient",
    category: "Femme",
    price: 89,
    description: "Un bouquet floral délicat avec une touche de poivre rose.",
    image: "https://picsum.photos/id/64/500/500",
  },
  {
    id: 6,
    name: "Brise Marine",
    category: "Unisexe",
    price: 75,
    description: "Fraîcheur océanique pour les journées d'été.",
    image: "https://picsum.photos/id/78/500/500",
  }
];