"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ModalStates, closeModal } from "@/redux/features/modalSlice";
import SideBar from "../UI/Modals/SideBar";

const CartDrawer = () => {
  const showModal =
    useAppSelector((state) => state.modal.showModal) ===
    ModalStates.CART_DRAWER;
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return <SideBar show={showModal} title="Warenkorb"></SideBar>;
};

export default CartDrawer;
