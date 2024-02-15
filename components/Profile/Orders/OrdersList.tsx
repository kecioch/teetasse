"use client";

import { Order } from "@/types/order";
import React from "react";
import OrderListItem from "./OrderListItem";

interface Props {
  data?: Order[];
}

const OrdersList = ({ data = [] }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {data.map((el, index) => (
        <OrderListItem key={index} data={el} />
      ))}
      {data.length <= 0 && (
        <h2 className="text-2xl text-center font-light text-gray-600">
          Keine Bestellungen vorhanden
        </h2>
      )}
    </div>
  );
};

export default OrdersList;
