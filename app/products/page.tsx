import Catalog from "@/components/Catalog/Catalog";
import ContentContainer from "@/components/UI/Container/ContentContainer";
import { getCategories } from "@/lib/services/category";
import { getProducts } from "@/lib/services/product";
import { ProductFilterOptions } from "@/types/filterOptions";
import { SearchParams } from "@/types/params/searchParams";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Katalog",
  openGraph: {
    title: "Katalog",
    description:
      "Die Kunst des Teetrinkens - Erlesene Auswahl, unvergleichlicher Genuss!",
    siteName: "Teetasse",
    url: process.env.BASE_URL + "/products",
    type: "website",
  },
};

const Products = async ({ searchParams }: { searchParams: SearchParams }) => {
  // GET SEARCH PARAMS
  const categoryId =
    searchParams.categoryId && typeof searchParams.categoryId === "string"
      ? parseInt(searchParams.categoryId)
      : undefined;
  const subcategoryId =
    searchParams.subcategoryId && typeof searchParams.subcategoryId === "string"
      ? parseInt(searchParams.subcategoryId)
      : undefined;
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
    categoryId,
    subcategoryId,
    sortBy,
    page: pageParam,
    pageSize: pageSizeParam,
    search,
  };

  // FETCH DATA
  const { products, page, totalPages, pageSize } = await getProducts(filter);

  filter.page = page || 0;
  filter.pageSize = pageSize || 0;
  filter.totalPages = totalPages || 0;
  const categories = await getCategories();

  return (
    <ContentContainer className="mt-12 mb-5 p-4 pt-10">
      <Catalog
        initProducts={products}
        initFilter={filter}
        categories={categories}
      />
    </ContentContainer>
  );
};

export default Products;
