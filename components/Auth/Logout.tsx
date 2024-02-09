"use client";

import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
  return <span onClick={() => signOut()}>Logout</span>;
};

export default Logout;
