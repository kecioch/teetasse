import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";

const CompletedInfo = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mt-16 text-5xl font-light text-center">
        Vielen Dank für deine Bestellung 🎉
      </h1>
      <h2 className="mt-7 text-3xl font-light text-center">
        Wir kümmern uns so schnell wie möglich um deine Bestellung
      </h2>
      <Link href="/" className="w-full md:w-[40%] mt-20">
        <Button className="w-full" size="lg" color="success">
          Zurück zu Startseite
        </Button>
      </Link>
    </div>
  );
};

export default CompletedInfo;
