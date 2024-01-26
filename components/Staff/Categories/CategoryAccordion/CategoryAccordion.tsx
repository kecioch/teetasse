import ButtonFaIcon from "@/components/UI/Buttons/ButtonFaIcon";
import { Accordion } from "flowbite-react";
import React from "react";
import CategoryAccordionItem, { Category } from "./CategoryAccordionItem";

export interface Actions {
  item: {
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
  };
  subItem: {
    onDelete: (itemId: number, subItemId: number) => void;
    onAdd: (itemId: number) => void;
    onEdit: (itemId: number, subItemId: number) => void;
  };
}

interface Props {
  categories: Category[];
  actions: Actions;
}

const CategoryAccordion = ({ categories, actions }: Props) => {
  if (categories && categories.length > 0)
    return (
      <Accordion>
        {categories.map((item, index) => (
          <CategoryAccordionItem
            key={index}
            category={item}
            actions={actions}
          />
        ))}
      </Accordion>
    );
  else return <p className="text-gray-500">Keine Kategorien vorhanden</p>;
};

export default CategoryAccordion;
