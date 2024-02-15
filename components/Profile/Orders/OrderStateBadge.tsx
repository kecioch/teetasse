"use client";
import { OrderStateUI } from "@/types/order";
import { OrderState } from "@prisma/client";
import { Badge, FlowbiteColors } from "flowbite-react";
import React from "react";

interface Props {
  state: OrderState;
}

const OrderStateBadge = ({ state }: Props) => {
  const getColor = () => {
    switch (state) {
      case "IN_PROGRESS":
        return "warning";
      case "CANCELED":
        return "failure";
      case "COMPLETED":
        return "success";
      default:
        return "light";
    }
  };
  const color = getColor();

  return (
    <div className="flex">
      <Badge className="rounded-xl" size="sm" color={color}>
        {OrderStateUI[state]}
      </Badge>
    </div>
  );
};

export default OrderStateBadge;
