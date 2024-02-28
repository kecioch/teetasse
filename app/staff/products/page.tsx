import ProductManagement from "@/components/Staff/Products/ProductManagement/ProductManagement";
import { getCategories } from "@/lib/services/category";
import { getProducts } from "@/lib/services/product";
import { ProductFilterOptions } from "@/types/filterOptions";
import { SearchParams } from "@/types/params/searchParams";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Produktverwaltung",
};

const Products = async ({ searchParams }: { searchParams: SearchParams }) => {
  // GET SEARCH PARAMS
  const sortBy =
    searchParams.sortBy && typeof searchParams.sortBy === "string"
      ? parseInt(searchParams.sortBy)
      : undefined;
  const pageParam =
    searchParams.page && typeof searchParams.page === "string"
      ? parseInt(searchParams.page)
      : undefined;
  const pageSizeParam =
    searchParams.pageSize && typeof searchParams.pageSize === "string"
      ? parseInt(searchParams.pageSize)
      : undefined;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  // CREATE FILTER
  const filter: ProductFilterOptions = {
    sortBy,
    page: pageParam,
    pageSize: pageSizeParam,
    search,
  };

  // FETCH DATA
  const { products, page, pageSize, totalPages } = await getProducts(filter);
  filter.page = page || 0;
  filter.pageSize = pageSize || 0;
  filter.totalPages = totalPages || 0;
  const categories = await getCategories();

  return (
    <ProductManagement
      categories={categories}
      initProducts={products}
      initFilter={filter}
    />
  );
};

export default Products;
