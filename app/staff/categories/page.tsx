"use client";

import CategoryAccordion from "@/components/Staff/Categories/CategoryAccordion/CategoryAccordion";
import { Category } from "@/components/Staff/Categories/CategoryAccordion/CategoryAccordionItem";
import ButtonFaIcon from "@/components/UI/Buttons/ButtonFaIcon";
import TextInputModal, {
  TextInputModalProps,
} from "@/components/UI/Modals/TextInputModal";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const Categories = () => {
  const [inputModal, setInputModal] = useState<TextInputModalProps>({
    show: false,
  });

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

  const handleAddCategory = (title: string) => {
    setCategories((prev) => [...prev, { title, subs: [] }]);
    setInputModal({ show: false });
  };

  const handleEditCategory = (index: number, title: string) => {
    const newCategories = [...categories];
    newCategories[index].title = title;
    setCategories(newCategories);
    setInputModal({ show: false });
  };

  const handleDeleteCategory = (index: number) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  };

  const handleAddSubCategory = (index: number, title: string) => {
    const newCategories = [...categories];
    newCategories[index].subs.push({ title });
    setCategories(newCategories);
    setInputModal({ show: false });
  };

  const handleEditSubCategory = (
    itemIndex: number,
    subItemIndex: number,
    title: string
  ) => {
    const newCategories = [...categories];
    newCategories[itemIndex].subs[subItemIndex].title = title;
    setCategories(newCategories);
    setInputModal({ show: false });
  };

  const handleDeleteSubCategory = (itemIndex: number, subItemIndex: number) => {
    const newCategories = [...categories];
    newCategories[itemIndex].subs.splice(subItemIndex, 1);
    setCategories(newCategories);
  };

  const openAddCategory = () => {
    setInputModal({
      show: true,
      title: "Neue Kategorie",
      button: {
        title: "Hinzufügen",
      },
      input: {
        title: "Titel",
        placeholder: "Titel",
      },
      onSubmit: handleAddCategory,
    });
  };

  const openEditCategory = (itemIndex: number) => {
    setInputModal({
      show: true,
      title: "Kategorie bearbeiten",
      button: {
        title: "Bearbeiten",
      },
      input: {
        title: "Titel",
        placeholder: "Titel",
        defaultValue: categories[itemIndex].title,
      },
      onSubmit: (input) => handleEditCategory(itemIndex, input),
    });
  };

  const openAddSubCategory = (itemIndex: number) => {
    setInputModal({
      show: true,
      title: "Neue Subkategorie",
      button: {
        title: "Hinzufügen",
      },
      input: {
        title: "Titel",
        placeholder: "Titel",
      },
      onSubmit: (input) => handleAddSubCategory(itemIndex, input),
    });
  };

  const openEditSubCategory = (itemIndex: number, subItemIndex: number) => {
    setInputModal({
      show: true,
      title: "Subkategorie bearbeiten",
      button: {
        title: "Bearbeiten",
      },
      input: {
        title: "Titel",
        placeholder: "Titel",
        defaultValue: categories[itemIndex].subs[subItemIndex].title,
      },
      onSubmit: (input) =>
        handleEditSubCategory(itemIndex, subItemIndex, input),
    });
  };

  return (
    <div>
      <h1 className="text-3xl mb-7 uppercase text-gray-800">
        Kategorienverwaltung
      </h1>
      <ButtonFaIcon icon={faAdd} color="success" onClick={openAddCategory}>
        Hinzufügen
      </ButtonFaIcon>
      <hr className="my-5" />
      <CategoryAccordion
        categories={categories}
        actions={{
          item: {
            onEdit: openEditCategory,
            onDelete: handleDeleteCategory,
          },
          subItem: {
            onAdd: openAddSubCategory,
            onEdit: openEditSubCategory,
            onDelete: handleDeleteSubCategory,
          },
        }}
      />
      <TextInputModal
        show={inputModal.show}
        title={inputModal.title}
        button={inputModal.button}
        input={inputModal.input}
        onClose={() => setInputModal({ show: false })}
        onSubmit={inputModal.onSubmit}
        dismissible
      />
    </div>
  );
};

export default Categories;
