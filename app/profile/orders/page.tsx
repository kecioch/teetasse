import UserOrders from "@/components/Profile/Orders/UserOrders";
import { getOrders } from "@/lib/services/orders";
import { authenticateServer } from "@/services/auth/authentication";
import { OrderFilterOptions } from "@/types/filterOptions";
import { SearchParams } from "@/types/params/searchParams";
import { redirect } from "next/navigation";
import React from "react";

const OrdersPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  // AUTHENTICATION
  const user = await authenticateServer();
  if (!user) redirect("/");

  // GET SEARCH PARAMS & CONSTRUCT FILTER
  const pageParam =
    searchParams.page && typeof searchParams.page === "string"
      ? parseInt(searchParams.page)
      : undefined;
  const pageSizeParam =
    searchParams.pageSize && typeof searchParams.pageSize === "string"
      ? parseInt(searchParams.pageSize)
      : undefined;

  const filter: OrderFilterOptions = {
    page: pageParam,
    pageSize: pageSizeParam,
  };

  // FETCH ORDERS
  const { orders, totalPages, page, pageSize, sortBy } = await getOrders(
    user.id,
    filter
  );
  filter.page = page || 0;
  filter.pageSize = pageSize || 0;
  filter.totalPages = totalPages || 0;

  return (
    <div>
      <UserOrders data={orders} initFilter={filter} />
    </div>
  );
};

export default OrdersPage;
