"use client";

import React, { useState } from "react";
import AddCartButton from "./UI/AddCartButton";
import { Product } from "@/types/product";
import SelectVariant from "./UI/SelectVariant";

interface Props {
  product: Product;
  className?: string;
}

const ProductToCart = ({ product, className }: Props) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(
    product.variants.findIndex((item) => item.stock > 0)
  );

  const handleSelectVariant = (index: number) => {
    setSelectedVariantIndex(index);
  };

  const handleAddToCart = (qty: number) => {
    console.log(
      `ADD TO CART: ${product.title} / ${product.variants[selectedVariantIndex].title} (${qty})`
    );
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <SelectVariant
        variants={product.variants}
        className="inline-block w-[80%]"
        value={selectedVariantIndex}
        onChange={handleSelectVariant}
      />
      {selectedVariantIndex >= 0 ? (
        <AddCartButton
          className="mt-5 w-full"
          variant={product.variants[selectedVariantIndex]}
          onClick={handleAddToCart}
        />
      ) : (
        <p className="mt-2 text-red-500 font-light">
          Der Artikel ist nicht mehr vorrätig
        </p>
      )}
    </div>
  );
};

export default ProductToCart;
