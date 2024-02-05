"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ModalStates, closeModal } from "@/redux/features/modalSlice";

const CartDrawer = () => {
  const showModal =
    useAppSelector((state) => state.modal.showModal) ===
    ModalStates.CART_DRAWER;
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto transition-transform bg-white w-96 dark:bg-gray-800 ${
        !showModal && "translate-x-full"
      }`}
      tabIndex={-1}
    >
      <h4 className=" mb-4 text-3xl font-semibold text-gray-500 dark:text-gray-400">
        Warenkorb
      </h4>
      <button
        type="button"
        onClick={handleClose}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Warenkorb schließen</span>
      </button>
    </div>
  );
};

export default CartDrawer;
