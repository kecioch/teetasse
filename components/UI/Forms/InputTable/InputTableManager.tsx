"use client";

import { Button, Label } from "flowbite-react";
import React from "react";
import { Config, InputField } from "./InputTable";
import InputTable from "./InputTable";

interface Props {
  title: string;
  buttonTitle: string;
  configCols: Config[];
  inputFields: InputField[][];
  setInputFields: (attributes: InputField[][]) => void;
}

const InputTableManager = ({
  title,
  buttonTitle,
  configCols,
  inputFields,
  setInputFields,
}: Props) => {
  const handleInputAdd = () => {
    const newRow = configCols.map((item) => ({
      value: item.type === "number" ? 0 : "",
    }));
    setInputFields([...inputFields, newRow]);
  };

  return (
    <div>
      <div className="mb-2 block">
        <Label value={title} className="text-md" />
      </div>
      <InputTable
        inputFields={inputFields}
        configCols={configCols}
        setInputFields={setInputFields}
      />
      <Button className="mt-3" color="light" pill onClick={handleInputAdd}>
        {buttonTitle}
      </Button>
    </div>
  );
};

export default InputTableManager;
