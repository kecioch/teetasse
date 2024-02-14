"use client";

import React, { useState } from "react";
import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import LoadingButton from "@/components/UI/Buttons/LoadingButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { OrderProduct } from "@/types/order";
import OrderItem from "./OrderItem";
import { useAppSelector } from "@/redux/hooks";

const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const orderList = useAppSelector((state) => state.checkout.orderList);

  const total = orderList?.reduce(
    (acc, curr) => (curr.price ? acc + curr.price * curr.qty : acc),
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order/completed`,
      },
    });
    if (error) setMessage(error.message);
    setIsProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col md:flex-row md:items-start gap-10"
    >
      <div className="flex-1">
        <PaymentElement />
      </div>
      <div className="w-full md:w-[40%] border rounded-lg p-5 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
        <div className="divide-y flex flex-col">
          {orderList?.map((el, index) => (
            <OrderItem key={index} data={el} className="py-3 last:pb-0" />
          ))}
        </div>
        <p className="text-end mb-8 px-4 font-light text-lg border-t-2 pt-3 mt-5">
          Gesamtbetrag:{" "}
          <span className="font-medium">{total?.toFixed(2)}€</span>
        </p>
        <LoadingButton
          type="submit"
          isLoading={isProcessing}
          color="success"
          className="[&_*]:text-xl w-full"
        >
          <FontAwesomeIcon icon={faCoins} /> Bezahlen
        </LoadingButton>
      </div>
    </form>
  );
};

export default StripeForm;
