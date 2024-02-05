import React from "react";
import Backdrop from "./Backdrop";
import CartDrawer from "@/components/Cart/CartDrawer";
import SearchProduct from "@/components/Catalog/SearchProduct";

const Modals = () => {
  return (
    <React.Fragment>
      <Backdrop />
      <CartDrawer />
      <SearchProduct />
    </React.Fragment>
  );
};

export default Modals;
