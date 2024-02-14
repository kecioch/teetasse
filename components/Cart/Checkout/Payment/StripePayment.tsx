"use client";

import React, { useEffect, useRef, useState } from "react";
import StripeForm from "@/components/Cart/Checkout/Payment/StripeForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Spinner } from "flowbite-react";
import useFetch from "@/hooks/useFetch";
import { OrderProduct, PaymentData } from "@/types/order";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setCheckoutClientSecret,
  setOrderList,
} from "@/redux/features/checkoutSlice";
import { clearCart } from "@/redux/features/cartSlice";

interface Props {
  data?: PaymentData;
}

const StripePayment = ({ data }: Props) => {
  const [clientSecret, setClientSecret] = useState("");
  const { fetch, isFetching } = useFetch();
  const [error, setError] = useState(false);
  const fetchedClientSecret = useRef(false);
  const clientSecretStored = useAppSelector(
    (state) => state.checkout.clientSecret
  );
  const dispatch = useAppDispatch();

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const fetchClientSecret = async () => {
    const res = await fetch.post("/api/payment/create-payment-intent", data);
    const clientSecret = res?.data?.clientSecret;
    if (!clientSecret) return setError(true);
    if (res.status !== 200) return;
    const orderList: OrderProduct[] = res.data.products;
    dispatch(setOrderList(orderList));
    setClientSecret(clientSecret);
    dispatch(setCheckoutClientSecret(clientSecret));
    dispatch(clearCart());
  };

  useEffect(() => {
    if (fetchedClientSecret.current) return;
    fetchedClientSecret.current = true;

    if (clientSecretStored) setClientSecret(clientSecretStored);
    else fetchClientSecret();
  }, []);

  return (
    <>
      {isFetching && (
        <div className="w-full flex justify-center mt-20 ">
          <Spinner size="xl" color="success" />
        </div>
      )}
      {!isFetching && error && (
        <>
          <h2 className="text-red-600 font-semibold">
            Fehler bei der Verbindung zum Zahlungsdienstleister
          </h2>
          <h4 className="text-red-600">Bitte Vorgang wiederholen</h4>
        </>
      )}
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripeForm />
        </Elements>
      )}
    </>
  );
};

export default StripePayment;
