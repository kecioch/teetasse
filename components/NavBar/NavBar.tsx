import {
  faCartShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import ContentContainer from "../UI/Container/ContentContainer";

const NavBar = () => {
  return (
    <nav className="bg-green-950 text-white p-4 fixed top-0 w-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-80">
      <ContentContainer>
        <div className="flex flex-row justify-between">
          <Link href="/">
            <span className="font-light">TEETASSE</span>
          </Link>
          <section className="flex flex-row gap-4">
            <FontAwesomeIcon icon={faSearch} style={{ height: "20px" }} />
            <FontAwesomeIcon icon={faUser} style={{ height: "20px" }} />
            <FontAwesomeIcon icon={faCartShopping} style={{ height: "20px" }} />
          </section>
        </div>
      </ContentContainer>
    </nav>
  );
};

export default NavBar;
