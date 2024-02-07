export interface CartProduct {
  qty: number;
  id: number;
  title: string;
  subtitle: string;
  stock: number;
  price: number;
  coverImgUrl?: string;
}
