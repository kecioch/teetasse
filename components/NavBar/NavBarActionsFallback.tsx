import {
  faBars,
  faCartShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const NavBarActionsFallback = () => {
  return (
    <div className="flex flex-row gap-4">
      <button type="button">
        <FontAwesomeIcon icon={faSearch} style={{ height: "20px" }} />
      </button>
      <button type="button">
        <FontAwesomeIcon icon={faUser} style={{ height: "20px" }} />
      </button>
      <button type="button" className="relative ">
        <FontAwesomeIcon icon={faCartShopping} style={{ height: "20px" }} />
      </button>
      <button type="button" className="ml-2">
        <FontAwesomeIcon icon={faBars} style={{ height: "20px" }} />
      </button>
    </div>
  );
};

export default NavBarActionsFallback;
