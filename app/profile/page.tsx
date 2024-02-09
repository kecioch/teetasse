import AccountSettings from "@/components/Profile/Account/AccountSettings";
import { authOptions } from "@/services/auth/authOptions";
import { User } from "@/types/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const AccountPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const user: User = {
    id: session.user.id,
    firstName: session.user.firstName,
    lastName: session.user.lastName,
    email: session.user.email || undefined,
    role: session.user.role,
  };

  return <AccountSettings user={user} />;
};

export default AccountPage;
