"use client";

import { useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import StripePayment from "@/components/Cart/Checkout/Payment/StripePayment";
import { PaymentData } from "@/types/order";

const PaymentPage = () => {
  const checkout = useAppSelector((state) => state.checkout);
  const cart = useAppSelector((state) => state.cart);
  const session = useSession();
  const router = useRouter();
  const user = session.data?.user;
  const [showPayment, setShowPayment] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData>();

  useEffect(() => {
    if (
      (!user &&
        (!checkout.customerInformation?.email ||
          !checkout.customerInformation?.firstName ||
          !checkout.customerInformation?.lastName)) ||
      !checkout.address ||
      (cart.cartCounter <= 0 && !checkout.clientSecret)
    ) {
      router.push("/checkout");
    } else {
      setShowPayment(true);
      setPaymentData({
        deliveryAddress: checkout.address,
        customerInformation: checkout.customerInformation,
        products: cart.products.map((el) => ({ id: el.id, qty: el.qty })),
      });
    }
  }, [checkout, router, user, cart]);

  return (
    <div className="w-full">
      {showPayment && paymentData && <StripePayment data={paymentData} />}

      {/* <h1 className="mt-20">Payment</h1>
      <hr />
      <p>LOGIN</p>
      <p>{user?.firstName}</p>
      <p>{user?.lastName}</p>
      <hr />
      <p>CHECKOUT DATA</p>
      <p>{checkout.customerInformation?.email}</p>
      <p>{checkout.customerInformation?.firstName}</p>
      <p>{checkout.customerInformation?.lastName}</p>
      <hr />
      <p>{checkout.address?.street}</p>
      <p>{checkout.address?.nr}</p>
      <p>{checkout.address?.city}</p>
      <p>{checkout.address?.zip}</p>
      <hr />
      <p>CART</p>
      {cart.products.map((el, index) => (
        <p key={index}>
          {el.title} | {el.subtitle} ({el.qty})
        </p>
      ))} */}
    </div>
  );
};

export default PaymentPage;
