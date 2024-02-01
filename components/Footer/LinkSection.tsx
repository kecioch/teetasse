import Link from "next/link";
import React from "react";

export interface LinkSectionData {
  title: string;
  items: {
    title: string;
    href: string;
  }[];
}

interface Props {
  data: LinkSectionData;
}

const LinkSection = ({ data }: Props) => {
  return (
    <section className="text-center md:text-start py-5 md:py-0">
      <span className="text-lg">{data.title}</span>
      <ul className="list-none text-md font-thin p-0">
        {data.items.map((item, index) => (
          <li key={index} className="mt-3 md:mt-1">
            <Link
              href={item.href}
              className="transition duration-150 ease-in-out border-b border-transparent hover:border-white"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LinkSection;
