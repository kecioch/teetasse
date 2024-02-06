"use client";

import { Category } from "@/types/category";
import { Product } from "@/types/product";
import React, { useEffect, useRef, useState } from "react";
import ProductList from "./ProductList";
import CatalogFilter from "./CatalogFilter";
import useFetch from "@/hooks/useFetch";
import { FilterOptions, SortBy } from "@/types/filterOptions";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Pagination } from "flowbite-react";

interface Props {
  initProducts?: Product[];
  initFilter?: FilterOptions;
  categories?: Category[];
}

const Catalog = ({ initProducts = [], categories = [], initFilter }: Props) => {
  const { fetch, isFetching } = useFetch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchRefresh = useRef<boolean>(false);

  const initCategoryId: number | undefined = initFilter?.categoryId;

  const initCategory: Category | undefined = initCategoryId
    ? categories.find((el) => el.id === initCategoryId)
    : undefined;

  const initCategoryIndex = initCategory
    ? categories.findIndex((el) => el.id === initCategory.id)
    : undefined;

  const initSubcategoryId: number | undefined = initFilter?.subcategoryId;
  // const initSubcategory = initCategory
  //   ? (initFilter?.subcategoryId &&
  //       initCategory.subs.find((el) => el.id === initFilter.subcategoryId)) ||
  //     (initCategory.subs.length > 0 ? initCategory.subs[0] : undefined)
  //   : undefined;

  const [filter, setFilter] = useState<FilterOptions>({
    categoryId: initCategory ? initCategoryId : undefined,
    categoryIndex: initCategoryIndex,
    // subcategoryId: initSubcategory ? initSubcategory.id : undefined,
    subcategoryId: initSubcategoryId,
    sortBy: initFilter?.sortBy || SortBy.NEW_DESC,
    page: initFilter?.page,
    pageSize: initFilter?.pageSize,
    totalPages: initFilter?.totalPages,
    search: initFilter?.search,
  });

  const [products, setProducts] = useState<Product[]>(initProducts);

  const handleChangeFilter = (options: FilterOptions) => {
    const newFilter = { ...filter, ...options };
    setFilter((prev) => ({ ...prev, ...options }));

    const params = new URLSearchParams();
    if (newFilter.categoryId !== undefined)
      params.set("categoryId", newFilter.categoryId.toString());
    if (newFilter.subcategoryId !== undefined)
      params.set("subcategoryId", newFilter.subcategoryId.toString());
    if (newFilter.sortBy !== undefined)
      params.set("sortBy", newFilter.sortBy.toString());
    if (newFilter.page) params.set("page", newFilter.page.toString());
    if (newFilter.pageSize)
      params.set("pageSize", newFilter.pageSize.toString());
    if (newFilter.search) params.set("search", newFilter.search);

    router.push(pathname + "?" + params.toString());

    fetch
      .get(
        `/api/products?${
          newFilter.search ? "search=" + newFilter.search : ""
        }&categoryId=${newFilter.categoryId}&subcategoryId=${
          newFilter.subcategoryId
        }&sortBy=${newFilter.sortBy}&page=${newFilter.page}&pageSize=${
          newFilter.pageSize
        }`
      )
      .then((res) => {
        if (res.status !== 200) return;
        const newProducts = res.data.products;
        const page = res.data.page;
        const pageSize = res.data.pageSize;
        const totalPages = res.data.totalPages;
        setFilter((prev) => ({ ...prev, page, pageSize, totalPages }));
        setProducts(newProducts);
      });
  };

  const handleChangePage = (page: number) => {
    if (isFetching || page === filter.page) return;
    handleChangeFilter({ page });
  };

  useEffect(() => {
    // GET PARAMS
    const refresh = searchParams.get("refresh");
    const search = searchParams.get("search") || undefined;
    const categoryId = searchParams.get("categoryId") || undefined;
    const subcategoryId = searchParams.get("subcategoryId") || undefined;
    const page = searchParams.get("page") || undefined;
    const sortBy = searchParams.get("sortBy") || undefined;

    if (!searchRefresh.current) {
      searchRefresh.current = true;
      return;
    }
    if (!refresh || refresh !== "true") return;

    // REMOVE REFFRESH
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete("refresh");
    router.replace(pathname + "?" + current.toString());

    // HANDLECHANGEFILTER
    const categoryIdNumber = categoryId ? parseInt(categoryId) : undefined;
    const categoryIndex = categoryId
      ? categories.findIndex((el) => el.id === categoryIdNumber)
      : undefined;
    handleChangeFilter({
      search,
      categoryId: categoryIdNumber,
      categoryIndex,
      subcategoryId: subcategoryId ? parseInt(subcategoryId) : undefined,
      page: page ? parseInt(page) : undefined,
      sortBy: sortBy ? parseInt(sortBy) : 1,
    });
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center">
      {filter.search && (
        <p className="text-2xl mb-10 w-full font-extralight">
          <span className="uppercase">Suchergebnisse für:</span> {filter.search}
        </p>
      )}
      <CatalogFilter
        categories={categories}
        isLoading={isFetching}
        filter={filter}
        onChange={handleChangeFilter}
        className="w-full"
      />
      <ProductList
        products={products}
        className="mt-10 min-h-[25em] w-full"
        isLoading={isFetching}
      />
      {filter.totalPages && filter.totalPages > 1 ? (
        <Pagination
          currentPage={filter.page || 1}
          totalPages={filter.totalPages || 1}
          onPageChange={handleChangePage}
          className="mt-10"
        />
      ) : null}
    </div>
  );
};

export default Catalog;
