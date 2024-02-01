import React from "react";

interface Props {
  children: React.ReactNode;
}

const SubHeader = ({ children }: Props) => {
  return (
    <div className="flex flex-row items-center gap-6">
      <div className="bg-gray-400 h-[1px] flex-1 md:w-24 md:flex-none" />
      <h2 className="uppercase text-gray-600 text-xl">{children}</h2>
      <div className="bg-gray-300 h-[1px] flex-1" />
    </div>
  );
};

export default SubHeader;
