"use client";

import ProductModal from "@/components/Staff/Products/Modals/ProductModal/ProductModal";
import ProductsTable from "@/components/Staff/Products/ProductsTable/ProductsTable";
import ContentContainer from "@/components/UI/Container/ContentContainer";
import { Button } from "flowbite-react";
import React, { useState } from "react";

const Products = () => {
  const [showProductModal, setShowProductModal] = useState(false);

  const handleAddProduct = () => {
    setShowProductModal(true);
  };

  return (
    <ContentContainer className="mt-12 p-4">
      <h1 className="text-3xl mt-10 mb-7 uppercase text-gray-800">
        Produktverwaltung
      </h1>
      <Button className="mb-5" color="success" onClick={handleAddProduct}>
        Hinzufügen
      </Button>
      <ProductsTable />
      <ProductModal
        show={showProductModal}
        onClose={() => setShowProductModal(false)}
      />
    </ContentContainer>
  );
};

export default Products;
