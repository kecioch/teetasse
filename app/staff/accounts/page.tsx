import { authenticateServer } from "@/services/auth/authentication";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const StaffAccountsPage = async () => {
  const auth = await authenticateServer([Role.ADMIN]);
  if (!auth) redirect("/login");

  return <div>Staff Acc</div>;
};

export default StaffAccountsPage;
