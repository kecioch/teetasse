"use client";

import ButtonFaIcon from "@/components/UI/Buttons/ButtonFaIcon";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import CategoryAccordion from "../CategoryAccordion/CategoryAccordion";
import TextInputModal, {
  TextInputModalProps,
} from "@/components/UI/Modals/TextInputModal";
import { Category } from "../CategoryAccordion/CategoryAccordionItem";

interface Props {
  data: Category[];
}

const CategoryManagement = ({ data }: Props) => {
  const [categories, setCategories] = useState<Category[]>(data);

  const [inputModal, setInputModal] = useState<TextInputModalProps>({
    show: false,
  });

  const handleAddCategory = (title: string) => {
    fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Post successful:", data);
        setCategories((prev) => [...prev, { title, subs: [] }]);
        setInputModal({ show: false });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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

export default CategoryManagement;
