import OrdersList from "@/components/Profile/Orders/OrdersList";
import { getOrders } from "@/lib/services/orders";
import { authenticateServer } from "@/services/auth/authentication";
import { redirect } from "next/navigation";
import React from "react";

const OrdersPage = async () => {
  const user = await authenticateServer();
  if (!user) redirect("/");

  const orders = await getOrders(user.id);

  return (
    <div>
      <OrdersList data={orders} />
    </div>
  );
};

export default OrdersPage;
