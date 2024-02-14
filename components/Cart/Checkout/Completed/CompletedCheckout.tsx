"use client";

import React, { useEffect } from "react";
import { clearCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { clearCheckout } from "@/redux/features/checkoutSlice";
import { Button } from "flowbite-react";
import Link from "next/link";
import CompletedInfo from "./CompletedInfo";

const CompletedCheckout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearCheckout());
  }, []);

  return <CompletedInfo />;
};

export default CompletedCheckout;
