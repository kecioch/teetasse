import { Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";
import React from "react";
import ProductsTableRow from "./ProductsTableRow";
import { Product } from "@/types/product";

interface Props {
  data: Product[];
}

const ProductsTable = ({ data }: Props) => {
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
          {data.map((item, index) => (
            <ProductsTableRow key={index} product={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
