"use client";

import AddressForm from "@/components/Cart/Checkout/Delivery/AddressForm";
import { useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const DeliveryPage = () => {
  const session = useSession();
  const router = useRouter();
  const user = session.data?.user;
  const checkout = useAppSelector((state) => state.checkout);
  const customerInfo = checkout.customerInformation;

  if (
    !checkout.userId &&
    (!customerInfo?.firstName || !customerInfo.lastName || !customerInfo.email)
  ) {
    console.log(user);
    console.log(checkout);
    router.push("/checkout");
  }

  return (
    <div>
      <h2 className="text-xl uppercase mb-2">Lieferung an:</h2>
      <p className="font-light mb-7">
        {user
          ? `${user.firstName || ""} ${user.lastName || ""}`
          : `${customerInfo?.firstName || ""} ${customerInfo?.lastName || ""}`}
      </p>
      <p className="mb-2">Adresse</p>
      <AddressForm />
    </div>
  );
};

export default DeliveryPage;
