import { Dropdown } from "flowbite-react";
import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  href: string;
}

const DropDownItemLink = ({ children, href }: Props) => {
  return (
    <Link href={href}>
      <Dropdown.Item>{children}</Dropdown.Item>
    </Link>
  );
};

export default DropDownItemLink;
