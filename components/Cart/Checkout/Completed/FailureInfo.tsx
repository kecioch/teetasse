import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";

const FailureInfo = () => {
  return (
    <div className="flex flex-col justify-center items-center text-red-700">
      <h1 className="mt-16 text-5xl font-light text-center">
        Oops, bei der Bestellung ist ein Fehler aufgetreten
      </h1>
      <h2 className="mt-7 text-3xl font-light text-center">
        Wende dich bei Rückfragen an unseren Kundenservice
      </h2>
      <Link href="/" className="w-full md:w-[40%] mt-20">
        <Button className="w-full" size="lg" color="light">
          Zurück zu Startseite
        </Button>
      </Link>
    </div>
  );
};

export default FailureInfo;
