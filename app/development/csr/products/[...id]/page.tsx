"use client";

import ImageCarousel from "@/components/Product/ImageCarousel/ImageCarousel";
import ProductToCart from "@/components/Product/ProductToCart";
import ProductRating from "@/components/Product/Rating/ProductRating";
import ReviewSection from "@/components/Product/Reviews/ReviewSection";
import SubHeader from "@/components/Product/UI/SubHeader";
import ContentContainer from "@/components/UI/Container/ContentContainer";
import ImageSkeleton from "@/components/UI/Skeleton/ImageSkeleton";
import { ReduxProvider } from "@/redux/ReduxProvider";
import { Product } from "@/types/product";
import { IdSlugArr } from "@/types/slugs/Id";
import {
  Breadcrumb,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "flowbite-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductPage = ({ params }: IdSlugArr) => {
  const [product, setProduct] = useState<Product | undefined>();
  const [isFetching, setIsFetching] = useState(false);
  const [jsonLd, setJsonLd] = useState<any>();
  const [features, setFeatures] = useState<{ key: string; value: string }[]>(
    []
  );

  useEffect(() => {
    // Fetch product
    const fetchProduct = async () => {
      setIsFetching(true);
      const id = parseInt(params.id[0]);
      console.log("PRODUCT ID: ", id);

      const res = await fetch("/api/products/" + id);
      console.log(res);
      const data = await res.json();
      console.log(data);
      const productData: Product = {
        ...data,
        reviews: data.reviews.map((review: any) => ({
          ...review,
          created: new Date(review.created),
        })),
      };
      console.log(productData);
      setIsFetching(false);

      if (!productData) return;
      // if (!product) redirect("/");

      setProduct(productData);
      // Create JSON-LD
      setJsonLd({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product?.title,
        image:
          productData.imageIds.length >= 1
            ? `${process.env.NEXT_PUBLIC_CLOUDINARY_PREFIX}/${productData.imageIds[0]}`
            : "",
        description: productData.description,
        category: productData.subcategory?.title,
        url:
          process.env.BASE_URL +
          "products/" +
          product?.id +
          "/" +
          product?.title,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: productData.rating,
          reviewCount: productData.ratingCnt,
        },
        offers: productData.variants.map((variant: any) => {
          return {
            "@type": "Offer",
            availability: "http://schema.org/InStock",
            price: variant.price,
            name: variant.title,
            priceCurrency: "EUR",
          };
        }),
      });

      // Create Features-Array
      const newFeatures: { key: string; value: string }[] = [];
      Object.values(productData.features).forEach((feature) => {
        Object.entries(feature).forEach(([subKey, value]) => {
          newFeatures.push({ key: subKey, value });
        });
      });
      setFeatures(newFeatures);
    };

    fetchProduct();
  }, []);

  return (
    <ContentContainer className="mt-12 mb-5 p-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {!product && (
        <div className="w-full flex justify-center mt-10">
          <Spinner size="xl" color="success" />
        </div>
      )}
      {product && (
        <React.Fragment>
          <header className="mt-3">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link
                  href={
                    "/products?categoryId=" + product.subcategory?.category?.id
                  }
                >
                  {product.subcategory?.category?.title}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link
                  href={
                    "/products?categoryId=" +
                    product.subcategory?.category?.id +
                    "&subcategoryId=" +
                    product.subcategory?.id
                  }
                >
                  {product.subcategory?.title}
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            <section className="flex pt-5 gap-10 flex-wrap flex-col-reverse md:flex-nowrap md:flex-row">
              {product.imageIds.length >= 1 ? (
                <ImageCarousel
                  className="w-full md:max-w-[60%]"
                  imageUrls={product.imageIds.map(
                    (id) => `${process.env.NEXT_PUBLIC_CLOUDINARY_PREFIX}/${id}`
                  )}
                />
              ) : (
                <ImageSkeleton className="min-h-80" />
              )}
              <section className="w-full flex flex-col items-center md:max-w-[35%]">
                <h2 className="text-center text-md font-light">
                  Nr. {product.id}
                </h2>
                <h1 className="text-center text-3xl mb-3">{product.title}</h1>
                <ProductRating
                  rating={product.rating}
                  ratingCnt={product.ratingCnt}
                  href="#reviews"
                />
                <p className="text-center font-light mt-3">
                  {product.description}
                </p>
                <ReduxProvider>
                  <ProductToCart
                    className="max-w-[25em] mt-10"
                    product={product}
                  />
                </ReduxProvider>
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
                        <TableCell className="font-bold text-md md:text-lg">
                          {item.key}
                        </TableCell>
                        <TableCell className="text-md md:text-lg">
                          {item.value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>
          )}
          <section className="mt-10">
            <SubHeader id="reviews">Bewertungen</SubHeader>
            <ReviewSection data={product.reviews} productId={product.id} />
          </section>
        </React.Fragment>
      )}
    </ContentContainer>
  );
};

export default ProductPage;
