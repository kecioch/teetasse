"use client";

import { Variant } from "@/types/product";
import { Label, Radio } from "flowbite-react";
import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  products: Variant[];
}

const SelectProduct = ({ className, products }: Props) => {
  console.log(products);
  const handleChange = (e: any) => {
    console.log(e.target);
  };

  return (
    <div
      className={`flex flex-col ${className} divide-y divide-slate-500 divide-dashed`}
    >
      {products.map((item, index) => (
        <div key={index} className="flex items-center gap-2 py-3">
          <input
            id={item.title}
            name="product"
            type="radio"
            value={item.id}
            defaultChecked={index === 0}
            className="w-4 h-4 text-green-600 border-gray-300"
            onChange={handleChange}
          />
          <label
            htmlFor={item.title}
            className="flex gap-5 justify-between w-full"
          >
            <span className="font-light text-xl pl-3 overflow-ellipsis overflow-hidden flex-[3]">
              {item.title}
            </span>
            <span className="font-bold text-xl flex-1  text-end">
              {item.price}€
            </span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default SelectProduct;
