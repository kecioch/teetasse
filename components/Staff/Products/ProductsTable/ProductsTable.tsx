import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import ProductsTableRow from "./ProductsTableRow";
import { Product } from "@/types/product";
import { FilterOptions } from "@/types/filterOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/components/UI/Pagination/Pagination";

interface Props {
  data: Product[];
  filter: FilterOptions;
  onChangeFilter: (options: FilterOptions) => void;
  isLoading?: boolean;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const ProductsTable = ({
  data = [],
  filter,
  isLoading = false,
  onChangeFilter,
  onEdit,
  onDelete,
}: Props) => {
  const handleChangePage = (page: number) => {
    if (isLoading) return;
    onChangeFilter({ page });
  };

  const [search, setSearch] = useState(filter.search || "");

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearch(value);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChangeFilter({ search, page: 1 });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSearch} className="flex gap-2 mb-5">
          <TextInput
            value={search}
            onChange={handleChangeSearch}
            className="w-80"
            addon={<FontAwesomeIcon icon={faSearch} />}
          />
          <Button
            type="submit"
            disabled={isLoading}
            color="light"
            className="w-32"
          >
            Suchen
          </Button>
        </form>
      </div>
      <div className="overflow-x-auto">
        <Table striped hoverable className="bg-transparent">
          <TableHead>
            <TableHeadCell className="bg-zinc-600 text-white">
              Nr.
            </TableHeadCell>
            <TableHeadCell className="bg-zinc-600 text-white text-center">
              Empfohlen
            </TableHeadCell>
            <TableHeadCell className="bg-zinc-600 text-white">
              Name
            </TableHeadCell>
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
            {!isLoading && data.length <= 0 && (
              <TableRow className="bg-white even:bg-gray-50 hover:bg-gray-200">
                <TableCell colSpan={8} className="text-center">
                  Keine Produkte vorhanden
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              data.map((item, index) => (
                <ProductsTableRow
                  key={index}
                  product={item}
                  onEdit={() => onEdit(index)}
                  onDelete={() => onDelete(index)}
                />
              ))}
            {isLoading && (
              <TableRow className="bg-white even:bg-gray-50 hover:bg-gray-200">
                <TableCell colSpan={8}>
                  <div className="w-full flex justify-center">
                    <Spinner size="xl" className="fill-green-600" />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {filter.totalPages && filter.totalPages > 1 ? (
        <div className="mt-10 flex flex-row justify-center">
          <Pagination
            currentPage={filter.page || 1}
            totalPages={filter.totalPages || 1}
            onPageChange={handleChangePage}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProductsTable;
