import { Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";
import React from "react";
import ProductsTableRow from "./ProductsTableRow";

interface Props {}

const ProductsTable = ({}: Props) => {
  return (
    <div className="overflow-x-auto">
      <Table striped hoverable>
        <TableHead>
          <TableHeadCell className="bg-zinc-600 text-white">Nr.</TableHeadCell>
          <TableHeadCell className="bg-zinc-600 text-white">Name</TableHeadCell>
          <TableHeadCell className="bg-zinc-600 text-white">
            Kategorie
          </TableHeadCell>
          <TableHeadCell className="bg-zinc-600 text-white">
            Subkategorie
          </TableHeadCell>
          <TableHeadCell className="bg-zinc-600 text-white">
            Preis
          </TableHeadCell>
          <TableHeadCell className="bg-zinc-600 text-white">
            Lagerbestand
          </TableHeadCell>
          <TableHeadCell className="bg-zinc-600 text-white">
            <span className="sr-only">Bearbeiten</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="odd:bg-red-200!">
          <ProductsTableRow />
          <ProductsTableRow />
          <ProductsTableRow />
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
