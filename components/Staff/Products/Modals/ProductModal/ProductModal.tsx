"use client";

import {
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
import CoverImage from "./CoverImage";
import FileDropzone from "@/components/UI/Forms/Dropzone/FileDropzone";

interface NewImage {
  url: string;
  file: File;
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
  imageIds: string[];
  newImages: NewImage[];
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
    imageIds: [],
    newImages: [],
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
        imageIds: product.imageIds || [],
        newImages: [],
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

  const handleFileDropzone = (files: File[]) => {
    if (!files || files?.length <= 0) return;

    const newImages: NewImage[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.includes("image")) {
        newImages.push({
          url: URL.createObjectURL(file),
          file,
        });
      }
    });
    setFormData((prev) => ({
      ...prev,
      newImages: [...prev.newImages, ...newImages],
    }));
  };

  const handleDeleteImage = (index: number) => {
    const imageIds = [...formData.imageIds];
    imageIds.splice(index, 1);
    setFormData((prev) => ({ ...prev, imageIds: [...imageIds] }));
  };

  const handleDeleteNewImage = (index: number) => {
    const newImages = [...formData.newImages];
    newImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, newImages: [...newImages] }));
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
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
      ratingCnt: 0,
      recommended: formData.recommended,
      imageIds: formData.imageIds,
      newImages: formData.newImages.map((image) => image.file) || [],
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
      onClose={() => {
        if (!isLoading && onClose) onClose();
      }}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="dropzone-file"
                  value="Produktbilder"
                  className="text-md"
                />
              </div>
              <FileDropzone
                onDropFile={handleFileDropzone}
                disabled={isLoading}
              />
              {(formData.imageIds.length > 0 ||
                formData.newImages.length > 0) && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {formData.imageIds.map((url, index) => (
                    <CoverImage
                      key={index}
                      imageSrc={`${process.env.NEXT_PUBLIC_CLOUDINARY_PREFIX}/${url}`}
                      onDelete={() => handleDeleteImage(index)}
                      disabled={isLoading}
                    />
                  ))}
                  {formData.newImages
                    .map((image) => image.url)
                    .map((url, index) => (
                      <CoverImage
                        key={index}
                        imageSrc={url}
                        onDelete={() => handleDeleteNewImage(index)}
                        disabled={isLoading}
                      />
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
