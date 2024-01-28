import { Subcategory } from "./subcategory";

export interface Variant {
  id?: number;
  title: string;
  stock: number;
  price: number;
}

export interface Features {
  [key: string]: {
    [subKey: string]: string;
  };
}

export interface Product {
  id?: number;
  title: string;
  description: string;
  rating: number;
  recommended: boolean;
  features: Features;
  subcategory?: Subcategory;
  subcategoryId?: number;
  imageUrls: string[];
  variants: Variant[];
}
