import ImageCarousel from "@/components/Product/ImageCarousel/ImageCarousel";
import ProductToCart from "@/components/Product/ProductToCart";
import ProductRating from "@/components/Product/Rating/ProductRating";
import AddCartButton from "@/components/Product/UI/AddCartButton";
import SelectProduct from "@/components/Product/UI/SelectProduct";
import SubHeader from "@/components/Product/UI/SubHeader";
import ContentContainer from "@/components/UI/Container/ContentContainer";
import { getProduct } from "@/lib/services/product";
import { Features, Product } from "@/types/product";
import { IdSlug } from "@/types/slugs/Id";
import { Subcategory } from "@/types/subcategory";
import {
  Breadcrumb,
  Button,
  Dropdown,
  DropdownItem,
  Rating,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "flowbite-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Products = async ({ params }: IdSlug) => {
  const product: Product | undefined = await getProduct(parseInt(params.id));
  if (!product) redirect("/");
  console.log(product.variants);

  const features: { key: string; value: string }[] = [];
  Object.values(product.features).forEach((feature) => {
    Object.entries(feature).forEach(([subKey, value]) => {
      console.log(`${subKey}: ${value}`);
      features.push({ key: subKey, value });
    });
  });

  return (
    <ContentContainer className="mt-12 mb-5 p-4">
      <header className="mt-3">
        <Breadcrumb>
          <Breadcrumb.Item>
            {product.subcategory?.category?.title}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{product.subcategory?.title}</Breadcrumb.Item>
        </Breadcrumb>
        <section className="flex pt-5 gap-10 flex-wrap flex-col-reverse md:flex-nowrap md:flex-row">
          <ImageCarousel
            className="w-full md:max-w-[60%]"
            imageUrls={product.imageIds.map(
              (id) => `${process.env.NEXT_PUBLIC_CLOUDINARY_PREFIX}/${id}`
            )}
          />
          <section className="w-full flex flex-col items-center md:max-w-[35%]">
            <h2 className="text-center text-md font-light">Nr. {product.id}</h2>
            <h1 className="text-center text-3xl mb-3">{product.title}</h1>
            <ProductRating
              rating={product.rating + 3}
              ratingCnt={144}
              href="#ratings"
            />
            <p className="text-center font-light mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores facere pariatur minus tempora repellat est nihil
              aliquam nobis sapiente obcaecati officia maxime nam itaque quo,
              rem nulla repudiandae laudantium voluptatibus.
            </p>
            <ProductToCart
              className="max-w-[25em] mt-10"
              variants={product.variants}
            />
          </section>
        </section>
      </header>
      {features && features.length > 0 && (
        <section className="mt-10">
          <SubHeader>Eigenschaften</SubHeader>
          <div className="md:px-24 mt-7">
            <Table className="w-full drop-shadow-none" striped>
              <TableBody className="divide-y">
                {features.map((item, index) => (
                  <TableRow
                    key={index}
                    className="odd:bg-stone-50 even:bg-white"
                  >
                    <TableCell className="font-bold text-lg">
                      {item.key}
                    </TableCell>
                    <TableCell className="text-lg">{item.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      )}
      <section className="mt-10">
        <SubHeader>Bewertungen</SubHeader>
      </section>
    </ContentContainer>
  );
};

export default Products;
