import React from "react";

const ContentContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="max-w-screen-xl w-full">{children}</div>
    </div>
  );
};

export default ContentContainer;
