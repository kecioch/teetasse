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
  idList?: number[];
  disabled?: boolean;
  setInputFields: (attributes: InputField[][]) => void;
  setIdList?: (idList: number[]) => void;
}

const InputTableManager = ({
  title,
  buttonTitle,
  configCols,
  inputFields,
  idList,
  disabled,
  setInputFields,
  setIdList,
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
        idList={idList}
        setInputFields={setInputFields}
        setIdList={setIdList}
        disabled={disabled}
      />
      <Button
        className="mt-3"
        color="light"
        pill
        onClick={handleInputAdd}
        disabled={disabled}
      >
        {buttonTitle}
      </Button>
    </div>
  );
};

export default InputTableManager;
