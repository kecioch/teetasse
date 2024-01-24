import ButtonFaIcon from "@/components/UI/Buttons/ButtonFaIcon";
import { Accordion } from "flowbite-react";
import React from "react";
import CategoryAccordionItem, { Category } from "./CategoryAccordionItem";

export interface Actions {
  item: {
    onDelete: (index: number) => void;
    onEdit: (index: number, newValue: string) => void;
  };
  subItem: {
    onDelete: (itemIndex: number, subItemIndex: number) => void;
    onAdd: (itemIndex: number, value: string) => void;
    onEdit: (itemIndex: number, subItemIndex: number, newValue: string) => void;
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
            index={index}
            actions={actions}
          />
        ))}
      </Accordion>
    );
  else return <p className="text-gray-500">Keine Kategorien vorhanden</p>;
};

export default CategoryAccordion;
