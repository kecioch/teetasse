"use client";

import React, { ChangeEvent } from "react";
import styles from "./NumberInput.module.css";

interface Props {
  max: number;
  value: number;
  onChange: (val: number) => void;
  disabled?: boolean;
  className?: string;
}

const NumberInput = ({
  max,
  value,
  onChange,
  disabled = false,
  className,
}: Props) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value <= 0 || value > max) return onChange(1);

    onChange(value);
  };

  return (
    <div className={`relative flex items-center max-w-[8rem] ${className}`}>
      <button
        type="button"
        className={`bg-transparent p-3 focus:outline-none ${
          value > 1 ? "active:text-gray-400 text-gray-900" : "text-gray-300"
        }`}
        onClick={() => onChange(value > 1 ? value - 1 : 1)}
        disabled={value <= 1}
        aria-label="Anzahl verringern"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        type="number"
        data-input-counter
        aria-describedby="Anzahl"
        className={`bg-white border-0  text-center text-sm block w-full py-2.5 ${
          disabled ? "text-gray-300 " : "text-gray-900 "
        } ${styles.input}`}
        placeholder="1"
        min={1}
        max={max}
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        required
      />
      <button
        type="button"
        className={`bg-transparent p-3 focus:outline-none ${
          value < max ? "text-gray-900 active:text-gray-400" : "text-gray-300"
        }`}
        onClick={() => onChange(value < max ? value + 1 : value)}
        disabled={value >= max}
        aria-label="Anzahl erhöhen"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default NumberInput;
