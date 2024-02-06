import React from "react";
import Backdrop from "./Backdrop";
import CartDrawer from "@/components/Cart/CartDrawer";
import SearchProduct from "@/components/Catalog/SearchProduct";
import MenuDrawer from "@/components/Menu/MenuDrawer";
import { Category } from "@/types/category";

interface Props {
  data: {
    categories?: Category[];
  };
}

const Modals = ({ data }: Props) => {
  return (
    <React.Fragment>
      <Backdrop />
      <CartDrawer />
      <SearchProduct />
      <MenuDrawer categories={data.categories || []} />
    </React.Fragment>
  );
};

export default Modals;
