"use client";

import OrdersList from "@/components/Profile/Orders/OrdersList";
import { Order } from "@/types/order";
import React, { useState } from "react";
import OrderEditModal from "./OrderEditModal";
import OrdersFilter from "./OrdersFilter";
import { OrderFilterOptions, SortBy } from "@/types/filterOptions";
import { usePathname, useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import Pagination from "@/components/UI/Pagination/Pagination";

interface Props {
  data?: Order[];
  initFilter: OrderFilterOptions;
}

const OrdersManagement = ({ data = [], initFilter }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { fetch, isFetching } = useFetch();
  const [orders, setOrders] = useState<Order[]>(data);
  const [filter, setFilter] = useState<OrderFilterOptions>(initFilter);

  const [showEditModal, setShowEditModal] = useState<{
    show: boolean;
    order?: Order;
  }>({
    show: false,
  });

  const handleOpenEdit = (id: number) => {
    const order = orders.find((el) => el.id === id);
    setShowEditModal({ show: true, order });
  };

  const handleChangeOrder = (order: Order) => {
    const newOrders = [...orders];
    const index = newOrders.findIndex((el) => el.id === order.id);
    newOrders[index] = order;
    setOrders(newOrders);
  };

  const handleChangeFilter = (options: OrderFilterOptions) => {
    const newFilter = { ...filter, ...options };
    setFilter(newFilter);

    // UPDATE SEARCH PARAMS
    const params = new URLSearchParams();
    if (newFilter.sortBy !== undefined)
      params.set("sortBy", newFilter.sortBy.toString());
    if (newFilter.page) params.set("page", newFilter.page.toString());
    if (newFilter.pageSize)
      params.set("pageSize", newFilter.pageSize.toString());
    if (newFilter.search) params.set("search", newFilter.search);
    router.push(pathname + "?" + params.toString());

    // FETCH NEW FILTER
    fetch
      .get(
        `/api/orders?${
          newFilter.search ? "search=" + newFilter.search : ""
        }&sortBy=${newFilter.sortBy}&page=${newFilter.page}&pageSize=${
          newFilter.pageSize
        }`
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
      <h1 className="text-3xl uppercase text-gray-800">Bestellungen</h1>
      <hr className="my-5" />
      <OrdersFilter
        filter={filter}
        onChange={handleChangeFilter}
        isLoading={isFetching}
        className="mb-10"
      />
      <OrdersList
        data={orders}
        staffView={true}
        onEdit={handleOpenEdit}
        isLoading={isFetching}
      />
      {showEditModal.order && showEditModal.show && (
        <OrderEditModal
          show={showEditModal.show}
          order={showEditModal.order}
          onClose={() => setShowEditModal({ show: false })}
          onChange={handleChangeOrder}
          dismissible={true}
        />
      )}
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

export default OrdersManagement;
