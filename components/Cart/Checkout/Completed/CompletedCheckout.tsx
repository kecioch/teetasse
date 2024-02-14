"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { clearCheckout } from "@/redux/features/checkoutSlice";

const CompletedCheckout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("COMPLETED CHECKOUT");
    dispatch(clearCheckout());
  }, []);

  return null;
};

export default CompletedCheckout;
