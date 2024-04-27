import ImageCarousel from "@/components/Product/ImageCarousel/ImageCarousel";
import ProductToCart from "@/components/Product/ProductToCart";
import ProductRating from "@/components/Product/Rating/ProductRating";
import ReviewSection from "@/components/Product/Reviews/ReviewSection";
import SubHeader from "@/components/Product/UI/SubHeader";
import ContentContainer from "@/components/UI/Container/ContentContainer";
import ImageSkeleton from "@/components/UI/Skeleton/ImageSkeleton";
import { getAllProductIds, getProduct } from "@/lib/services/product";
import { ReduxProvider } from "@/redux/ReduxProvider";
import { Product } from "@/types/product";
import { IdSlug, IdSlugArr } from "@/types/slugs/Id";
import {
  Breadcrumb,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "flowbite-react";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata(
  { params }: IdSlugArr,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product: Product | undefined = await getProduct(parseInt(params.id[0]));

  return {
    title: product?.title,
    description: product?.description,
    keywords: [
      "Teetasse",
      "Tee",
      "Teeshop",
      product?.title || "",
      product?.subcategory?.category?.title || "",
      product?.subcategory?.title || "",
    ],
    openGraph: {
      title: product?.title + " | Teetasse",
      description: product?.description,
      siteName: "Teetasse",
      url: process.env.BASE_URL + "products/" + product?.id + "/" + product?.title,
      type: "website",
      images: product?.imageIds.map(
        (id) => `${process.env.NEXT_PUBLIC_CLOUDINARY_PREFIX}/${id}`
      ),
    },
  };
}

const ProductPage = async ({ params }: IdSlugArr) => {
  const product: Product | undefined = await getProduct(parseInt(params.id[0]));
  if (!product) redirect("/");

  // Create Features-Array
  const features: { key: string; value: string }[] = [];
  Object.values(product.features).forEach((feature) => {
    Object.entries(feature).forEach(([subKey, value]) => {
      features.push({ key: subKey, value });
    });
  });

  // Create JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image:
      product.imageIds.length >= 1
        ? `${process.env.NEXT_PUBLIC_CLOUDINARY_PREFIX}/${product.imageIds[0]}`
        : "",
    description: product.description,
    category: product.subcategory?.title,
    url: process.env.BASE_URL + "products/" + product?.id + "/" + product?.title,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.ratingCnt,
    },
    offers: product.variants.map((variant) => {
      return {
        "@type": "Offer",
        availability: "http://schema.org/InStock",
        price: variant.price,
        name: variant.title,
        priceCurrency: "EUR",
      };
    }),
  };

  return (
    <ContentContainer className="mt-12 mb-5 p-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mt-3">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link
              href={"/products?categoryId=" + product.subcategory?.category?.id}
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
            <h2 className="text-center text-md font-light">Nr. {product.id}</h2>
            <h1 className="text-center text-3xl mb-3">{product.title}</h1>
            <ProductRating
              rating={product.rating}
              ratingCnt={product.ratingCnt}
              href="#reviews"
            />
            <p className="text-center font-light mt-3">{product.description}</p>
            <ReduxProvider>
              <ProductToCart className="max-w-[25em] mt-10" product={product} />
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
    </ContentContainer>
  );
};

export default ProductPage;
