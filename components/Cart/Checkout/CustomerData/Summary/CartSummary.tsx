"use client";

import { useAppSelector } from "@/redux/hooks";
import React from "react";
import CartProductItem from "../../../CartProductItem";

interface Props {
  className?: string;
}

const CartSummary = ({ className }: Props) => {
  const products = useAppSelector((state) => state.cart.products);
  const isEmpty = products.length <= 0;
  const totalPrice = products
    .reduce((acc, curr) => acc + curr.price * curr.qty, 0)
    .toFixed(2);

  return (
    <div className={`${className}`}>
      <h2 className="uppercase text-xl mb-2">Warenkorb</h2>
      <div
        className={` min-h-32 md:min-h-72 flex flex-col w-full flex-wrap ${
          isEmpty
            ? "justify-center flex-col"
            : "flex-row content-start divide-y-2 divide-dashed"
        }`}
      >
        {products.map((el, index) => (
          <CartProductItem key={index} data={el} className="w-full py-2 h-24" />
        ))}

        {isEmpty && (
          <p className="text-center text-gray-400 font-light text-xl">
            Schade! Dein Warenkorb ist leer
          </p>
        )}
      </div>
      <p className="text-end px-4 font-light text-lg border-t-2 pt-5">
        Gesamtbetrag: <span className="font-medium">{totalPrice}€</span>
      </p>
    </div>
  );
};

export default CartSummary;
