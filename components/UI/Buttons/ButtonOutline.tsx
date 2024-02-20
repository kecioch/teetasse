import React from "react";

interface Props {
  children: any;
  className?: string;
}

const ButtonOutline = ({ children, className }: Props) => {
  return (
    <button
      className={`bg-transparent border-2 border-solid border-green-800 p-2 hover:bg-green-800 hover:text-white transition-all ease-in ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonOutline;
