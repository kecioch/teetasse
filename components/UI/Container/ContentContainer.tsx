import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const ContentContainer = ({ children, className }: Props) => {
  return (
    <div className={`flex flex-row justify-center items-center ${className}`}>
      <div className="max-w-screen-xl w-full">{children}</div>
    </div>
  );
};

export default ContentContainer;
