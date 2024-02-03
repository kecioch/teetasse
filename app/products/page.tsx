import Catalog from "@/components/Catalog/Catalog";
import ContentContainer from "@/components/UI/Container/ContentContainer";
import { getCategories } from "@/lib/services/category";
import { getProducts } from "@/lib/services/product";
import React from "react";

const Products = async () => {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <ContentContainer className="mt-12 mb-5 p-4 pt-10">
      <Catalog initProducts={products} categories={categories} />
    </ContentContainer>
  );
};

export default Products;
