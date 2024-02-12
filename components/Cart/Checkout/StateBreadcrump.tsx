"use client";
import { Breadcrumb } from "flowbite-react";
import { usePathname } from "next/navigation";
import React from "react";

const StateBreadcrump = () => {
  const pathname = usePathname();

  return (
    <Breadcrumb className="mt-3 mb-8 [&_*]:text-xl [&_*]:md:text-2xl [&_*]:font-light">
      <Breadcrumb.Item
        className={`${pathname === "/checkout" && "[&_*]:font-semibold"}`}
      >
        Kundendaten
      </Breadcrumb.Item>
      <Breadcrumb.Item
        className={`${
          pathname === "/checkout/delivery" && "[&_*]:font-semibold"
        }`}
      >
        Lieferung
      </Breadcrumb.Item>
      <Breadcrumb.Item
        className={`${
          pathname === "/checkout/payment" && "[&_*]:font-semibold"
        }`}
      >
        Bezahlung
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default StateBreadcrump;
