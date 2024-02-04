export enum SortBy {
  NEW_ASC,
  NEW_DESC,
  BEST_RATING_ASC,
  BEST_RATING_DESC,
}

export interface FilterOptions {
  categoryId?: number;
  categoryIndex?: number;
  subcategoryId?: number;
  sortBy?: SortBy;
  page?: number;
  pageSize?: number;
  totalPages?: number;
}
