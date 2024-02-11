"use client";

import {
  faBars,
  faCartShopping,
  faSearch,
  faSignIn,
  faSignOut,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ContentContainer from "../UI/Container/ContentContainer";
import { usePathname } from "next/navigation";
import NavBarActions from "./NavBarActions";
import { ReduxProvider } from "@/redux/ReduxProvider";
import NavBarActionsFallback from "./NavBarActionsFallback";

const NavBar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState<boolean | null>(null);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Check if the scroll position is greater than a specific point
      const isScrolledToSpecificPoint = window.scrollY > 200;
      // Update the state based on the scroll position
      setIsScrolled(isScrolledToSpecificPoint);
    };

    // Add the scroll event listener when the component mounts
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed ${
        isHome && (isScrolled === null || isScrolled === false)
          ? "bg-opacity-0 text-black"
          : "text-white bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-80"
      } p-4 z-40 top-0 w-full transition-all ease-in-out duration-300 bg-green-950`}
    >
      <ContentContainer>
        <div className="flex flex-row justify-between">
          <Link href="/">
            <span className="font-light">TEETASSE</span>
          </Link>
          <ReduxProvider fallback={<NavBarActionsFallback />}>
            <NavBarActions />
          </ReduxProvider>
        </div>
      </ContentContainer>
    </nav>
  );
};

export default NavBar;
