"use client";

import { closeModal } from "@/redux/features/modalSlice";
import { CartProduct } from "@/types/cart";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeQty, deleteProduct } from "@/redux/features/cartSlice";
import NumberInput from "../UI/Forms/NumberInput/NumberInput";

interface Props {
  data: CartProduct;
  className?: string;
}

const CartProductItem = ({ data, className }: Props) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleDeleteItem = () => {
    dispatch(deleteProduct({ id: data.id }));
  };

  const handleChangeQty = (id: number, qty: number) => {
    dispatch(changeQty({ id, qty }));
  };

  return (
    <div className={`bg-gray- flex gap-3 ${className}`}>
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
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <p className="text-md font-normal truncate">
          {data.productGroupId ? (
            <Link
              href={"/products/" + data.productGroupId}
              onClick={handleCloseModal}
            >
              <span title={data.title}>{data.title}</span>
            </Link>
          ) : (
            <span title={data.title}>{data.title}</span>
          )}
        </p>
        <p className="text-sm font-light mb-2 truncate" title={data.subtitle}>
          {data.subtitle}
        </p>
        <p className="text-sm font-normal">{data.price.toFixed(2)}€</p>
      </div>
      <div className=" w-30 relative flex pr-5 ">
        <NumberInput
          value={data.qty}
          max={data.stock}
          onChange={(value) => handleChangeQty(data.id, value)}
        />
        <button
          onClick={handleDeleteItem}
          className="absolute -top-1 right-2 text-gray-500 md:hover:text-red-900 transition-all ease-in"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default CartProductItem;
