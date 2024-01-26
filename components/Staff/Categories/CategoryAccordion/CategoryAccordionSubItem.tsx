import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  item: {
    id: number;
    title: string;
  };
  actions: {
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
  };
}

const CategoryAccordionSubItem = ({ item, actions }: Props) => {
  const handleDelete = () => {
    actions.onDelete(item.id);
  };

  const handleEdit = () => {
    actions.onEdit(item.id);
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
