import { CartProduct } from "@/types/cart";
import React from "react";

interface Props {
  product: CartProduct;
}

const CartSummaryItem = ({ product }: Props) => {
  return <div>CartSummaryItem</div>;
};

export default CartSummaryItem;
