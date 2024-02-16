import OrdersManagement from "@/components/Staff/Orders/OrdersManagement";
import { getOrders } from "@/lib/services/orders";
import { authenticateServer } from "@/services/auth/authentication";
import { OrderFilterOptions } from "@/types/filterOptions";
import { SearchParams } from "@/types/params/searchParams";
import { Role } from "@prisma/client";
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

  const filter: OrderFilterOptions = {
    sortBy: sortByParam,
    page: pageParam,
    pageSize: pageSizeParam,
    search,
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
