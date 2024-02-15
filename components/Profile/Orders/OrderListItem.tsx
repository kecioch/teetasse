"use client";

import { DeliveryStateUI, Order, PaymentStateUI } from "@/types/order";
import { Button, Table, TableBody, TableRow } from "flowbite-react";
import React, { useState } from "react";
import OrderStateBadge from "./OrderStateBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import OrderItem from "@/components/Cart/Checkout/Payment/OrderItem";

interface Props {
  data: Order;
}

const OrderListItem = ({ data }: Props) => {
  const [expand, setExpand] = useState(false);

  const handleToogleExpand = () => {
    setExpand((prev) => !prev);
  };

  const total = data.products.reduce(
    (acc, curr) => (curr.price ? acc + curr.price * curr.qty : acc),
    0
  );
  console.log(data);

  return (
    <div className="p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="flex justify-between items-start gap-10">
        <div className="flex-1 flex items-center gap-3 flex-wrap">
          <p className="text-2xl font-semibold">
            Bestellung: {data.created.toLocaleDateString()}
          </p>
          <OrderStateBadge state={data.orderState} />
        </div>
        <Button color="light" size="sm" onClick={handleToogleExpand}>
          <FontAwesomeIcon icon={expand ? faAngleUp : faAngleDown} size="xl" />
        </Button>
      </div>
      <p>Bestellnummer: #{data.id}</p>
      <table className="w-full mt-4">
        <thead className="border-b">
          <tr>
            <th className="text-start pb-1">Lieferstatus</th>
            <th className="text-start pb-1">Zahlungsstatus</th>
            <th className="text-start pb-1">Gesamtpreis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="pt-2 font-light">
              {DeliveryStateUI[data.deliveryState]}
            </td>
            <td className="pt-2 font-light">
              {PaymentStateUI[data.paymentState]}
            </td>
            <td className="pt-2 font-light">{total}€</td>
          </tr>
        </tbody>
      </table>
      {expand && (
        <div className="border-t-2 mt-5 pt-5">
          <div className="flex flex-row gap-x-20 gap-y-7 flex-wrap">
            <div>
              <p className="mb-2 text-xl font-semibold">Lieferadresse</p>
              {data.user && (
                <p>
                  {data.user.firstName} {data.user.lastName}
                </p>
              )}
              {data.customerInformation && (
                <p>
                  {data.customerInformation.firstName}{" "}
                  {data.customerInformation.lastName}
                </p>
              )}
              <p>
                {data.deliveryAddress.street} {data.deliveryAddress.nr}
              </p>
              <p>
                {data.deliveryAddress.zip} {data.deliveryAddress.city}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xl font-semibold">Kunde</p>
              {data.user && (
                <>
                  <p>
                    <span className="font-semibold">K-Nr.:</span> {data.user.id}
                  </p>
                  <p>
                    {data.user.firstName} {data.user.lastName}
                  </p>
                  <p>{data.user.email}</p>
                </>
              )}
              {data.customerInformation && (
                <>
                  <p>
                    {data.customerInformation.firstName}{" "}
                    {data.customerInformation.lastName}
                  </p>
                  <p>{data.customerInformation.email}</p>
                </>
              )}
            </div>
          </div>
          <div className="border-t-2 mt-5 pt-5">
            <p className="text-xl font-semibold">Produkte</p>
            <div className="divide-y flex flex-col w-[50%]">
              {data.products.map((el, index) => (
                <OrderItem key={index} data={el} className="py-3 last:pb-0" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderListItem;
