"use client";

import React from "react";
import SelectProduct from "./UI/SelectProduct";
import AddCartButton from "./UI/AddCartButton";
import { Variant } from "@/types/product";

interface Props {
  variants: Variant[];
  className?: string;
}

const ProductToCart = ({ variants, className }: Props) => {

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <SelectProduct products={variants} className="inline-block w-[80%]" />
      <AddCartButton className="mt-5 w-full" />
    </div>
  );
};

export default ProductToCart;
