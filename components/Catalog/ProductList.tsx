import { Product } from "@/types/product";
import React from "react";
import ProductItem from "./ProductItem";
import { Spinner } from "flowbite-react";

interface Props {
  products?: Product[];
  className?: string;
  isLoading?: boolean;
}

const ProductList = ({
  products = [],
  className,
  isLoading = false,
}: Props) => {
  return (
    <div
      className={`flex flex-row gap-3 flex-wrap ${
        (isLoading || products.length <= 0) && "items-center"
      } ${className}`}
    >
      {isLoading && (
        <div className="w-full flex justify-center">
          <Spinner size="xl" className="fill-green-600" />
        </div>
      )}
      {!isLoading && products.length <= 0 && (
        <p className="text-center flex-1 text-2xl text-gray-500 font-light">
          Keine Produkte verfügbar
        </p>
      )}
      {!isLoading &&
        products.map((product, index) => (
          <ProductItem key={index} data={product} />
        ))}
    </div>
  );
};

export default ProductList;
