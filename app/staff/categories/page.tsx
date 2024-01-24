"use client";

import CategoryAccordion from "@/components/Staff/Categories/CategoryAccordion/CategoryAccordion";
import { Category } from "@/components/Staff/Categories/CategoryAccordion/CategoryAccordionItem";
import CategoryModal from "@/components/Staff/Categories/Modals/CategoryModal";
import ButtonFaIcon from "@/components/UI/Buttons/ButtonFaIcon";
import TextInputModal from "@/components/UI/Modals/TextInputModal";
import { faAdd, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, Button, Modal } from "flowbite-react";
import React, { useState } from "react";

enum ModalState {
  CLOSED,
  NEW_CATEGORY,
  EDIT_CATEGORY,
  NEW_SUBCATEGORY,
  EDIT_SUBCATEGORY,
}

const Categories = () => {
  const [showModal, setShowModal] = useState(false);

  const [categories, setCategories] = useState<Category[]>([
    {
      title: "Tee",
      subs: [
        {
          title: "Schwarztee",
        },
        {
          title: "Grüntee",
        },
        {
          title: "Oolong",
        },
      ],
    },
    { title: "Zubehör", subs: [] },
  ]);

  const handleAddCategory = (input: string) => {
    setCategories((prev) => [...prev, { title: input, subs: [] }]);
    setShowModal(false);
  };

  const handleEditCategory = () => {};
  const handleDeleteCategory = (index: number) => {
    console.log("DELETE CATGORY " + index);
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  };
  const handleAddSubCategory = () => {};
  const handleEditSubCategory = () => {};
  const handleDeleteSubCategory = () => {};

  return (
    <div>
      <h1 className="text-3xl mb-7 uppercase text-gray-800">
        Kategorienverwaltung
      </h1>
      <ButtonFaIcon
        icon={faAdd}
        color="success"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Hinzufügen
      </ButtonFaIcon>
      <hr className="my-5" />
      <CategoryAccordion
        categories={categories}
        actions={{
          item: {
            onEdit: handleEditCategory,
            onDelete: handleDeleteCategory,
          },
          subItem: {
            onAdd: handleAddSubCategory,
            onEdit: handleEditSubCategory,
            onDelete: handleDeleteSubCategory,
          },
        }}
      />
      <TextInputModal
        show={showModal}
        title="Neue Kategorie"
        btnTitle="Hinzufügen"
        inputTitle="Kategorie"
        onClose={() => setShowModal(false)}
        onSubmit={handleAddCategory}
        dismissible
      />
    </div>
  );
};

export default Categories;
