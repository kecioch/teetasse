"use client";

import { DeliveryStateUI, OrderStateUI, PaymentStateUI } from "@/types/order";
import { DeliveryState, OrderState, PaymentState } from "@prisma/client";
import { Dropdown } from "flowbite-react";
import React, { useState } from "react";
import OrderStateFilterItem from "./OrderStateFilterItem";
import { StateFilter } from "@/types/filterOptions";

interface Props {
  filter: StateFilter;
  onChange: (stateFilter: StateFilter) => void;
}

const OrdersStateFilter = ({ filter, onChange }: Props) => {
  const handleOrderChange = (state: OrderState, checked: boolean) => {
    let newOrderState = [...filter.orderState];
    if (checked) newOrderState.push(state);
    else newOrderState = newOrderState.filter((el) => el !== state);
    const newStateFilter = {
      ...filter,
      orderState: newOrderState,
    };
    onChange(newStateFilter);
  };

  const handlePaymentChange = (state: PaymentState, checked: boolean) => {
    let newPaymentState = [...filter.paymentState];
    if (checked) newPaymentState.push(state);
    else newPaymentState = newPaymentState.filter((el) => el !== state);
    const newStateFilter = {
      ...filter,
      paymentState: newPaymentState,
    };
    onChange(newStateFilter);
  };

  const handleDeliveryChange = (state: DeliveryState, checked: boolean) => {
    let newDeliveryState = [...filter.deliveryState];
    if (checked) newDeliveryState.push(state);
    else newDeliveryState = newDeliveryState.filter((el) => el !== state);
    const newStateFilter = {
      ...filter,
      deliveryState: newDeliveryState,
    };
    onChange(newStateFilter);
  };

  return (
    <Dropdown label="Status Filter" color="light">
      <Dropdown.Header className="font-semibold">Bestellstatus</Dropdown.Header>
      <div className="px-4 py-2 flex flex-col gap-2">
        {Object.values(OrderState).map((el, index) => (
          <OrderStateFilterItem
            key={index}
            id={"ORDERSTATE_" + el + "_" + index}
            onChange={(checked) => handleOrderChange(el, checked)}
            defaultChecked={filter.orderState.includes(el)}
          >
            {OrderStateUI[el]}
          </OrderStateFilterItem>
        ))}
      </div>
      <Dropdown.Divider />
      <Dropdown.Header className="font-semibold">
        Zahlungsstatus
      </Dropdown.Header>
      <div className="px-4 py-2 flex flex-col gap-2">
        {Object.values(PaymentState).map((el, index) => (
          <OrderStateFilterItem
            key={index}
            id={"PAYMENTSTATE_" + el + "_" + index}
            onChange={(checked) => handlePaymentChange(el, checked)}
            defaultChecked={filter.paymentState.includes(el)}
          >
            {PaymentStateUI[el]}
          </OrderStateFilterItem>
        ))}
      </div>
      <Dropdown.Divider />
      <Dropdown.Header className="font-semibold">Lieferstatus</Dropdown.Header>
      <div className="px-4 py-2 flex flex-col gap-2">
        {Object.values(DeliveryState).map((el, index) => (
          <OrderStateFilterItem
            key={index}
            id={"DELIVERYSTATE" + el + "_" + index}
            onChange={(checked) => handleDeliveryChange(el, checked)}
            defaultChecked={filter.deliveryState.includes(el)}
          >
            {DeliveryStateUI[el]}
          </OrderStateFilterItem>
        ))}
      </div>
    </Dropdown>
  );
};

export default OrdersStateFilter;
