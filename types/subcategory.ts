import { Category } from "./category";

export interface Subcategory {
  id: number;
  title: string;
  category?: Category;
}
