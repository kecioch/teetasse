"use client";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, TextInput } from "flowbite-react";
import React from "react";

export interface InputField {
  key: string;
  value: string | number;
}

export interface Description {
  key: string;
  value: string;
}

export interface Config {
  type?: "number" | "text";
  min?: number;
  max?: number;
  step?: string;
}

interface Props {
  description: Description;
  inputFields: InputField[];
  setInputFields: (attributes: InputField[]) => void;
  config?: Config;
}

const KeyValueInputTable = ({
  description,
  inputFields,
  setInputFields,
  config = {
    type: "text",
  },
}: Props) => {
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let data: InputField[] = [...inputFields];
    data[index] = {
      ...data[index],
      [event.target.name]: event.target.value,
    };
    setInputFields(data);
  };

  const handleInputDelete = (index: number) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>{description.key}</Table.HeadCell>
          <Table.HeadCell>{description.value}</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Bearbeiten</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {inputFields.length <= 0 && (
            <Table.Row>
              <Table.Cell>Keine Einträge vorhanden</Table.Cell>
            </Table.Row>
          )}
          {inputFields.map((input, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <TextInput
                    name="key"
                    placeholder={description.key}
                    value={input.key}
                    onChange={(event) => handleInputChange(index, event)}
                    required
                  />
                </Table.Cell>
                <Table.Cell>
                  <TextInput
                    name="value"
                    type={config.type}
                    min={config.min}
                    max={config.max}
                    step={config.step}
                    placeholder={description.value}
                    value={input.value}
                    onChange={(event) => handleInputChange(index, event)}
                    required
                  />
                </Table.Cell>
                <Table.Cell>
                  <button
                    type="button"
                    onClick={() => handleInputDelete(index)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ height: "20px" }}
                    />
                  </button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default KeyValueInputTable;
