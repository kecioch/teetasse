import { CartProduct } from "@/types/cart";
import Image from "next/image";
import React from "react";

interface Props {
  data: CartProduct;
    className?: string;
}

const CartProductItem = ({ data, className }: Props) => {
  return (
    <div className={`bg-gray-100 flex gap-3 h-28 ${className}`}>
      <div className="w-24 bg-blue-100 relative border-r-4 border-gray-500">
        {data.coverImgUrl && (
          <Image
            alt={"Coverbild Produkt " + data.title}
            src={data.coverImgUrl}
            fill
            style={{ objectFit: "cover" }}
            draggable={false}
          />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-center gap-1">
        <p className="text-md font-normal upper">{data.title}</p>
        <p className="text-sm font-light">{data.subtitle}</p>
      </div>
      <div>
        <span>{data.qty}</span>
      </div>
    </div>
  );
};

export default CartProductItem;
