import ContentContainer from "@/components/UI/Container/ContentContainer";
import { TabItemData } from "@/components/UI/Tabs/TabItem";
import Tabs from "@/components/UI/Tabs/Tabs";
import { authenticateServer } from "@/services/auth/authentication";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const auth = await authenticateServer([Role.STAFF, Role.ADMIN]);
  if (!auth) redirect("/login");

  const tabItems: TabItemData[] = [
    {
      title: "Bestellungen",
      href: "/staff/orders",
    },
    {
      title: "Produkte",
      href: "/staff/products",
    },
    {
      title: "Kategorien",
      href: "/staff/categories",
    },
  ];
  if (auth.role === Role.ADMIN)
    tabItems.push({
      title: "Mitarbeiter",
      href: "/staff/accounts",
    });

  return (
    <ContentContainer className="mt-12 mb-5 p-4">
      <Tabs items={tabItems} />
      <div className="mt-8">{children}</div>
    </ContentContainer>
  );
};

export default layout;
