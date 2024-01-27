import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  FileInput,
  Label,
  Modal,
  Select,
  TextInput,
  Textarea,
  ToggleSwitch,
} from "flowbite-react";
import React, { ChangeEvent, useState } from "react";
import { InputField } from "../../../../UI/Forms/InputTable/InputTable";
import InputTableManager from "../../../../UI/Forms/InputTable/InputTableManager";
import { Category } from "@/types/category";

interface Image {
  file: File;
}

interface Props {
  show: boolean;
  categories?: Category[];
  onClose: () => void;
}

interface Form {
  name: string;
  recommended: boolean;
  description: string;
  categoryIndex: number;
  subCategoryIndex: number;
  images: Image[];
  attributes: InputField[][];
  variants: InputField[][];
}

const ProductModal = ({ show, categories = [], onClose }: Props) => {
  const [formData, setFormData] = useState<Form>({
    name: "",
    recommended: false,
    description: "",
    categoryIndex: 0,
    subCategoryIndex: 0,
    images: [],
    attributes: [
      [{ value: "Anbau" }, { value: "Bio" }],
      [{ value: "Geschmack" }, { value: "lieblich" }],
      [{ value: "Geschmacksrichtung" }, { value: "herb-aromatisch" }],
    ],
    variants: [
      [{ value: "100g" }, { value: "7" }, { value: 0 }],
      [{ value: "260g" }, { value: "11" }, { value: 155 }],
    ],
  });

  const handleSwitch = () => {
    setFormData((prev) => ({ ...prev, recommended: !prev.recommended }));
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeCategory = (ev: ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(ev.currentTarget.value);

    // setSelectedCategoryIndex(index);
    setFormData((prevData) => ({
      ...prevData,
      categoryIndex: index,
    }));
  };

  const handleChangeSubCategory = (ev: ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(ev.currentTarget.value);

    setFormData((prevData) => ({
      ...prevData,
      subCategoryIndex: index,
    }));
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

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: [...newImages] }));
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log("SUBMIT");
    console.log(formData);
  };

  const setAttributes = (attributes: InputField[][]) => {
    setFormData((prev) => ({ ...prev, attributes }));
  };

  const setVariants = (variants: InputField[][]) => {
    setFormData((prev) => ({ ...prev, variants }));
  };

  return (
    <Modal show={show} onClose={onClose} position="top-center">
      <Modal.Header className="uppercase text-gray-800">
        Neues Produkt
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex justify-between gap-5">
              <div className="flex-grow">
                <div className="mb-2 block">
                  <Label
                    htmlFor="name"
                    value="Produktname"
                    className="text-md"
                  />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Produktname"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="recommended"
                    value="Empfohlen"
                    className="text-md"
                  />
                </div>
                <ToggleSwitch
                  id="recommended"
                  name="recommended"
                  checked={formData.recommended}
                  onChange={handleSwitch}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="description"
                  value="Beschreibung"
                  className="text-md"
                />
              </div>
              <Textarea
                id="description"
                rows={5}
                name="description"
                placeholder="Beschreibung"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="categorie"
                  value="Kategorie"
                  className="text-md"
                />
              </div>
              <Select
                id="categorie"
                onChange={handleChangeCategory}
                value={formData.categoryIndex}
                required
              >
                {categories.map((item, index) => (
                  <option key={index} value={index}>
                    {item.title} / {item.id}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="subcategorie"
                  value="Sub-Kategorie"
                  className="text-md"
                />
              </div>
              <Select
                id="subcategorie"
                onChange={handleChangeSubCategory}
                value={formData.subCategoryIndex}
                required
              >
                {categories[formData.categoryIndex]?.subs.map((item, index) => (
                  <option key={index} value={index}>
                    {item.title} / {item.id}
                  </option>
                ))}
              </Select>
            </div>
            <InputTableManager
              title="Eigenschaften"
              buttonTitle="Eigenschaft hinzufügen"
              configCols={[
                { title: "Titel", type: "text" },
                { title: "Wert", type: "text" },
              ]}
              inputFields={formData.attributes}
              setInputFields={setAttributes}
            />
            <InputTableManager
              title="Produktvarianten"
              buttonTitle="Produktvariante hinzufügen"
              configCols={[
                { title: "Titel", type: "text" },
                {
                  title: "Preis (€)",
                  type: "number",
                  step: "0.01",
                  min: 0,
                },
                {
                  title: "Lager",
                  type: "number",
                  step: "1",
                  min: 0,
                },
              ]}
              inputFields={formData.variants}
              setInputFields={setVariants}
            />
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="dropzone-file"
                  value="Produktbilder"
                  className="text-md"
                />
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
              {formData.images.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {formData.images.map((image, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 w-20 h-20 flex flex-col justify-start rounded-md"
                    >
                      <button
                        aria-label="Close"
                        className="ml-auto inline-flex items-center bg-transparent p-0.5 text-sm text-gray-400  hover:text-gray-900 "
                        type="button"
                        onClick={() => handleDeleteImage(index)}
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
