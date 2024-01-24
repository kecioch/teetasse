import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  index: number;
  item: {
    title: string;
  };
  actions: {
    onDelete: (index: number) => void;
    onEdit: (index: number) => void;
  };
}

const CategoryAccordionSubItem = ({ index, item, actions }: Props) => {
  const handleDelete = () => {
    actions.onDelete(index);
  };

  const handleEdit = () => {
    actions.onEdit(index);
  };

  return (
    <div className="mb-2 text-gray-500 flex justify-start items-center gap-1">
      <button onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button onClick={handleEdit}>
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <span>{item.title}</span>
    </div>
  );
};

export default CategoryAccordionSubItem;
