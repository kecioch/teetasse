"use client";

import React, { useState } from "react";
import AddCartButton from "./UI/AddCartButton";
import { Product } from "@/types/product";
import SelectVariant from "./UI/SelectVariant";
import { useAppDispatch } from "@/redux/hooks";
import { CartProduct } from "@/types/cart";
import { addProduct } from "@/redux/features/cartSlice";

interface Props {
  product: Product;
  className?: string;
}

const ProductToCart = ({ product, className }: Props) => {
  const dispatch = useAppDispatch();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(
    product.variants.findIndex((item) => item.stock > 0)
  );

  const handleSelectVariant = (index: number) => {
    setSelectedVariantIndex(index);
  };

  const handleAddToCart = (qty: number) => {
    const variant = product.variants[selectedVariantIndex];
    if (!variant || !variant.id) return;

    const coverUrl =
      product.imageIds.length > 0
        ? `${process.env.NEXT_PUBLIC_CLOUDINARY_PREFIX}/${product.imageIds[0]}`
        : undefined;

    const cartProduct: CartProduct = {
      id: variant.id,
      productGroupId: product.id,
      title: product.title,
      subtitle: variant.title,
      stock: variant.stock,
      price: variant.price,
      coverImgUrl: coverUrl,
      qty,
    };
    dispatch(addProduct(cartProduct));
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
