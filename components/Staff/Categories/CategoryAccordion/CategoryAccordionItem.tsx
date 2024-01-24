"use client";

import ButtonFaIcon from "@/components/UI/Buttons/ButtonFaIcon";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Accordion } from "flowbite-react";
import React, { useState } from "react";
import { Actions } from "./CategoryAccordion";
import { act } from "react-dom/test-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface Category {
  title: string;
  subs: { title: string }[];
}

interface Props {
  category: Category;
  index: number;
  actions: Actions;
}

const CategoryAccordionItem = ({ category, index, actions }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDeleteItem = () => {
    actions.item.onDelete(index);
  };

  const handleEditItem = () => {};

  const handleAddSubItem = () => {};

  const handleDeleteSubItem = () => {};

  const handleEditSubItem = () => {};

  return (
    <Accordion.Panel isOpen={isOpen}>
      <Accordion.Title
        className="bg-zinc-600 text-white hover:bg-zinc-500"
        onClick={handleClick}
      >
        {category.title}
      </Accordion.Title>
      <Accordion.Content>
        <div className="flex gap-2">
          <ButtonFaIcon
            title="Löschen"
            color="failure"
            icon={faTrash}
            onClick={handleDeleteItem}
          >
            Löschen
          </ButtonFaIcon>
          <ButtonFaIcon title="Ändern" color="warning" icon={faEdit}>
            Ändern
          </ButtonFaIcon>
          <ButtonFaIcon
            title={`${category.title} hinzufügen`}
            color="success"
            icon={faAdd}
          >
            {category.title} hinzufügen
          </ButtonFaIcon>
        </div>
        <hr className="my-5" />
        {category.subs &&
          category.subs.length > 0 &&
          category.subs.map((item, index) => (
            <div key={index} className="mb-2 text-gray-500 flex justify-start items-center gap-1">
              <FontAwesomeIcon icon={faTrash} />
              <FontAwesomeIcon icon={faEdit} />
              <span>{item.title}</span>
            </div>
          ))}
        {category.subs.length <= 0 && (
          <p className="mb-2 text-gray-400">Keine Subkategorien vorhanden</p>
        )}
      </Accordion.Content>
    </Accordion.Panel>
  );
};

export default CategoryAccordionItem;
