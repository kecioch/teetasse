import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React from "react";
import ProductsTableRow from "./ProductsTableRow";
import { Product } from "@/types/product";

interface Props {
  data: Product[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const ProductsTable = ({ data = [], onEdit, onDelete }: Props) => {
  return (
    <div className="overflow-x-auto">
      <Table striped hoverable className="bg-transparent">
        <TableHead>
          <TableHeadCell className="bg-zinc-600 text-white">Nr.</TableHeadCell>
          <TableHeadCell className="bg-zinc-600 text-white text-center">
            Empfohlen
          </TableHeadCell>
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
          {data.length <= 0 && (
            <TableRow className="bg-white even:bg-gray-50 hover:bg-gray-200">
              <TableCell colSpan={8}>Keine Produkte vorhanden</TableCell>
            </TableRow>
          )}
          {data.map((item, index) => (
            <ProductsTableRow
              key={index}
              product={item}
              onEdit={() => onEdit(index)}
              onDelete={() => onDelete(index)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
