import { Product } from "@/types/product";
import { Button, TableCell, TableRow } from "flowbite-react";
import React from "react";

interface Props {
  product: Product;
}

const ProductsTableRow = ({ product }: Props) => {
  return (
    <TableRow className="bg-white even:bg-gray-50 hover:bg-gray-200">
      <TableCell>{product.id}</TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900 ">
        {product.title}
      </TableCell>
      <TableCell>{product.subcategory.category?.title}</TableCell>
      <TableCell>{product.subcategory.title}</TableCell>
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
      <TableCell>
        <Button color="warning">Ändern</Button>
      </TableCell>
    </TableRow>
  );
};

export default ProductsTableRow;
