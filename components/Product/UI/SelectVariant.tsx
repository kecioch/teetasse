"use client";

import { Variant } from "@/types/product";
import React from "react";

interface Props {
  className?: string;
  variants: Variant[];
  value: number;
  onChange?: (index: number) => void;
}

const SelectVariant = ({ className, variants, value, onChange }: Props) => {
  const handleChange = (index: number) => {
    if (!onChange) return;
    onChange(index);
  };

  return (
    <div
      className={`flex flex-col ${className} divide-y divide-slate-500 divide-dashed`}
    >
      {variants.map((item, index) => {
        const isSoldOut = item.stock <= 0;

        return (
          <div key={index} className="flex items-center gap-2 py-3">
            <input
              id={item.title}
              name="product"
              type="radio"
              value={item.id}
              checked={index === value}
              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
              onChange={() => handleChange(index)}
              disabled={isSoldOut}
            />
            <label
              htmlFor={item.title}
              className="flex gap-5 justify-between w-full"
            >
              <span
                className={`font-light text-xl pl-3 overflow-ellipsis overflow-hidden flex-[3] ${
                  isSoldOut && "text-gray-300 line-through"
                }`}
              >
                {item.title}
              </span>
              <span
                className={`flex-1 text-end ${
                  isSoldOut
                    ? "text-gray-300 text-lg font-light"
                    : "text-xl font-bold"
                }`}
              >
                {isSoldOut ? "Ausverkauft" : `${item.price.toFixed(2)}€`}
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default SelectVariant;
