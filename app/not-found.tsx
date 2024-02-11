import ContentContainer from "@/components/UI/Container/ContentContainer";
import React from "react";

const NotFound = () => {
  return (
    <ContentContainer
      className="mt-12 mb-5 p-4 flex flex-1"
      innerClassName="flex justify-center"
    >
      <h1 className="text-4xl  text-gray-600 font-light text-center">
        <span className="font-bold">404 |</span> Seite wurde nicht gefunden
      </h1>
    </ContentContainer>
  );
};

export default NotFound;
