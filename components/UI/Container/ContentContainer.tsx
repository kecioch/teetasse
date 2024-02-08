import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

const ContentContainer = ({ children, className, innerClassName }: Props) => {
  return (
    <div
      className={`flex flex-row justify-center items-center w-full ${className}`}
    >
      <div className={`max-w-screen-xl w-full ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default ContentContainer;
