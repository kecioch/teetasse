"use client";

import AddressForm from "@/components/Cart/Checkout/Delivery/AddressForm";
import { setAddress } from "@/redux/features/checkoutSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Address } from "@/types/customer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DeliveryPage = () => {
  const session = useSession();
  const router = useRouter();
  const user = session.data?.user;
  const checkout = useAppSelector((state) => state.checkout);
  const cartCnt = useAppSelector((state) => state.cart.cartCounter);
  const customerInfo = checkout.customerInformation;
  const dispatch = useAppDispatch();

  const onSubmitHandler = (data: Address) => {
    dispatch(setAddress(data));
    router.push("/checkout/payment");
  };

  useEffect(() => {
    if (
      (!user &&
        (!customerInfo?.firstName ||
          !customerInfo.lastName ||
          !customerInfo.email)) ||
      cartCnt <= 0
    ) {
      router.push("/checkout");
    }
  }, [checkout, customerInfo, router, user, cartCnt]);

  return (
    <div>
      <h2 className="text-xl uppercase mb-2">Lieferung an:</h2>
      <p className="font-light mb-7">
        {user && !customerInfo ? `${user.firstName} ${user.lastName}` : ""}
        {customerInfo &&
          `${customerInfo?.firstName || ""} ${customerInfo?.lastName || ""}`}
      </p>
      <p className="mb-2">Adresse</p>
      <AddressForm onSubmit={onSubmitHandler} />
    </div>
  );
};

export default DeliveryPage;
