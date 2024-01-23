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
import KeyValueInputTable, { InputField } from "./KeyValueInputTable";
import KeyValueInput from "./KeyValueInput";

interface Image {
  file: File;
}

interface Props {
  show: boolean;
  onClose: () => void;
}

const ProductModal = ({ show, onClose }: Props) => {
  const [attributes, setAttributes] = useState<InputField[]>([
    {
      key: "Anbau",
      value: "Bio",
    },
    {
      key: "Geschmack",
      value: "lieblich",
    },
    {
      key: "Geschmacksrichtung",
      value: "herb-aromatisch",
    },
  ]);

  const [variants, setVariants] = useState<InputField[]>([
    {
      key: "100g",
      value: "7",
    },
    {
      key: "250g",
      value: "10",
    },
  ]);

  const [images, setImages] = useState<Image[]>([]);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log("SUBMIT");
  };

  const handleFileDropzone = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    console.log(files);
    if (!files || files?.length <= 0) return;

    const newImages: Image[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.includes("image")) {
        newImages.push({
          file,
        });
      }
    });

    setImages((prev) => [...prev, ...newImages]);
  };

  return (
    <Modal show={show} onClose={onClose} position="top-center">
      <Modal.Header className="uppercase text-gray-800">
        Neues Produkt
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
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
            <KeyValueInput
              title="Eigenschaften"
              buttonTitle="Eigenschaft hinzufügen"
              description={{ key: "Attribut", value: "Wert" }}
              inputFields={attributes}
              setInputFields={setAttributes}
            />
            <KeyValueInput
              title="Produktvarianten"
              buttonTitle="Produktvariante hinzufügen"
              description={{ key: "Titel", value: "Preis (€)" }}
              inputFields={variants}
              setInputFields={setVariants}
              config={{ type: "number", min: 0 }}
            />
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
                  onChange={handleFileDropzone}
                  multiple
                />
              </Label>
              {images.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 w-20 h-20 flex flex-col justify-start rounded-md"
                    >
                      <button
                        aria-label="Close"
                        className="ml-auto inline-flex items-center bg-transparent p-0.5 text-sm text-gray-400  hover:text-gray-900 "
                        type="button"
                        onClick={() => {
                          const newImages = [...images];
                          newImages.splice(index, 1);
                          setImages(newImages);
                        }}
                      >
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="h-5 w-5"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                      {image.file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button color="success" type="submit" className="mt-5">
              Hinzufügen
            </Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
