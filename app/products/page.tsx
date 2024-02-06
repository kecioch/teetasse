import Catalog from "@/components/Catalog/Catalog";
import ContentContainer from "@/components/UI/Container/ContentContainer";
import { getCategories } from "@/lib/services/category";
import { getProducts } from "@/lib/services/product";
import { FilterOptions } from "@/types/filterOptions";
import { SearchParams } from "@/types/params/searchParams";
import React from "react";

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
  const filter: FilterOptions = {
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
