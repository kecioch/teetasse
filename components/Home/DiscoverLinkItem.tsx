import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  src: string;
  description?: string;
}

const DiscoverLinkItem = ({ src, href, description }: Props) => {
  return (
    <Link href={href}>
      <div className="hover:scale-105 transition-all ease-in duration-200">
        <div className=" w-56 h-56 rounded-full flex justify-center items-center overflow-hidden border-4 border-double border-green-900 hover:border shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <Image
            src={src}
            alt={"Produktbild"}
            width={190}
            height={190}
            draggable={false}
          />
        </div>
        {description && (
          <p className="text-center mt-5 font-light">{description}</p>
        )}
      </div>
    </Link>
  );
};

export default DiscoverLinkItem;
