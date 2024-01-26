export interface Category {
  id: number;
  title: string;
  subs: { id: number; title: string }[];
}
