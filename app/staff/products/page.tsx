import ProductManagement from "@/components/Staff/Products/ProductManagement/ProductManagement";
import { getCategories } from "@/lib/services/category";
import { Category } from "@/types/category";
import React from "react";

const Products = async () => {
  const loadedCategories = await getCategories();

  const categories: Category[] | undefined = loadedCategories?.map((item) => ({
    id: item.id,
    title: item.title,
    subs: item.subcategories.map((sub) => ({ id: sub.id, title: sub.title })),
  }));
  console.log(categories);

  return <ProductManagement categories={categories} />;
};

export default Products;
