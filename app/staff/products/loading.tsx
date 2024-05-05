import { Spinner } from "flowbite-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div>
      <h1 className="text-3xl uppercase text-gray-800">Produktverwaltung</h1>
      <hr className="my-5" />
      <div className="flex justify-center mt-10">
        <Spinner size="xl" color="success" />
      </div>
    </div>
  );
};

export default LoadingPage;
