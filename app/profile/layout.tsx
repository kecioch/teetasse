import ContentContainer from "@/components/UI/Container/ContentContainer";
import { TabItemData } from "@/components/UI/Tabs/TabItem";
import Tabs from "@/components/UI/Tabs/Tabs";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const tabItems: TabItemData[] = [
    {
      title: "Account",
      href: "/profile",
    },
    {
      title: "Bestellungen",
      href: "/profile/orders",
    },
  ];

  return (
    <ContentContainer className="mt-12 p-4">
      <Tabs items={tabItems} />
      <div className="mt-8">{children}</div>
    </ContentContainer>
  );
};

export default layout;
