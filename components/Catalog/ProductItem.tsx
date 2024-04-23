"use client";

import { Product } from "@/types/product";
import React, { useState } from "react";
import ProductRating from "../Product/Rating/ProductRating";
import Image from "next/image";
import Link from "next/link";
import ImageSkeleton from "../UI/Skeleton/ImageSkeleton";

interface Props {
  data: Product;
  className?: string;
}

const ProductItem = ({ data, className }: Props) => {
  const isSoldOut = data.variants.findIndex((item) => item.stock > 0) === -1;

  return (
    <Link
      href={`/products/${data.id}/${data.title}`}
      className={`h-64 flex flex-shrink-0 ${className}`}
    >
      <div className="flex-1 relative text-center rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        {isSoldOut && (
          <div className="bg-red-500 opacity-90 absolute top-2 left-0 px-3 z-20">
            <span className="text-white font-thin uppercase text-sm">
              Nicht vorrätig
            </span>
          </div>
        )}
        <div className="w-full h-40 relative overflow-hidden flex justify-center flex-col flex-nowrap">
          {data.imageIds.length > 0 ? (
            <Image
              alt={`Produktcover ${data.title}`}
              src={`${process.env.NEXT_PUBLIC_CLOUDINARY_PREFIX}/${data.imageIds[0]}`}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              draggable={false}
            />
          ) : (
            <ImageSkeleton />
          )}
        </div>
        <div className="mt-2 flex justify-center items-center">
          <ProductRating rating={data.rating} ratingCnt={data.ratingCnt} />
        </div>
        <p className="font-light text-sm text-gray-600 mt-2 px-3">
          Nr. {data.id}
        </p>
        <p className="flex-1 truncate px-3" title={data.title}>
          {data.title}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
