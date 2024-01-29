"use client";

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
import React, { ChangeEvent, useEffect, useState } from "react";
import { InputField } from "../../../../UI/Forms/InputTable/InputTable";
import InputTableManager from "../../../../UI/Forms/InputTable/InputTableManager";
import { Category } from "@/types/category";
import { Product, Variant } from "@/types/product";
import LoadingButton from "@/components/UI/Buttons/LoadingButton";

interface Image {
  url?: string;
  file?: File;
}

export interface ProductModalProps {
  show: boolean;
  title?: string;
  button?: {
    title?: string;
  };
  product?: Product;
  dismissible?: boolean;
  position?: string;
  error?: string;
  isLoading?: boolean;
  categories?: Category[];
  onClose?: () => void;
  onSubmit?: (product: Product) => void;
}

interface Form {
  name: string;
  recommended: boolean;
  description: string;
  categoryId: number | undefined;
  subCategoryId: number | undefined;
  images: Image[];
  attributes: InputField[][];
  variants: InputField[][];
  variantIds: number[];
}

const ProductModal = ({
  show,
  title,
  button,
  product,
  dismissible = false,
  position = "top-center",
  categories = [],
  error,
  isLoading,
  onClose,
  onSubmit,
}: ProductModalProps) => {
  const [formData, setFormData] = useState<Form>({
    name: "",
    recommended: false,
    description: "",
    categoryId: categories[0]?.id || undefined,
    subCategoryId: categories[0]?.subs[0]?.id || undefined,
    images: [],
    attributes: [],
    variants: [],
    variantIds: [],
  });

  useEffect(() => {
    // Set default values of formdata when product is available
    if (product) {
      const attributesInit: InputField[][] = [];
      for (const [outerKey, innerObject] of Object.entries(product.features)) {
        // Iterate through inner key-value pairs
        for (const [innerKey, innerValue] of Object.entries(innerObject)) {
          attributesInit.push([{ value: innerKey }, { value: innerValue }]);
        }
      }
      setFormData((prev) => ({
        ...prev,
        name: product.title,
        recommended: product.recommended,
        description: product.description,
        categoryId: product.subcategory?.category?.id,
        subCategoryId: product.subcategory?.id,
        images: product.imageUrls.map((item) => ({ url: item })) || [],
        attributes: attributesInit,
        variants:
          product.variants.map((variant) => [
            { value: variant.title },
            { value: variant.price },
            { value: variant.stock },
          ]) || [],
        variantIds: product.variants.map((variant) => variant.id || -1),
      }));
    }
  }, [product]);

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
    const id = parseInt(ev.currentTarget.value);
    setFormData((prevData) => ({
      ...prevData,
      categoryId: id,
      subCategoryId:
        categories[categories.findIndex((el) => el.id === id)].subs[0]?.id,
    }));
  };

  const handleChangeSubCategory = (ev: ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(ev.currentTarget.value);
    setFormData((prevData) => ({
      ...prevData,
      subCategoryId: id,
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
    if (!formData.subCategoryId || !formData.categoryId) return;

    // Transform attributes(InputField[][]) to Features type
    const attributes = formData.attributes;
    let features: any = {};
    for (let row = 0; row < attributes.length; row++) {
      features["f" + row] = {
        [attributes[row][0].value]: attributes[row][1].value,
      };
    }

    // Transform variants(InputField[][]) to Variant[] type
    const variantsData = formData.variants;
    const variants: Variant[] = [];
    for (let row = 0; row < variantsData.length; row++) {
      const variant = variantsData[row];
      variants.push({
        id: formData.variantIds[row],
        title: variant[0].value.toString(),
        price: Number(variant[1].value),
        stock: Number(variant[2].value),
      });
    }

    // Create Product
    const newProduct: Product = {
      id: product?.id,
      title: formData.name,
      description: formData.description,
      rating: 0,
      recommended: formData.recommended,
      imageUrls: formData.images.map((image) => image.url || "") || [],
      subcategoryId: formData.subCategoryId,
      variants,
      features,
    };

    // Call handler
    onSubmit && onSubmit(newProduct);
  };

  const setAttributes = (attributes: InputField[][]) => {
    setFormData((prev) => ({ ...prev, attributes }));
  };

  const setVariants = (variants: InputField[][]) => {
    setFormData((prev) => ({ ...prev, variants }));
  };

  const setVariantIdList = (idList: number[]) => {
    setFormData((prev) => ({ ...prev, variantIds: idList }));
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      position={position}
      dismissible={dismissible}
    >
      <Modal.Header className="uppercase text-gray-800">{title}</Modal.Header>
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
                  htmlFor="category"
                  value="Kategorie"
                  className="text-md"
                />
              </div>
              <Select
                id="category"
                onChange={handleChangeCategory}
                value={formData.categoryId}
                required
              >
                {categories.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.title}
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
                value={formData.subCategoryId}
                required
              >
                {categories[
                  categories.findIndex((el) => el.id === formData.categoryId)
                ]?.subs.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.title}
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
              idList={formData.variantIds}
              setInputFields={setVariants}
              setIdList={setVariantIdList}
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
                      {image.file?.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {error && <span className="text-red-600">{error}</span>}
            <LoadingButton
              color="success"
              type="submit"
              className="mt-5"
              isLoading={isLoading}
            >
              {button?.title}
            </LoadingButton>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
