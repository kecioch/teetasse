"use client";

import React from "react";
import { Button } from "flowbite-react";
import GuestForm from "@/components/Cart/Checkout/CustomerData/Forms/GuestForm";
import LoginForm from "@/components/Cart/Checkout/CustomerData/Forms/LoginForm";
import { useSession } from "next-auth/react";
import CartSummary from "@/components/Cart/Checkout/CustomerData/Summary/CartSummary";
import { useRouter } from "next/navigation";

const CustomerDataPage = () => {
  const session = useSession();
  const router = useRouter();
  const isLoggedIn = session.data?.user;

  const handleNext = () => {
    router.push("/checkout/delivery");
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
              <GuestForm onSubmit={handleNext} />
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
              onClick={handleNext}
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
