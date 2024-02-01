"use client";

import React, { useEffect, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ImageCarouselArrow from "./ImageCarouselArrow";

interface Props {
  imageUrls: string[];
  className?: string;
}

const ImageCarousel = ({ imageUrls, className }: Props) => {
  const [currImgIndex, setCurrImgIndex] = useState(0);

  const handleSelectImg = (index: number) => {
    setCurrImgIndex(index);
  };

  return (
    <div className={className}>
      <Carousel
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        selectedItem={currImgIndex}
        onChange={(index) => setCurrImgIndex(index)}
        className="w-full overflow-hidden h-80"
        renderArrowPrev={(clickHandler, hasPrev) => {
          return (
            <ImageCarouselArrow
              show={hasPrev}
              onClick={clickHandler}
              icon={faChevronLeft}
              className="left-0"
            />
          );
        }}
        renderArrowNext={(clickHandler, hasNext) => {
          return (
            <ImageCarouselArrow
              show={hasNext}
              onClick={clickHandler}
              icon={faChevronRight}
              className="right-0"
            />
          );
        }}
      >
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className="relative w-full h-80"
            style={{ maxHeight: "100%" }}
          >
            <Image
              src={url}
              alt={"Produktbild " + index}
              fill
              style={{ objectFit: "contain" }}
              draggable={false}
            />
          </div>
        ))}
      </Carousel>
      <div className="gap-2 mt-5 md:mt-10 overflow-x-auto w-full pb-2">
        <div className="flex flex-nowrap">
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className={`min-w-36 h-20 overflow-hidden relative border-2 border-solid ${
                index === currImgIndex
                  ? "border-green-900"
                  : " border-transparent"
              }`}
              onClick={() => handleSelectImg(index)}
            >
              <Image
                src={url}
                alt={"Produktbild " + index}
                fill
                style={{ objectFit: "contain" }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
