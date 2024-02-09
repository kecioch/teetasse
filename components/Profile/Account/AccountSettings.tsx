"use client";

import { User } from "@/types/user";
import React from "react";
import AccountDataForm from "./AccountDataForm";
import PasswordForm from "./PasswordForm";

interface Props {
  user: User;
}

const AccountSettings = ({ user }: Props) => {
  return (
    <div>
      <h1 className="text-3xl uppercase text-gray-800">
        Account Informationen
      </h1>
      <AccountDataForm user={user} className="mt-8 mb-10 w-full md:max-w-md" />
      <hr className="my-10" />
      <h2 className="text-2xl uppercase text-gray-800">Passwort ändern</h2>
      <PasswordForm user={user} className="mt-8 mb-10 w-full md:max-w-md" />
    </div>
  );
};

export default AccountSettings;
