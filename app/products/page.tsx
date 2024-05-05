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
  console.log(filter);
  // FETCH DATA
  // const { products, page, totalPages, pageSize } = await getProducts(filter);

  // const res = await fetch(
  //   `/api/products?${
  //     filter.search ? "search=" + filter.search : ""
  //   }&categoryId=${filter.categoryId}&subcategoryId=${
  //     filter.subcategoryId
  //   }&sortBy=${filter.sortBy}&page=${filter.page}&pageSize=${
  //     filter.pageSize
  //   }`
  // )
  var params = `${
    filter.search != undefined ? `search=${filter.search}&` : ""
  }`;
  params = params.concat(
    `${
      filter.categoryId != undefined ? `categoryId=${filter.categoryId}&` : ""
    }`
  );
  params = params.concat(
    `${
      filter.subcategoryId != undefined
        ? `subcategoryId=${filter.subcategoryId}&`
        : ""
    }`
  );
  params = params.concat(
    `${filter.sortBy != undefined ? `sortBy=${filter.sortBy}&` : ""}`
  );
  params = params.concat(
    `${filter.page != undefined ? `page=${filter.page}&` : ""}`
  );
  params = params.concat(
    `${filter.pageSize != undefined ? `pageSize=${filter.pageSize}` : ""}`
  );

  console.log("PARAMS", params);
  const res = await fetch(`${process.env.BASE_URL}/api/products?${params}`, {
    next: { revalidate: 3600 },
  });
  if (res.status !== 200) return;

  const data = await res.json();

  // {
  //   const newProducts = res.data.products;
  //   const page = res.data.page;
  //   const pageSize = res.data.pageSize;
  //   const totalPages = res.data.totalPages;
  //   setFilter((prev) => ({ ...prev, page, pageSize, totalPages }));
  //   setProducts(newProducts);
  // });

  filter.page = data.page || 0;
  filter.pageSize = data.pageSize || 0;
  filter.totalPages = data.totalPages || 0;
  const categories = await getCategories();

  return (
    <ContentContainer className="mt-12 mb-5 p-4 pt-10">
      <Catalog
        initProducts={data.products}
        initFilter={filter}
        categories={categories}
      />
    </ContentContainer>
  );
};

export default Products;
