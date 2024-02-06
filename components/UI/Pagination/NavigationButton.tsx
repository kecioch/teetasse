"use client";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  disabled: boolean;
  icon: IconDefinition;
  className?: string;
  onClick: () => void;
}

const NavigationButton = ({ disabled, className, icon, onClick }: Props) => {
  return (
    <li>
      <button
        className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 ${className} ${
          !disabled
            ? "bg-white text-gray-500 hover:bg-gray-100"
            : "bg-gray-200 text-gray-400"
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    </li>
  );
};

export default NavigationButton;
