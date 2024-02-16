"use client";

import { Category } from "@/types/category";
import { ProductFilterOptions, ProductSortBy } from "@/types/filterOptions";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label, Select } from "flowbite-react";
import React from "react";

interface Props {
  categories?: Category[];
  isLoading?: boolean;
  className?: string;
  filter: ProductFilterOptions;
  onChange: (options: ProductFilterOptions) => void;
}

const CatalogFilter = ({
  categories = [],
  isLoading = false,
  className,
  filter,
  onChange,
}: Props) => {
  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.currentTarget.value);
    const index = categories.findIndex((el) => el.id === id);

    const newSubcategoryId =
      index !== -1 && categories[index].subs.length > 0
        ? categories[index].subs[0].id
        : undefined;

    onChange({
      subcategoryId: newSubcategoryId,
      categoryId: id,
      categoryIndex: index,
      page: 1,
    });
  };

  const handleChangeSubcategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.currentTarget.value);
    onChange({ subcategoryId: id, page: 1 });
  };

  const handleChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.currentTarget.value);
    onChange({ sortBy: value });
  };

  return (
    <div className={`flex justify-between flex-wrap gap-5 ${className}`}>
      <div className="flex gap-5 items-end w-full md:w-auto">
        <div className="flex-1">
          <div className="mb-2 block">
            <Label
              htmlFor="category"
              value="Kategorie"
              className="font-light uppercase"
            />
          </div>
          <Select
            className="md:min-w-56"
            name="category"
            id="category"
            onChange={handleChangeCategory}
            disabled={isLoading}
            value={filter.categoryId || "DEFAULT_OPTION"}
          >
            {!filter.categoryId && (
              <option value="DEFAULT_OPTION">Wähle eine Kategorie</option>
            )}
            {categories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.title}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex-1">
          <Select
            className="md:min-w-56"
            name="subcategory"
            id="subcategory"
            onChange={handleChangeSubcategory}
            disabled={isLoading}
            value={filter.subcategoryId || "DEFAULT_OPTION"}
          >
            {!filter.subcategoryId && (
              <option value="DEFAULT_OPTION">Wähle eine Subkategorie</option>
            )}
            {filter.categoryIndex !== undefined && filter.categoryIndex >= 0
              ? categories[filter.categoryIndex]?.subs.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.title}
                  </option>
                ))
              : null}
          </Select>
        </div>
      </div>

      <div className="flex gap-5 w-full md:w-auto">
        <div className="flex-1 flex flex-col">
          <div className="mb-2 block flex-1">
            <Label
              htmlFor="sort"
              value="Sortieren nach"
              className="font-light uppercase"
            />
          </div>
          <div className="flex gap-3 items-center flex-1">
            <FontAwesomeIcon icon={faSort} className="text-gray-600" />
            <Select
              className="min-w-40 flex-1"
              name="sort"
              id="sort"
              onChange={handleChangeSortBy}
              disabled={isLoading}
              value={filter.sortBy}
            >
              <option value={ProductSortBy.NEW_DESC}>
                Neueste Produkte absteigend
              </option>
              <option value={ProductSortBy.NEW_ASC}>
                Neueste Produkte aufsteigend
              </option>
              <option value={ProductSortBy.BEST_RATING_DESC}>
                Beste Bewertungen absteigend
              </option>
              <option value={ProductSortBy.BEST_RATING_ASC}>
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
