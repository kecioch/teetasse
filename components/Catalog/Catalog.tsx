"use client";

import { Category } from "@/types/category";
import { Product } from "@/types/product";
import React, { useState } from "react";
import ProductList from "./ProductList";
import CatalogFilter from "./CatalogFilter";

interface Props {
  initProducts?: Product[];
  categories?: Category[];
}

const Catalog = ({ initProducts = [], categories = [] }: Props) => {
  const [products, setProducts] = useState<Product[]>(initProducts);
    // const filter


  return (
    <div>
      <CatalogFilter categories={categories} isLoading={false} />
      <ProductList
        products={products}
        className="mt-10 min-h-[25em]"
        isLoading={false}
      />
    </div>
  );
};

export default Catalog;
