"use client";
import Search from "@/components/UI/Forms/Search/Search";
import { OrderFilterOptions, SortBy } from "@/types/filterOptions";
import { OrderStateUI } from "@/types/order";
import { faFilter, faSearch, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DeliveryState, OrderState } from "@prisma/client";
import {
  Button,
  Checkbox,
  Dropdown,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface Props {
  isLoading?: boolean;
  className?: string;
  filter: OrderFilterOptions;
  onChange: (options: OrderFilterOptions) => void;
}

const OrdersFilter = ({ isLoading, className, filter, onChange }: Props) => {
  const handleChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.currentTarget.value);
    onChange({ sortBy: value });
  };

  const handleChangeSearch = (searchText: string) => {
    onChange({ search: searchText, page: 1 });
  };

  return (
    <div
      className={`flex flex-row gap-y-4 gap-x-4 items-start flex-wrap justify-between ${className}`}
    >
      <div>
        <Search
          onSubmit={handleChangeSearch}
          isLoading={isLoading}
          placeholder="Nach Bestell-Nr. suchen"
          type="number"
        />
      </div>
      <div className="flex gap-5">
        <div className="flex gap-3 items-center">
          <FontAwesomeIcon icon={faFilter} className="text-gray-600" />
          <Dropdown label="Status Filter" color="light">
            <Dropdown.Header className="font-semibold">
              Bestellstatus
            </Dropdown.Header>
            <div className="px-4 py-2 flex flex-col gap-2">
              {Object.values(OrderState).map((el, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Checkbox id={"ORDERSTATE_" + el + "_" + index} />
                  <Label
                    htmlFor={"ORDERSTATE_" + el + "_" + index}
                    className="font-light"
                  >
                    {OrderStateUI[el]}
                  </Label>
                </div>
              ))}
            </div>
            <Dropdown.Divider />
            <Dropdown.Header className="font-semibold">
              Zahlungsstatus
            </Dropdown.Header>
            <Dropdown.Header className="font-semibold">
              Lieferstatus
            </Dropdown.Header>
          </Dropdown>
        </div>
        <div className="flex gap-3 items-center">
          <FontAwesomeIcon icon={faSort} className="text-gray-600" />
          <Select
            className="min-w-40 flex-1"
            name="sort"
            id="sort"
            onChange={handleChangeSortBy}
            disabled={isLoading}
            defaultValue={filter.sortBy}
          >
            <option value={SortBy.NEW_DESC}>
              Neueste Bestellungen absteigend
            </option>
            <option value={SortBy.NEW_ASC}>
              Neueste Bestellungen aufsteigend
            </option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default OrdersFilter;
