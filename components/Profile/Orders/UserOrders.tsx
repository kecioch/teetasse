"use client";

import { OrderFilterOptions } from "@/types/filterOptions";
import { Order } from "@/types/order";
import React, { useState } from "react";
import OrdersList from "./OrdersList";
import { usePathname, useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import Pagination from "@/components/UI/Pagination/Pagination";
import { useSession } from "next-auth/react";

interface Props {
  data?: Order[];
  initFilter: OrderFilterOptions;
}

const UserOrders = ({ data = [], initFilter }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const user = session.data?.user;
  const { fetch, isFetching } = useFetch();
  const [orders, setOrders] = useState<Order[]>(data);
  const [filter, setFilter] = useState<OrderFilterOptions>(initFilter);

  const handleChangeFilter = (options: OrderFilterOptions) => {
    const newFilter = { ...filter, ...options };
    setFilter(newFilter);

    // UPDATE SEARCH PARAMS
    const params = new URLSearchParams();
    if (newFilter.page) params.set("page", newFilter.page.toString());
    if (newFilter.pageSize)
      params.set("pageSize", newFilter.pageSize.toString());
    router.push(pathname + "?" + params.toString());

    // FETCH NEW FILTER
    fetch
      .get(
        `/api/orders?userId=${user?.id}&page=${newFilter.page}&pageSize=${newFilter.pageSize}`
      )
      .then((res: any) => {
        if (res.status !== 200) return;
        const newOrders: Order[] = res.data.orders.map((el: any) => ({
          ...el,
          created: new Date(el.created),
        }));
        const page = res.data.page;
        const pageSize = res.data.pageSize;
        const totalPages = res.data.totalPages;
        const sortBy = res.data.sortBy;
        setFilter((prev) => ({ ...prev, page, pageSize, totalPages, sortBy }));
        setOrders(newOrders);
      });
  };

  const handleChangePage = (page: number) => {
    if (isFetching || page === filter.page) return;
    handleChangeFilter({ page });
  };

  return (
    <div>
      <h1 className="text-3xl uppercase text-gray-800 mb-10">
        Meine Bestellungen
      </h1>
      <OrdersList data={orders} isLoading={isFetching} />
      {filter.totalPages && filter.totalPages > 1 ? (
        <div className="mt-10 flex flex-row justify-center w-full">
          <Pagination
            currentPage={filter.page || 1}
            totalPages={filter.totalPages || 1}
            onPageChange={handleChangePage}
            className="mt-10"
          />
        </div>
      ) : null}
    </div>
  );
};

export default UserOrders;
