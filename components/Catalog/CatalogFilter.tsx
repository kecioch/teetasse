"use client";

import { Category } from "@/types/category";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, Label, Select } from "flowbite-react";
import React, { useState } from "react";

interface Props {
  categories?: Category[];
  isLoading?: boolean;
}

enum SortBy {
  NEW_ASC,
  NEW_DESC,
  BEST_RATING_ASC,
  BEST_RATING_DESC,
}

const CatalogFilter = ({ categories = [], isLoading = false }: Props) => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [subcategoryIndex, setSubcategoryIndex] = useState(0);

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    setCategoryIndex(index);
  };

  const handleChangeSubcategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    setSubcategoryIndex(index);
  };

  const handleChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    console.log("CHANGE SORT BY", value);
  };

  return (
    <div className="flex justify-between flex-wrap gap-5">
      <div className="flex gap-5 items-end">
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="category"
              value="Kategorie"
              className="font-light uppercase"
            />
          </div>
          <Select
            className="min-w-40"
            name="category"
            id="category"
            onChange={handleChangeCategory}
            disabled={isLoading}
          >
            {categoryIndex === -1 && <option>Wähle eine Kategorie</option>}
            {categories.map((item, index) => (
              <option key={index}> {item.title}</option>
            ))}
          </Select>
        </div>
        <div>
          <Select
            className="min-w-40"
            name="subcategory"
            id="subcategory"
            onChange={handleChangeSubcategory}
            disabled={isLoading}
          >
            {categoryIndex != -1 &&
              categories[categoryIndex].subs.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.title}
                </option>
              ))}
          </Select>
        </div>
        <Button onClick={() => setCategoryIndex(-1)}>RESET</Button>
      </div>
      <div className="flex gap-5">
        <div className="flex items-end">
          <div className="flex gap-3 items-center">
            <FontAwesomeIcon icon={faFilter} className="text-gray-600" />
            <Dropdown label="Filter" disabled={isLoading}></Dropdown>
          </div>
        </div>
        <div className="flex items-end">
          <div className="flex gap-3 items-center">
            <FontAwesomeIcon icon={faSort} className="text-gray-600" />
            <Select
              className="min-w-40"
              name="sort"
              id="sort"
              onChange={handleChangeSortBy}
              disabled={isLoading}
            >
              <option value={SortBy.NEW_DESC}>
                Neueste Produkte absteigend
              </option>
              <option value={SortBy.NEW_ASC}>
                Neueste Produkte aufsteigend
              </option>
              <option value={SortBy.BEST_RATING_DESC}>
                Beste Bewertungen absteigend
              </option>
              <option value={SortBy.BEST_RATING_ASC}>
                Beste Bewertungen aufsteigend
              </option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogFilter;
