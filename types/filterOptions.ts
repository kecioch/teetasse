import { DeliveryState, OrderState, PaymentState } from "@prisma/client";

export enum ProductSortBy {
  NEW_ASC,
  NEW_DESC,
  BEST_RATING_ASC,
  BEST_RATING_DESC,
}

export enum SortBy {
  NEW_ASC,
  NEW_DESC,
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

export interface StateFilter {
  orderState: OrderState[];
  paymentState: PaymentState[];
  deliveryState: DeliveryState[];
}

export interface OrderFilterOptions {
  sortBy?: SortBy;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  search?: string;
  states?: StateFilter;
}
