"use client";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import NavigationButton from "./NavigationButton";

interface Props {
  currentPage: number;
  totalPages: number;
  maxDisplayed?: number;
  className?: string;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  maxDisplayed = 5,
  className,
  onPageChange,
}: Props) => {
  const calculatePageRange = () => {
    const halfMax = Math.floor(maxDisplayed / 2);

    let startPage = Math.max(1, currentPage - halfMax);
    let endPage = Math.min(totalPages, startPage + maxDisplayed - 1);

    if (endPage - startPage + 1 < maxDisplayed) {
      startPage = Math.max(1, endPage - maxDisplayed + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  const pages = calculatePageRange();
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const handleChangePage = (page: number) => {
    if (page === currentPage) return;
    onPageChange(page);
  };

  const handlePrevPage = () => {
    if (!canPrev) return;
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (!canNext) return;
    onPageChange(currentPage + 1);
  };

  return (
    <nav aria-label="Seiten" className={className}>
      <ul className="inline-flex -space-x-px text-base h-10">
        <NavigationButton
          disabled={!canPrev}
          icon={faChevronLeft}
          onClick={handlePrevPage}
          className="rounded-s-lg ms-0 border-e-0"
        />
        {pages.map((el, index) => (
          <li key={index}>
            <button
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                currentPage === el ? "bg-gray-200" : " bg-white "
              }`}
              onClick={() => handleChangePage(el)}
            >
              {el}
            </button>
          </li>
        ))}
        <NavigationButton
          disabled={!canNext}
          icon={faChevronRight}
          onClick={handleNextPage}
          className="rounded-e-lg"
        />
      </ul>
    </nav>
  );
};

export default Pagination;
