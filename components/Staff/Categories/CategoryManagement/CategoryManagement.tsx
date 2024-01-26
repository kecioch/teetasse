"use client";

import ButtonFaIcon from "@/components/UI/Buttons/ButtonFaIcon";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import CategoryAccordion from "../CategoryAccordion/CategoryAccordion";
import TextInputModal, {
  TextInputModalProps,
} from "@/components/UI/Modals/TextInputModal";
import { Category } from "../CategoryAccordion/CategoryAccordionItem";
import useFetch from "@/hooks/useFetch";
import ConfirmDeleteModal, {
  ConfirmDeleteModalProps,
} from "@/components/UI/Modals/ConfirmDeleteModal";

interface Props {
  data?: Category[];
}

const CategoryManagement = ({ data = [] }: Props) => {
  const { fetch, errorMsg, isFetching, clearErrorMsg } = useFetch();

  const [categories, setCategories] = useState<Category[]>(data);

  const [inputModal, setInputModal] = useState<TextInputModalProps>({
    show: false,
  });

  const [deleteModal, setDeleteModal] = useState<ConfirmDeleteModalProps>({
    show: false,
  });

  const handleAddCategory = (title: string) => {
    fetch.post("/api/categories", { title }).then((res) => {
      if (res.status !== 200) return;

      setCategories((prev) => [
        ...prev,
        { id: res.data.id, title: res.data.title, subs: [] },
      ]);
      setInputModal({ show: false });
    });
  };

  const handleEditCategory = (id: number, title: string) => {
    fetch.put(`/api/categories/${id}`, { title }).then((res) => {
      if (res.status !== 200) return;

      const newCategories = [...categories];
      const index = newCategories.findIndex((el) => el.id === id);
      newCategories[index].title = title;
      setCategories(newCategories);
      setInputModal({ show: false });
    });
  };

  const handleDeleteCategory = (id: number) => {
    fetch.delete(`/api/categories/${id}`).then((res) => {
      if (res.status !== 200) return;

      const newCategories = [...categories];
      const index = newCategories.findIndex((el) => el.id === id);
      newCategories.splice(index, 1);
      setCategories(newCategories);
      setDeleteModal({ show: false });
    });
  };

  const handleAddSubCategory = (id: number, title: string) => {
    fetch.post("/api/subcategories", { categoryId: id, title }).then((res) => {
      if (res.status !== 200) return;

      const newCategories = [...categories];
      const index = newCategories.findIndex((el) => el.id === id);
      newCategories[index].subs.push({ id: res.data.id, title });
      setCategories(newCategories);
      setInputModal({ show: false });
    });
  };

  const handleEditSubCategory = (
    itemId: number,
    subItemId: number,
    title: string
  ) => {
    fetch.put(`/api/subcategories/${subItemId}`, { title }).then((res) => {
      if (res.status !== 200) return;

      const newCategories = [...categories];
      const itemIndex = newCategories.findIndex((el) => el.id === itemId);
      const subItemIndex = newCategories[itemIndex].subs.findIndex(
        (el) => el.id === subItemId
      );
      newCategories[itemIndex].subs[subItemIndex].title = title;
      setCategories(newCategories);
      setInputModal({ show: false });
    });
  };

  const handleDeleteSubCategory = (itemId: number, subItemId: number) => {
    fetch.delete(`/api/subcategories/${subItemId}`).then((res) => {
      if (res.status !== 200) return;

      const newCategories = [...categories];
      const itemIndex = newCategories.findIndex((el) => el.id === itemId);
      const subItemIndex = newCategories[itemIndex].subs.findIndex(
        (el) => el.id === subItemId
      );
      newCategories[itemIndex].subs.splice(subItemIndex, 1);
      setCategories(newCategories);
      setDeleteModal({ show: false });
    });
  };

  const closeModal = () => {
    setInputModal({ show: false });
    setDeleteModal({ show: false });
    clearErrorMsg();
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

  const openEditCategory = (itemId: number) => {
    const itemIndex = categories.findIndex((el) => el.id === itemId);
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
      onSubmit: (input) => handleEditCategory(itemId, input),
    });
  };

  const openDeleteCategory = (itemId: number) => {
    setDeleteModal({
      show: true,
      title: "Kategorie löschen",
      description: "Wollen Sie wirklich die Kategorie löschen?",
      onYes: () => handleDeleteCategory(itemId),
      onNo: closeModal,
    });
  };

  const openAddSubCategory = (itemId: number) => {
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
      onSubmit: (input) => handleAddSubCategory(itemId, input),
    });
  };

  const openEditSubCategory = (itemId: number, subItemId: number) => {
    const itemIndex = categories.findIndex((el) => el.id === itemId);
    const subItemIndex = categories[itemIndex].subs.findIndex(
      (el) => el.id === subItemId
    );

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
      onSubmit: (input) => handleEditSubCategory(itemId, subItemId, input),
    });
  };

  const openDeleteSubCategory = (itemId: number, subItemId: number) => {
    setDeleteModal({
      show: true,
      title: "Subkategorie löschen",
      description: "Wollen Sie wirklich die Subkategorie löschen?",
      onYes: () => handleDeleteSubCategory(itemId, subItemId),
      onNo: closeModal,
    });
  };

  return (
    <div>
      <div className="flex justify-between flex-wrap items-center gap-3">
        <h1 className="text-3xl uppercase text-gray-800">
          Kategorienverwaltung
        </h1>
        <ButtonFaIcon icon={faAdd} color="success" onClick={openAddCategory}>
          Hinzufügen
        </ButtonFaIcon>
      </div>
      <hr className="my-5" />
      <div>
        <CategoryAccordion
          categories={categories}
          actions={{
            item: {
              onEdit: openEditCategory,
              onDelete: openDeleteCategory,
            },
            subItem: {
              onAdd: openAddSubCategory,
              onEdit: openEditSubCategory,
              onDelete: openDeleteSubCategory,
            },
          }}
        />
        <TextInputModal
          show={inputModal.show}
          title={inputModal.title}
          button={inputModal.button}
          input={inputModal.input}
          error={errorMsg}
          onClose={closeModal}
          onSubmit={inputModal.onSubmit}
          dismissible
        />
        <ConfirmDeleteModal
          show={deleteModal.show}
          title={deleteModal.title}
          description={deleteModal.description}
          error={errorMsg}
          onClose={closeModal}
          onYes={deleteModal.onYes}
          onNo={deleteModal.onNo}
        />
      </div>
    </div>
  );
};

export default CategoryManagement;
