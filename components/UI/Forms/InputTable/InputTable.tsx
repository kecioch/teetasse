"use client";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, TextInput } from "flowbite-react";
import React from "react";

export interface InputField {
  value: string | number;
}

export interface Config {
  title?: string;
  type?: "number" | "text";
  min?: number;
  max?: number;
  step?: string;
}

interface Props {
  inputFields: InputField[][];
  configCols: Config[];
  setInputFields: (attributes: InputField[][]) => void;
}

const InputTable = ({ inputFields, configCols, setInputFields }: Props) => {
  const handleInputChange = (
    rowIndex: number,
    cellIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let data: InputField[][] = [...inputFields];
    data[rowIndex][cellIndex] = {
      ...data[rowIndex][cellIndex],
      value: event.target.value,
    };
    setInputFields(data);
  };

  const handleInputDelete = (rowIndex: number) => {
    let data = [...inputFields];
    data.splice(rowIndex, 1);
    setInputFields(data);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          {configCols.map((item, index) => (
            <Table.HeadCell key={index}>{item.title}</Table.HeadCell>
          ))}
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
          {inputFields.map((row, rowIndex) => {
            return (
              <Table.Row key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <Table.Cell key={cellIndex}>
                    <TextInput
                      name={configCols[cellIndex].title}
                      placeholder={configCols[cellIndex].title}
                      value={cell.value}
                      type={configCols[cellIndex].type}
                      min={configCols[cellIndex].min}
                      max={configCols[cellIndex].max}
                      step={configCols[cellIndex].step}
                      onChange={(event) =>
                        handleInputChange(rowIndex, cellIndex, event)
                      }
                      required
                    />
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <button
                    type="button"
                    onClick={() => handleInputDelete(rowIndex)}
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

export default InputTable;
