import { Subcategory } from "./subcategory";

export interface Variant {
  id: number;
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
  id: number;
  title: string;
  description: string;
  rating: number;
  features: Features;
  subcategory: Subcategory;
  imageUrls: string[];
  variants: Variant[];
}
