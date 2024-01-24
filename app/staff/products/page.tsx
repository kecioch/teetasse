"use client";

import ProductModal from "@/components/Staff/Products/Modals/ProductModal/ProductModal";
import ProductsTable from "@/components/Staff/Products/ProductsTable/ProductsTable";
import ButtonFaIcon from "@/components/UI/Buttons/ButtonFaIcon";
import ContentContainer from "@/components/UI/Container/ContentContainer";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Button, Tabs } from "flowbite-react";
import React, { useState } from "react";

const Products = () => {
  const [showProductModal, setShowProductModal] = useState(false);

  const handleAddProduct = () => {
    setShowProductModal(true);
  };

  return (
    <div>
      <h1 className="text-3xl mb-7 uppercase text-gray-800">
        Produktverwaltung
      </h1>
      <ButtonFaIcon color="success" icon={faAdd} onClick={handleAddProduct}>
        Hinzufügen
      </ButtonFaIcon>
      <hr className="my-5" />
      <ProductsTable />
      <ProductModal
        show={showProductModal}
        onClose={() => setShowProductModal(false)}
      />
    </div>
  );
};

export default Products;
