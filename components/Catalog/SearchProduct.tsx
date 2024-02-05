"use client";

import { ModalStates, closeModal } from "@/redux/features/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import ContentContainer from "../UI/Container/ContentContainer";

const SearchProduct = () => {
  const showModal =
    useAppSelector((state) => state.modal.showModal) ===
    ModalStates.SEARCH_PRODUCT;
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [searchTxt, setSearchTxt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchTxt(value);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push("/products?search=" + searchTxt + "&refresh=true");
    handleClose();
  };

  useEffect(() => {
    setSearchTxt("");
    if (inputRef.current) inputRef.current.focus();
  }, [showModal]);

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-screen px-4 py-7 overflow-y-auto transition-transform bg-white ${
        !showModal && "-translate-y-full"
      }`}
      tabIndex={-1}
    >
      {showModal && (
        <ContentContainer>
          <form className="flex items-center" onSubmit={handleSearch}>
            <label htmlFor="search" className="sr-only">
              Suche
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="search"
                className="block py-2.5 px-0 w-full text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-800"
                placeholder="Suche nach Produkten"
                value={searchTxt}
                onChange={handleInputChange}
                tabIndex={1}
                ref={inputRef}
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-green-800 bg-transparent rounded-lg hover:text-green-700 focus:ring-4 focus:outline-none focus:ring-green-600"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Suche</span>
            </button>
          </form>
        </ContentContainer>
      )}
    </div>
  );
};

export default SearchProduct;
