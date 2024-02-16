"use client";

import LoadingButton from "@/components/UI/Buttons/LoadingButton";
import useFetch from "@/hooks/useFetch";
import { DeliveryStateUI, Order, OrderStateUI } from "@/types/order";
import { DeliveryState, OrderState } from "@prisma/client";
import { Label, Modal, Select } from "flowbite-react";
import React, { FormEvent, useState } from "react";

interface Props {
  show: boolean;
  dismissible?: boolean;
  position?: string;
  order: Order;
  onClose: () => void;
  onChange: (order: Order) => void;
}

const OrderEditModal = ({
  show,
  dismissible = false,
  position = "top-center",
  order,
  onClose,
  onChange,
}: Props) => {
  const { fetch, errorMsg, isFetching, clearErrorMsg } = useFetch();

  const [deliveryState, setDeliveryState] = useState<DeliveryState>(
    order.deliveryState
  );
  const [orderState, setOrderState] = useState<OrderState>(order.orderState);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("HANDLESUBMIT", deliveryState, orderState);
    const res = await fetch.patch("/api/orders/" + order.id, {
      orderState,
      deliveryState,
    });
    console.log(res);

    if (res.status !== 200) return;
    const updatetOrder: Order = {
      ...order,
      deliveryState,
      orderState,
    };
    onChange(updatetOrder);
  };

  return (
    <Modal
      show={show}
      onClose={() => {
        if (!isFetching) onClose();
      }}
      position={position}
      dismissible={dismissible}
    >
      <Modal.Header className="uppercase text-gray-800">
        Bestellung [#{order.id}]
      </Modal.Header>
      <Modal.Body>
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="orderState" value="Bestellstatus" />
            </div>
            <Select
              id="orderState"
              name="orderState"
              value={orderState}
              onChange={(e) =>
                setOrderState(e.currentTarget.value as OrderState)
              }
              required
            >
              {Object.values(OrderState).map((el, index) => (
                <option key={index} value={el}>
                  {OrderStateUI[el]}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="deliveryState" value="Lieferstatus" />
            </div>
            <Select
              id="deliveryState"
              name="deliveryState"
              value={deliveryState}
              onChange={(e) =>
                setDeliveryState(e.currentTarget.value as DeliveryState)
              }
              required
            >
              {Object.values(DeliveryState).map((el, index) => (
                <option key={index} value={el}>
                  {DeliveryStateUI[el]}
                </option>
              ))}
            </Select>
          </div>
          <div className="mt-3">
            {errorMsg && <p className="text-red-700 font-light">{errorMsg}</p>}
            <LoadingButton
              color="success"
              className="w-full"
              type="submit"
              isLoading={isFetching}
            >
              Änderungen speichern
            </LoadingButton>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderEditModal;
