"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ModalStates, closeModal } from "@/redux/features/modalSlice";
import SideBar from "../UI/Modals/SideBar";
import CartProductItem from "./CartProductItem";
import { Button } from "flowbite-react";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartDrawer = () => {
  const showModal =
    useAppSelector((state) => state.modal.showModal) ===
    ModalStates.CART_DRAWER;
  const products = useAppSelector((state) => state.cart.products);
  const isEmpty = products.length <= 0;
  const totalPrice = products
    .reduce((acc, curr) => acc + curr.price * curr.qty, 0)
    .toFixed(2);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <SideBar show={showModal} title="Warenkorb">
      <section className="overflow-y-auto flex-1 flex">
        <div
          className={`flex flex-row w-full flex-wrap ${
            isEmpty
              ? "justify-center flex-col"
              : "flex-row content-start divide-y-2 divide-dashed"
          }`}
        >
          {products.map((item, index) => (
            <CartProductItem key={index} data={item} className="w-full py-2 h-28" />
          ))}

          {isEmpty && (
            <p className="text-center text-gray-400 font-light mt-10 text-xl">
              Schade! Dein Warenkorb ist leer
            </p>
          )}
        </div>
      </section>
      <section className="border-t-2 pt-5">
        <p className="text-end mb-8 px-4 font-light  text-lg">
          Gesamtbetrag: <span className="font-medium">{totalPrice}€</span>
        </p>
        <Button
          className="w-full mt-5 rounded-none [&_span]:text-xl py-5"
          color="success"
          disabled={isEmpty}
        >
          <FontAwesomeIcon icon={faCoins} className="mr-2" />
          Zur Kasse
        </Button>
      </section>
    </SideBar>
  );
};

export default CartDrawer;
