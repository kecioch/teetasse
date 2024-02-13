"use client";

import React from "react";
import { Button } from "flowbite-react";
import GuestForm, {
  GuestFormType,
} from "@/components/Cart/Checkout/CustomerData/Forms/GuestForm";
import LoginForm from "@/components/Cart/Checkout/CustomerData/Forms/LoginForm";
import { useSession } from "next-auth/react";
import CartSummary from "@/components/Cart/Checkout/CustomerData/Summary/CartSummary";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setCustomerInformation } from "@/redux/features/checkoutSlice";
import { CustomerInformation } from "@/types/customer";

const CustomerDataPage = () => {
  const session = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoggedIn = session.data?.user;

  const handleNext = () => {
    router.push("/checkout/delivery");
  };

  const handleLoginNext = () => {
    dispatch(setCustomerInformation(undefined));
    handleNext();
  };

  const handleGuestSubmit = (data: GuestFormType) => {
    const customer: CustomerInformation = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    dispatch(setCustomerInformation(customer));
    handleNext();
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-5 md:gap-10">
      <section className="flex-1 py-4 flex flex-col items-center">
        {!isLoggedIn && (
          <>
            <div className="w-full xl:w-[60%]">
              <h2 className="text-xl uppercase mb-2">Login</h2>
              <LoginForm />
            </div>
            <div className="w-full xl:w-[60%]">
              <h2 className="text-xl uppercase mb-2 mt-7">
                Als Gast bestellen
              </h2>
              <GuestForm onSubmit={handleGuestSubmit} />
            </div>
          </>
        )}
        {isLoggedIn && (
          <div className="w-full">
            <p className="text-2xl mb-2">Eingeloggt als</p>
            <p>
              {session.data?.user.firstName} {session.data?.user.lastName}
            </p>
            <p>{session.data?.user.email}</p>
            <Button
              size="lg"
              color="success"
              className="w-full mt-10"
              onClick={handleLoginNext}
            >
              Weiter
            </Button>
          </div>
        )}
      </section>
      <CartSummary className="md:border-l-2 border-solid min-w-[30%] md:p-4" />
    </div>
  );
};

export default CustomerDataPage;
