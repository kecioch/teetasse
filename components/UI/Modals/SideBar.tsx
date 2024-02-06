"use client";

import { closeModal } from "@/redux/features/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import React from "react";

interface Props {
  show: boolean;
  name?: string;
  title?: string;
  children?: React.ReactNode;
}

const SideBar = ({ show, title, name, children }: Props) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-screen py-4 overflow-y-auto transition-transform bg-white w-full sm:w-96 dark:bg-gray-800 ${
        !show && "translate-x-full"
      }`}
      tabIndex={-1}
    >
      <h4 className=" mb-4 px-4 text-3xl font-normal text-gray-500 uppercase">
        {title}
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
        <span className="sr-only">
          {name ? name + " schließen" : "schließen"}
        </span>
      </button>
      <div>{children}</div>
    </div>
  );
};

export default SideBar;
