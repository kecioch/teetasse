import AccountManagement from "@/components/Staff/Accounts/AccountManagement/AccountManagement";
import { getStaffAccounts } from "@/lib/services/users";
import { authenticateServer } from "@/services/auth/authentication";
import { User } from "@/types/user";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const StaffAccountsPage = async () => {
  const auth = await authenticateServer([Role.ADMIN]);
  if (!auth) redirect("/login");

  const users: User[] | null = await getStaffAccounts();

  return <AccountManagement data={users || []} />;
};

export default StaffAccountsPage;
