import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Checkbox,
  FileInput,
  FloatingLabel,
  Label,
  Modal,
  Select,
  Table,
  TableHead,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  show: boolean;
  onClose: () => void;
}

const ProductModal = ({ show, onClose }: Props) => {
  const [attributes, setAttributes] = useState([
    {
      titel: "Anbau",
      value: "Bio",
    },
    {
      titel: "Geschmack",
      value: "lieblich",
    },
    {
      titel: "Geschmacksrichtung",
      value: "herb-aromatisch",
    },
  ]);
  const refs = useRef(
    attributes.map(() => React.createRef<HTMLInputElement>())
  );

  const handleDelete = (i: number) => {
    console.log("DELTE TITEL " + i);
    setAttributes([...attributes.slice(0, i), ...attributes.slice(i + 1)]);
    // const filtered = attributes.filter((item) =>
    //   item.titel.localeCompare(titel)
    // );
    // setAttributes(filtered);
  };

  const handleChange = (e: any, i: any) => {
    const text = e.target.value;
    console.log(text);
    const values = [...attributes];
    values[i].titel = text;
    setAttributes(values);
    // document.getElementById(`fieldInput-${i}`)?.focus();
    // refs.current[i].current?.focus();
  };


  return (
    <Modal show={show} onClose={onClose} position="top-center">
      <Modal.Header className="uppercase text-gray-800">
        Neues Produkt
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form className="flex w-full flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Produktname" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Produktname"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="categorie" value="Kategorie" />
              </div>
              <Select id="categorie" required>
                <option>Tee</option>
                <option>Zubehör</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="subcategorie" value="Sub-Kategorie" />
              </div>
              <Select id="subcategorie" required>
                <option>Schwarztee</option>
                <option>Grüntee</option>
                <option>Oolong</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="#" value="Eigenschaften" />
              </div>
              <div className="overflow-x-auto">
                <Table suppressContentEditableWarning={true}>
                  <Table.Head>
                    <Table.HeadCell>Attribut</Table.HeadCell>
                    <Table.HeadCell>Wert</Table.HeadCell>
                    <Table.HeadCell>
                      <span className="sr-only">Bearbeiten</span>
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {attributes.map((item, i) => (
                      <Table.Row
                        key={`ATT_${item.titel}_${item.value}_${i}`}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell
                          className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                          id={`attributes_${i}`}
                          key={`cell-${i}`}
                        >
                          <input
                            // id="attribute_titel"
                            type="text"
                            placeholder="Attribute"
                            // value={item.titel}
                            defaultValue={item.titel}
                            key={`fieldInput-${i}`}
                            id={`fieldInput-${i}`}
                            // ref={refs.current[i]}
                            onChange={(e) => handleChange(e, i)}
                            required
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <TextInput
                            // id="name"
                            type="text"
                            placeholder="Wert"
                            defaultValue={item.value}
                            required
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <button type="button" onClick={() => handleDelete(i)}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ height: "20px" }}
                            />
                          </button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
              <Button
                className="mt-3"
                color="light"
                pill
                onClick={() => {
                  setAttributes((prev) => {
                    return [...prev, { titel: "", value: "" }];
                  });
                  console.log(attributes.length);
                  // document
                  //   .getElementById(`attributes_${attributes.length}`)
                  //   ?.focus();
                }}
              >
                Eigenschaft hinzufügen
              </Button>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="#" value="Produktvarianten" />
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <Table.Head>
                    <Table.HeadCell>Titel</Table.HeadCell>
                    <Table.HeadCell>Preis</Table.HeadCell>
                    <Table.HeadCell>
                      <span className="sr-only">Bearbeiten</span>
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        100g
                      </Table.Cell>
                      <Table.Cell itemType="number">7€</Table.Cell>
                      <Table.Cell className="flex justify-center">
                        <button type="button">
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ height: "20px" }}
                          />
                        </button>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        250g
                      </Table.Cell>
                      <Table.Cell itemType="number">10€</Table.Cell>
                      <Table.Cell className="flex justify-center">
                        <button type="button">
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ height: "20px" }}
                          />
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
              <Button className="mt-3" color="light" pill>
                Produktvariante hinzufügen
              </Button>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="dropzone-file" value="Produktbilder" />
              </div>
              <Label
                htmlFor="dropzone-file"
                className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Klicken zum Hochladen</span>{" "}
                    oder <span className="font-semibold">drag and drop</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG oder JPG (MAX. 800x400px)
                  </p>
                </div>
                <FileInput
                  id="dropzone-file"
                  className="hidden"
                  accept=".png,.jpg,.jpeg"
                  multiple
                />
              </Label>
              <div className="mt-5 flex flex-wrap gap-3">
                <div className="bg-gray-200 w-20 h-20" />
                <div className="bg-gray-200 w-20 h-20" />
                <div className="bg-gray-200 w-20 h-20" />
                <div className="bg-gray-200 w-20 h-20" />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="success">Hinzufügen</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
