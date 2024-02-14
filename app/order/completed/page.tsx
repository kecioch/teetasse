import CompletedCheckout from "@/components/Cart/Checkout/Completed/CompletedCheckout";
import CompletedInfo from "@/components/Cart/Checkout/Completed/CompletedInfo";
import ContentContainer from "@/components/UI/Container/ContentContainer";
import { ReduxProvider } from "@/redux/ReduxProvider";
import React from "react";

const OrderCompletedPage = () => {
  return (
    <ContentContainer className="mt-12 mb-5 p-4">
      <ReduxProvider fallback={<CompletedInfo />}>
        <CompletedCheckout />
      </ReduxProvider>
    </ContentContainer>
  );
};

export default OrderCompletedPage;
