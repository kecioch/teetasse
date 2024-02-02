"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./AddCartButton.module.css";
import { Product, Variant } from "@/types/product";
import { isNumberObject } from "util/types";

interface Props {
  className?: string;
  variant: Variant;
  onClick: (qty: number) => void;
}

const AddCartButton = ({ className, variant, onClick }: Props) => {
  const [qty, setQty] = useState<number>(1);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value <= 0 || value > variant.stock) return setQty(1);

    setQty(value);
  };

  const handleClick = () => {
    onClick(qty);
  };

  useEffect(() => {
    setQty(1);
  }, [variant]);

  return (
    <div
      className={`flex justify-center items-center border border-solid border-green-950 ${className}`}
    >
      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          className={`bg-transparent p-3 focus:outline-none ${
            qty > 1 ? "active:text-gray-400 text-gray-900" : "text-gray-300"
          }`}
          onClick={() => setQty((prev) => (prev > 1 ? prev - 1 : 1))}
          disabled={qty <= 1}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="number"
          id="quantity-input"
          data-input-counter
          aria-describedby="helper-text-explanation"
          className={`bg-white border-0  text-center text-gray-900 text-sm block w-full py-2.5 ${styles.input}`}
          placeholder="1"
          min={1}
          max={variant.stock}
          value={qty}
          onChange={handleInputChange}
          required
        />
        <button
          type="button"
          className={`bg-transparent p-3 focus:outline-none ${
            qty < variant.stock
              ? "text-gray-900 active:text-gray-400"
              : "text-gray-300"
          }`}
          onClick={() =>
            setQty((prev) => (prev < variant.stock ? prev + 1 : prev))
          }
          disabled={qty >= variant.stock}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
      <button
        type="button"
        className="focus:outline-none text-white text-lg bg-green-950 hover:bg-green-800 active:bg-green-600 font-medium rounded-none px-5 py-2.5"
        onClick={handleClick}
      >
        In den Warenkorb
      </button>
    </div>
  );
};

export default AddCartButton;
