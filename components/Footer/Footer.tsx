import {
  faFacebook,
  faGithub,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ContentContainer from "../UI/Container/ContentContainer";
import LinkSection, { LinkSectionData } from "./LinkSection";

const LINK_SECTIONS: LinkSectionData[] = [
  {
    title: "Sorten",
    items: [
      { title: "Schwarzer Tee", href: "/products/62" },
      { title: "Grüner Tee", href: "#" },
      { title: "Oolong Tee", href: "#" },
      { title: "Früchte Tee", href: "#" },
    ],
  },
  {
    title: "Service",
    items: [
      { title: "Konto", href: "#" },
      { title: "Kontakt", href: "#" },
      { title: "FAQ", href: "#" },
    ],
  },
  {
    title: "Informationen",
    items: [
      { title: "Über uns", href: "#" },
      { title: "Blog", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-stone-700 text-gray-200 text-base border-t-4 border-solid border-green-800 p-0 md:p-5">
      <ContentContainer>
        <div className="flex justify-between flex-wrap gap-10">
          <div className="flex flex-col md:flex-wrap  md:flex-row md:gap-x-12 md:gap-y-6 flex-1 divide-y divide-stone-800 divide-solid md:divide-none">
            {LINK_SECTIONS.map((item, index) => (
              <LinkSection data={item} key={index} />
            ))}
          </div>
          <div className="w-full md:w-auto flex flex-row md:flex-col justify-center items-center gap-7 md:gap-2">
            <a href="#" target="_blank">
              <FontAwesomeIcon icon={faInstagram} style={{ height: "40px" }} />
            </a>
            <a href="#" target="_blank">
              <FontAwesomeIcon icon={faFacebook} style={{ height: "35px" }} />
            </a>
            <a href="#" target="_blank">
              <FontAwesomeIcon icon={faYoutube} style={{ height: "35px" }} />
            </a>
          </div>
        </div>
      </ContentContainer>
      <div className="flex justify-center text-stone-500 pb-5 md:pb-0 bg-stone-800 md:bg-stone-700 md:text-stone-900 text-center border-t-2 border-dashed border-stone-700 md:border-stone-800 mt-7 pt-5 md:mt-16 font-light text-sm">
        <a
          className="flex flex-col w-52"
          href="https://github.com/kecioch/teetasse"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithub} style={{ height: "20px" }} />
          <span className="font-light">developed by Kevin Cioch</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
