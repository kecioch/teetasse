"use client";

import { Button, Label } from "flowbite-react";
import React from "react";
import KeyValueInputTable, {
  Config,
  Description,
  InputField,
} from "./KeyValueInputTable";

interface Props {
  title: string;
  buttonTitle: string;
  description: Description;
  inputFields: InputField[];
  setInputFields: React.Dispatch<React.SetStateAction<InputField[]>>;
  config?: Config;
}

const KeyValueInput = ({
  title,
  buttonTitle,
  description,
  inputFields,
  setInputFields,
  config,
}: Props) => {
  const handleInputAdd = () => {
    setInputFields([...inputFields, { key: "", value: "" }]);
  };

  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="#" value={title} />
      </div>
      <KeyValueInputTable
        description={description}
        inputFields={inputFields}
        setInputFields={setInputFields}
        config={config}
      />
      <Button className="mt-3" color="light" pill onClick={handleInputAdd}>
        {buttonTitle}
      </Button>
    </div>
  );
};

export default KeyValueInput;
