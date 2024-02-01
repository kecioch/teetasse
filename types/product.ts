import { Review } from "./review";
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
  ratingCnt: number;
  recommended: boolean;
  features: Features;
  imageIds: string[];
  variants: Variant[];
  subcategory?: Subcategory;
  subcategoryId?: number;
  reviews?: Review[];
  newImages?: File[];
}
