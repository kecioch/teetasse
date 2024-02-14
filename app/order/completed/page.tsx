import CompletedCheckout from "@/components/Cart/Checkout/Completed/CompletedCheckout";
import FailureInfo from "@/components/Cart/Checkout/Completed/FailureInfo";
import SuccessInfo from "@/components/Cart/Checkout/Completed/SuccessInfo";
import ContentContainer from "@/components/UI/Container/ContentContainer";
import { ReduxProvider } from "@/redux/ReduxProvider";
import { SearchParams } from "@/types/params/searchParams";
import { redirect } from "next/navigation";
import React from "react";

const OrderCompletedPage = ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const paymentIntent = searchParams.payment_intent;
  const paymentIntentClientSecret = searchParams.payment_intent_client_secret;
  const status = searchParams.redirect_status;
  const isFailed = status !== "succeeded";
  console.log({ paymentIntent, paymentIntentClientSecret, status });

  if (!paymentIntent || !paymentIntentClientSecret || !status) redirect("/");

  return (
    <ContentContainer className="mt-12 mb-5 p-4">
      {isFailed ? <FailureInfo /> : <SuccessInfo />}
      <ReduxProvider>
        <CompletedCheckout />
      </ReduxProvider>
    </ContentContainer>
  );
};

export default OrderCompletedPage;
