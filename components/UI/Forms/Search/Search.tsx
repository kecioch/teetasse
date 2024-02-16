"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextInput } from "flowbite-react";
import React, { FormEvent, useState } from "react";

interface Props {
  defaultValue?: string;
  isLoading?: boolean;
  className?: string;
  placeholder?: string;
  type?: string;
  onSubmit: (searchText: string) => void;
}

const Search = ({
  defaultValue,
  className,
  placeholder,
  isLoading,
  type = "text",
  onSubmit,
}: Props) => {
  const [value, setValue] = useState<string>(defaultValue || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValue(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <TextInput
        value={value}
        onChange={handleChange}
        className="flex-1"
        addon={<FontAwesomeIcon icon={faSearch} />}
        type={type}
        placeholder={placeholder}
      />
      <Button type="submit" disabled={isLoading} color="light" className="w-32">
        Suchen
      </Button>
    </form>
  );
};

export default Search;
