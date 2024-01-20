import React from "react";

interface Props {
  children: any;
  className?: string;
}

const Button = ({ children, className }: Props) => {
  return (
    <button
      className={`bg-transparent outline outline-green-800 p-2 hover:bg-green-800 hover:text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
