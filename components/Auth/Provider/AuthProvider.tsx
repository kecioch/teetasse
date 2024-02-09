"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
