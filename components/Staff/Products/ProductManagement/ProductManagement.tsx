"use client";

import ButtonFaIcon from "@/components/UI/Buttons/ButtonFaIcon";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import ProductsTable from "../ProductsTable/ProductsTable";
import ProductModal, {
  ProductModalProps,
} from "../Modals/ProductModal/ProductModal";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import useFetch from "@/hooks/useFetch";
import ConfirmDeleteModal, {
  ConfirmDeleteModalProps,
} from "@/components/UI/Modals/ConfirmDeleteModal";

interface Props {
  categories?: Category[];
  products?: Product[];
}

const ProductManagement = ({ categories, products = [] }: Props) => {
  const { fetch, errorMsg, isFetching, clearErrorMsg } = useFetch();

  const [productModal, setProductModal] = useState<ProductModalProps>({
    show: false,
  });

  const [deleteModal, setDeleteModal] = useState<ConfirmDeleteModalProps>({
    show: false,
  });

  const [productsData, setProductsData] = useState<Product[]>(products);

  const handleAddProduct = (product: Product) => {
    setProductModal((prev) => ({
      ...prev,
      button: { title: "Erstelle Produkt..." },
    }));

    let newProduct: Product;
    fetch
      .post("/api/products", { ...product })
      .then((res) => {
        if (res.status !== 200) return;

        const data = res.data;
        newProduct = {
          id: data.id,
          title: data.title,
          description: data.description,
          rating: data.rating,
          ratingCnt: data.ratingCnt,
          recommended: data.recommended,
          subcategory: data.subcategory,
          variants: data.products,
          features: data.features,
          imageIds: data.imageIds,
        };

        if (!product.newImages || product.newImages.length <= 0) return;

        const imagesFormData = new FormData();
        product.newImages.forEach((image, index) => {
          imagesFormData.append(`image${index + 1}`, image);
        });

        // POST UPLOAD IMAGES
        setProductModal((prev) => ({
          ...prev,
          button: { title: "Lade Bilder hoch..." },
        }));
        return fetch.post(
          `/api/products/${data.id}/images`,
          imagesFormData,
          false
        );
      })
      .then((res) => {
        if (!res) return;
        if (res?.status !== 200) return console.error("Error Image Upload");

        const data = res.data;
        newProduct.imageIds = data.imageIds;
      })
      .then(() => {
        setProductsData((prev) => [...prev, newProduct]);
        setProductModal({ show: false });
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setProductModal((prev) => ({
          ...prev,
          button: { title: "Hinzufügen" },
        }));
      });
  };

  const handleEditProduct = (product: Product) => {
    setProductModal((prev) => ({
      ...prev,
      button: { title: "Aktualisiere Produktdaten..." },
    }));

    let updatetProduct: Product;
    fetch
      .put(`/api/products/${product.id}`, { ...product })
      .then((res) => {
        if (res.status !== 200) return;

        const data = res.data;
        updatetProduct = {
          id: data.id,
          title: data.title,
          description: data.description,
          rating: data.rating,
          ratingCnt: data.ratingCnt,
          recommended: data.recommended,
          subcategory: data.subcategory,
          variants: data.products,
          features: data.features,
          imageIds: data.imageIds,
        };

        if (!product.newImages || product.newImages.length <= 0) return;

        const imagesFormData = new FormData();
        product.newImages.forEach((image, index) => {
          imagesFormData.append(`image${index + 1}`, image);
        });

        // POST UPLOAD IMAGES
        setProductModal((prev) => ({
          ...prev,
          button: { title: "Lade Bilder hoch..." },
        }));
        return fetch.post(
          `/api/products/${data.id}/images`,
          imagesFormData,
          false
        );
      })
      .then((res) => {
        if (!res) return;
        if (res?.status !== 200) return console.error("Error Image Upload");

        const data = res.data;
        updatetProduct.imageIds = data.imageIds;
      })
      .then(() => {
        const index = productsData.findIndex((el) => el.id === product.id);
        const newProductsData = [...productsData];
        newProductsData[index] = updatetProduct;
        setProductsData(newProductsData);
        setProductModal({ show: false });
      })
      .catch((e) => {})
      .finally(() => {
        setProductModal((prev) => ({
          ...prev,
          button: { title: "Änderungen speichern" },
        }));
      });
  };

  const handleDeleteProduct = (index: number) => {
    const id = productsData[index].id;

    fetch.delete(`/api/products/${id}`).then((res) => {
      if (res.status !== 200) return;

      const newProductsData = [...productsData];
      newProductsData.splice(index, 1);
      setProductsData(newProductsData), setDeleteModal({ show: false });
    });
  };

  const openAddProduct = () => {
    setProductModal({
      show: true,
      title: "Neues Produkt",
      button: { title: "Hinzufügen" },
      onSubmit: handleAddProduct,
    });
  };

  const openDeleteProduct = (index: number) => {
    setDeleteModal({
      show: true,
      title: "Produkt löschen",
      description: "Wollen Sie wirklich das Produkt löschen?",
      onNo: closeModals,
      onYes: () => handleDeleteProduct(index),
    });
  };

  const openEditProduct = (index: number) => {
    setProductModal({
      show: true,
      title: "Produkt bearbeiten",
      button: { title: "Änderungen speichern" },
      product: productsData[index],
      onSubmit: handleEditProduct,
    });
  };

  const closeModals = () => {
    setProductModal({ show: false });
    setDeleteModal({ show: false });
    clearErrorMsg();
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
        <ProductsTable
          data={productsData}
          onDelete={openDeleteProduct}
          onEdit={openEditProduct}
        />
        {productModal.show && (
          <ProductModal
            show={productModal.show}
            categories={categories}
            title={productModal.title}
            button={productModal.button}
            product={productModal.product}
            dismissible={false}
            isLoading={isFetching}
            error={errorMsg}
            position="top-center"
            onSubmit={productModal.onSubmit}
            onClose={closeModals}
          />
        )}
        <ConfirmDeleteModal
          show={deleteModal.show}
          title={deleteModal.title}
          description={deleteModal.description}
          error={errorMsg}
          isLoading={isFetching}
          onClose={closeModals}
          onNo={deleteModal.onNo}
          onYes={deleteModal.onYes}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
