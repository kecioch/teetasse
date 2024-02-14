import { OrderProduct } from "@/types/order";
import React from "react";

interface Props {
  data: OrderProduct;
  className?: string;
}

const OrderItem = ({ data, className }: Props) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>
        <p>{data.title}</p>
        <p className="font-light">{data.subtitle}</p>
      </div>
      <div>
        <p>
          {data.qty}x {data.price?.toFixed(2)}€
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
