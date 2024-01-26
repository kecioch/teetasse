"use client";

import ButtonFaIcon from "@/components/UI/Buttons/ButtonFaIcon";
import {
  faAdd,
  faChevronDown,
  faChevronUp,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Accordion } from "flowbite-react";
import React, { useState } from "react";
import { Actions } from "./CategoryAccordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryAccordionSubItem from "./CategoryAccordionSubItem";
import { Category } from "@/types/category";

interface Props {
  category: Category;
  actions: Actions;
}

const CategoryAccordionItem = ({ category, actions }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDeleteItem = () => {
    actions.item.onDelete(category.id);
  };

  const handleEditItem = () => {
    actions.item.onEdit(category.id);
  };

  const handleAddSubItem = () => {
    actions.subItem.onAdd(category.id);
  };

  const handleDeleteSubItem = (subItemId: number) => {
    actions.subItem.onDelete(category.id, subItemId);
  };

  const handleEditSubItem = (subItemId: number) => {
    actions.subItem.onEdit(category.id, subItemId);
  };

  return (
    <Accordion.Panel isOpen={isOpen}>
      <Accordion.Title
        className="bg-zinc-600 text-white hover:bg-zinc-500"
        onClick={handleClick}
      >
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className="mr-3 h-4 w-4"
        />
        <span>{category.title}</span>
      </Accordion.Title>
      <Accordion.Content>
        <div className="flex gap-2">
          <ButtonFaIcon
            title="Löschen"
            color="red"
            icon={faTrash}
            onClick={handleDeleteItem}
          >
            Löschen
          </ButtonFaIcon>
          <ButtonFaIcon
            title="Ändern"
            color="yellow"
            icon={faEdit}
            onClick={handleEditItem}
          >
            Ändern
          </ButtonFaIcon>
          <ButtonFaIcon
            title={`${category.title} hinzufügen`}
            color="green"
            icon={faAdd}
            onClick={handleAddSubItem}
          >
            {category.title} hinzufügen
          </ButtonFaIcon>
        </div>
        <hr className="my-5" />
        {category.subs &&
          category.subs.length > 0 &&
          category.subs.map((item, index) => (
            <CategoryAccordionSubItem
              key={index}
              item={item}
              actions={{
                onDelete: handleDeleteSubItem,
                onEdit: handleEditSubItem,
              }}
            />
          ))}
        {category.subs.length <= 0 && (
          <p className="mb-2 text-gray-400">Keine Subkategorien vorhanden</p>
        )}
      </Accordion.Content>
    </Accordion.Panel>
  );
};

export default CategoryAccordionItem;
