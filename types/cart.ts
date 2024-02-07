export interface CartProduct {
  qty: number;
  id: number;
  productGroupId?: number;
  title: string;
  subtitle: string;
  stock: number;
  price: number;
  coverImgUrl?: string;
}
