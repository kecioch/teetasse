"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  show: boolean;
  className?: string;
  icon: IconProp;
  onClick: () => void;
}

const ImageCarouselArrow = ({ show, className, icon, onClick }: Props) => {
  return (
    <div
      className={`${
        show ? "absolute" : "hidden"
      } ${className} top-0 bottom-0  h flex justify-center items-center p-3  z-20`}
    >
      <button
        className="p-3 text-gray-700 hover:text-gray-400"
        onClick={onClick}
      >
        <FontAwesomeIcon icon={icon} size="2xl" />
      </button>
    </div>
  );
};

export default ImageCarouselArrow;
