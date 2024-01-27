import { Subcategory } from "./subcategory";

export interface Category {
  id: number;
  title: string;
  subs: Subcategory[];
}
