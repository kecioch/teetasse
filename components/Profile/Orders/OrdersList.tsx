"use client";

import { Order } from "@/types/order";
import React from "react";
import OrderListItem from "./OrderListItem";
import { Spinner } from "flowbite-react";

interface Props {
  data?: Order[];
  staffView?: boolean;
  isLoading?: boolean;
  onEdit?: (id: number) => void;
}

const OrdersList = ({
  data = [],
  staffView = false,
  isLoading = false,
  onEdit,
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {isLoading && (
        <div className="w-full flex justify-center">
          <Spinner size="xl" className="fill-green-600" />
        </div>
      )}
      {!isLoading &&
        data.map((el, index) => (
          <OrderListItem
            key={index}
            data={el}
            staffView={staffView}
            onEdit={onEdit}
          />
        ))}
      {!isLoading && data.length <= 0 && (
        <h2 className="text-2xl text-center font-light text-gray-600">
          Keine Bestellungen vorhanden
        </h2>
      )}
    </div>
  );
};

export default OrdersList;
