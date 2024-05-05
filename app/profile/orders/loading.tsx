import { Spinner } from "flowbite-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div>
      <h1 className="text-3xl uppercase text-gray-800 mb-10">
        Meine Bestellungen
      </h1>

      <div className="flex justify-center">
        <Spinner size="xl" color="success" />
      </div>
    </div>
  );
};

export default LoadingPage;
