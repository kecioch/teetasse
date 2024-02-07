"use client";

import React, { useEffect, useState } from "react";
import { Variant } from "@/types/product";
import { useAppSelector } from "@/redux/hooks";
import NumberInput from "@/components/UI/Forms/NumberInput/NumberInput";

interface Props {
  className?: string;
  variant: Variant;
  onClick: (qty: number) => void;
}

const AddCartButton = ({ className, variant, onClick }: Props) => {
  const [qty, setQty] = useState<number>(1);

  const cartQty =
    useAppSelector(
      (state) => state.cart.products.find((el) => el.id === variant.id)?.qty
    ) || 0;
  const maxQty = variant.stock - cartQty;
  const disabled = maxQty <= 0;

  const handleClick = () => {
    onClick(qty);
    setQty(1);
  };

  useEffect(() => {
    setQty(1);
  }, [variant]);

  return (
    <div
      className={`flex justify-center items-center border border-solid border-green-950 ${className}`}
    >
      <NumberInput
        value={qty}
        max={maxQty}
        onChange={(value) => setQty(value)}
        disabled={disabled}
      />
      <button
        type="button"
        className={`focus:outline-none text-lg font-medium rounded-none px-5 py-2.5 ${
          disabled
            ? "bg-gray-600 text-gray-500"
            : "bg-green-950 text-white hover:bg-green-800 active:bg-green-600"
        }`}
        onClick={handleClick}
        disabled={disabled}
      >
        In den Warenkorb
      </button>
    </div>
  );
};

export default AddCartButton;
