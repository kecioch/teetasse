import OrdersManagement from "@/components/Staff/Orders/OrdersManagement";
import { getOrders } from "@/lib/services/orders";
import { authenticateServer } from "@/services/auth/authentication";
import { OrderFilterOptions, StateFilter } from "@/types/filterOptions";
import { SearchParams } from "@/types/params/searchParams";
import { DeliveryState, OrderState, PaymentState, Role } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const OrderStaffPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  // AUTHENTICATION
  const user = authenticateServer([Role.STAFF, Role.ADMIN]);
  if (!user) redirect("/login");

  // GET SEARCH PARAMS & CONSTRUCT FILTER
  const sortByParam =
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
  const orderStates =
    typeof searchParams.orderStates === "string"
      ? searchParams.orderStates
      : undefined;
  const paymentStates =
    typeof searchParams.paymentStates === "string"
      ? searchParams.paymentStates
      : undefined;
  const deliveryStates =
    typeof searchParams.deliveryStates === "string"
      ? searchParams.deliveryStates
      : undefined;

  const stateFilter: StateFilter = {
    orderState: orderStates
      ? orderStates
          .split(",")
          .map((el) => OrderState[el as keyof typeof OrderState])
      : [],
    paymentState: paymentStates
      ? paymentStates
          .split(",")
          .map((el) => PaymentState[el as keyof typeof PaymentState])
      : [],
    deliveryState: deliveryStates
      ? deliveryStates
          .split(",")
          .map((el) => DeliveryState[el as keyof typeof DeliveryState])
      : [],
  };

  const filter: OrderFilterOptions = {
    sortBy: sortByParam,
    page: pageParam,
    pageSize: pageSizeParam,
    search,
    states: stateFilter,
  };

  // FETCH ORDERS
  const { orders, totalPages, page, pageSize, sortBy } = await getOrders(
    undefined,
    filter
  );
  filter.page = page || 0;
  filter.pageSize = pageSize || 0;
  filter.totalPages = totalPages || 0;
  filter.sortBy = sortBy;

  return (
    <div>
      <OrdersManagement data={orders} initFilter={filter} />
    </div>
  );
};

export default OrderStaffPage;
