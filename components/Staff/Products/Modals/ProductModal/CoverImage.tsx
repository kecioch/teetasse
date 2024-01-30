import Image from "next/image";
import React from "react";

interface Props {
  imageSrc: string;
  disabled?: boolean;
  onDelete?: () => void;
}

const CoverImage = ({ imageSrc, disabled, onDelete }: Props) => {
  return (
    <div className="relative bg-gray-200 w-24 h-24 flex flex-col justify-start rounded-md overflow-hidden">
      <Image
        src={imageSrc}
        fill
        alt="Produktbild"
        style={{ objectFit: "cover" }}
      />

      <button
        aria-label="Close"
        className="absolute top-0 right-0 ml-auto inline-flex items-center bg-slate-950 opacity-80 p-0.5 rounded-md text-sm text-gray-400  hover:text-gray-900 hover:bg-gray-400"
        type="button"
        onClick={onDelete}
        disabled={disabled}
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
    </div>
  );
};

export default CoverImage;
