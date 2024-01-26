"use client";

import ButtonFaIcon from "@/components/UI/Buttons/ButtonFaIcon";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import ProductsTable from "../ProductsTable/ProductsTable";
import ProductModal from "../Modals/ProductModal/ProductModal";
import { Category } from "@/types/category";

interface Props {
  categories?: Category[];
}

const ProductManagement = ({ categories }: Props) => {
  const [productModal, setProductModal] = useState({ show: false });
  
  const openAddProduct = () => {
    setProductModal({ show: true });
  };

  const closeProductModal = () => {
    setProductModal({ show: false });
  };

  return (
    <div>
      <div className="flex justify-between flex-wrap items-center gap-3">
        <h1 className="text-3xl uppercase text-gray-800">Produktverwaltung</h1>
        <ButtonFaIcon icon={faAdd} color="success" onClick={openAddProduct}>
          Hinzufügen
        </ButtonFaIcon>
      </div>
      <hr className="my-5" />
      <div>
        <ProductsTable />
        <ProductModal
          show={productModal.show}
          categories={categories}
          onClose={closeProductModal}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
