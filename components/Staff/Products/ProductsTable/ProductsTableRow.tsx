import { Product } from "@/types/product";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, TableCell, TableRow } from "flowbite-react";
import React from "react";

interface Props {
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProductsTableRow = ({ product, onEdit, onDelete }: Props) => {
  return (
    <TableRow className="bg-white even:bg-gray-50 hover:bg-gray-200">
      <TableCell>{product.id}</TableCell>
      <TableCell className="flex justify-center">
        <Checkbox checked={product.recommended} disabled />
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900 ">
        {product.title}
      </TableCell>
      <TableCell>{product.subcategory?.category?.title}</TableCell>
      <TableCell>{product.subcategory?.title}</TableCell>
      <TableCell>
        <ul>
          {product.variants.map((item, index) => (
            <li key={index}>
              {item.price}€ ({item.title})
            </li>
          ))}
        </ul>
      </TableCell>
      <TableCell>
        <ul>
          {product.variants.map((item, index) => (
            <li key={index}>
              {item.stock} ({item.title})
            </li>
          ))}
        </ul>
      </TableCell>
      <TableCell className="flex gap-3 justify-center">
        <Button color="red" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Button color="gray" onClick={onEdit}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProductsTableRow;
