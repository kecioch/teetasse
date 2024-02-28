import StateBreadcrump from "@/components/Cart/Checkout/StateBreadcrump";
import ContentContainer from "@/components/UI/Container/ContentContainer";
import { ReduxProvider } from "@/redux/ReduxProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kasse",
};

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentContainer className="mt-12 mb-5 p-4">
      <h1 className="uppercase text-3xl mt-7">Kasse</h1>
      <ReduxProvider>
        <StateBreadcrump />
        <section>{children}</section>
      </ReduxProvider>
    </ContentContainer>
  );
}
