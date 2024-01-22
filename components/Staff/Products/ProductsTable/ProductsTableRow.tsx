import { Button, TableCell, TableRow } from "flowbite-react";
import React from "react";

const ProductsTableRow = () => {
  return (
    <TableRow className="bg-white even:bg-gray-50 hover:bg-gray-200">
      <TableCell>1</TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900 ">
        Earl Grey
      </TableCell>
      <TableCell>Tee</TableCell>
      <TableCell>Schwarztee</TableCell>
      <TableCell>
        <ul>
          <li>7€ (100g)</li>
          <li>10€ (250g)</li>
        </ul>
      </TableCell>
      <TableCell>
        <ul>
          <li>100g (523)</li>
          <li>250g (234)</li>
        </ul>
      </TableCell>
      <TableCell>
        <Button color="warning">Ändern</Button>
      </TableCell>
    </TableRow>
  );
};

export default ProductsTableRow;
