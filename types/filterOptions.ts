export enum ProductSortBy {
  NEW_ASC,
  NEW_DESC,
  BEST_RATING_ASC,
  BEST_RATING_DESC,
}

export enum SortBy {
  NEW_ASC,
  NEW_DESC
}

export interface ProductFilterOptions {
  categoryId?: number;
  categoryIndex?: number;
  subcategoryId?: number;
  sortBy?: ProductSortBy;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  search?: string;
}

export interface OrderFilterOptions {
  sortBy?: SortBy;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  search?: string;
}
