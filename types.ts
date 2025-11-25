export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  tiktok: string;
  phone: string;
}

export interface LocationCoords {
  lat: number;
  lng: number;
}