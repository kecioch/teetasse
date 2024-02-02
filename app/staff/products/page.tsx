import ProductManagement from "@/components/Staff/Products/ProductManagement/ProductManagement";
import { getCategories } from "@/lib/services/category";
import { getProducts } from "@/lib/services/product";
import React from "react";

const Products = async () => {
  const categories = await getCategories();
  const products = await getProducts();

  return <ProductManagement categories={categories} products={products} />;
};

export default Products;
