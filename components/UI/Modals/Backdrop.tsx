"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal } from "@/redux/features/modalSlice";

const Backdrop = () => {
  const showBackdrop = useAppSelector((state) => state.modal.showBackdrop);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return showBackdrop ? (
    <div
      onClick={handleCloseModal}
      className="bg-zinc-800/60 backdrop-blur-sm bg-clip-padding backdrop-filter h-screen w-screen fixed top-0 right-0 z-40"
    />
  ) : null;
};

export default Backdrop;
