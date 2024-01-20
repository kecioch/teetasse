import {
  faFacebook,
  faGithub,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ContentContainer from "../UI/Container/ContentContainer";
import { Button } from "flowbite-react";

const Footer = () => {
  return (
    <footer className="bg-stone-600 text-white text-base border-t-4 border-solid border-green-800 p-5">
      <Button outline>Test</Button>
      <ContentContainer>
        <div className="flex justify-between">
          <div className="flex flex-row gap-12">
            <section>
              <span>Sorten</span>
              <ul className="list-none font-thin p-0">
                <li>Schwarzer Tee</li>
                <li>Grüner Tee</li>
                <li>Oolong</li>
                <li>Früchtetee</li>
              </ul>
            </section>
            <section>
              <span>Sorten</span>
              <ul className="list-none font-thin p-0">
                <li>Schwarzer Tee</li>
                <li>Grüner Tee</li>
                <li>Oolong</li>
                <li>Früchtetee</li>
              </ul>
            </section>
            <section>
              <span>Sorten</span>
              <ul className="list-none font-thin p-0">
                <li>Schwarzer Tee</li>
                <li>Grüner Tee</li>
                <li>Oolong</li>
                <li>Früchtetee</li>
              </ul>
            </section>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
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
      <div className="text-black text-center mt-16 font-light text-sm">
        <a
          className="flex flex-col"
          href="https://github.com/kecioch/teetasse"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithub} style={{ height: "20px" }} />
          <p>developed by Kevin Cioch</p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
