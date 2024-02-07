"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ModalStates, closeModal } from "@/redux/features/modalSlice";
import SideBar from "../UI/Modals/SideBar";
import CartProductItem from "./CartProductItem";
import { Button } from "flowbite-react";
import ButtonFaIcon from "../UI/Buttons/ButtonFaIcon";
import { faCoins, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartDrawer = () => {
  const showModal =
    useAppSelector((state) => state.modal.showModal) ===
    ModalStates.CART_DRAWER;
  const products = useAppSelector((state) => state.cart.products);
  const isEmpty = products.length <= 0;

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <SideBar show={showModal} title="Warenkorb">
      <section className="overflow-y-auto flex-1 flex">
        <div
          className={`flex flex-row gap-1 w-full flex-wrap ${
            isEmpty ? "justify-center flex-col" : "flex-row content-start"
          }`}
        >
          {products.map((item, index) => (
            <CartProductItem key={index} data={item} className="w-full" />
          ))}

          {isEmpty && (
            <p className="text-center text-gray-400 font-light mt-10 text-xl">
              Schade! Dein Warenkorb ist leer
            </p>
          )}
        </div>
      </section>
      <section className="">
        <p>100 € </p>
        <Button
          className="w-full mt-5 rounded-none [&_span]:text-xl py-3"
          color="success"
        >
          <FontAwesomeIcon icon={faCoins} className="mr-2" />
          Kaufen
        </Button>
      </section>
    </SideBar>
  );
};

export default CartDrawer;
