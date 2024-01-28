import ProductManagement from "@/components/Staff/Products/ProductManagement/ProductManagement";
import { getCategories } from "@/lib/services/category";
import { getProducts } from "@/lib/services/product";
import { Category } from "@/types/category";
import { Features, Product } from "@/types/product";
import React from "react";

const Products = async () => {
  const loadedCategories = await getCategories();
  const loadedProducts = await getProducts();
  console.log(loadedProducts);

  const categories: Category[] | undefined = loadedCategories?.map((item) => ({
    id: item.id,
    title: item.title,
    subs: item.subcategories.map((sub) => ({ id: sub.id, title: sub.title })),
  }));

  const products: Product[] | undefined = loadedProducts?.map((item) => {
    const product: Product = {
      id: item.id,
      recommended: item.recommended,
      title: item.title,
      description: item.description,
      rating: item.rating.toNumber(),
      imageUrls: item.imageUrls,
      features: item.features as Features,
      subcategory: {
        id: item.subcategory.id,
        title: item.subcategory.title,
        category: {
          id: item.subcategory.category.id,
          title: item.subcategory.category.title,
          subs: [],
        },
      },
      variants: item.products.map((variant) => ({
        id: variant.id,
        title: variant.title,
        stock: variant.stock,
        price: variant.price.toNumber(),
      })),
    };
    return product;
  });

  console.log(products);

  return <ProductManagement categories={categories} products={products} />;
};

export default Products;
