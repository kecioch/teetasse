"use client";

import {
  faBars,
  faCartShopping,
  faHamburger,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ContentContainer from "../UI/Container/ContentContainer";
import { Dropdown } from "flowbite-react";
import DropDownItemLink from "./DropDownItemLink";
import { useAppDispatch } from "@/redux/hooks";
import { ModalStates, setModal } from "@/redux/features/modalSlice";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const [isScrolled, setIsScrolled] = useState<boolean | null>(null);

  const isHome = pathname === "/";

  const handleOpenCartDrawer = () => {
    dispatch(setModal(ModalStates.CART_DRAWER));
  };

  const handleOpenMenu = () => {
    dispatch(setModal(ModalStates.MENU));
  };

  const handleOpenSearch = () => {
    dispatch(setModal(ModalStates.SEARCH_PRODUCT));
  };

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
          <section className="flex flex-row gap-4">
            <button type="button" onClick={handleOpenSearch}>
              <FontAwesomeIcon icon={faSearch} style={{ height: "20px" }} />
            </button>
            <Dropdown
              label=""
              dismissOnClick={true}
              renderTrigger={() => (
                <button type="button">
                  <FontAwesomeIcon icon={faUser} style={{ height: "20px" }} />
                </button>
              )}
            >
              <Dropdown.Header>
                <span className="font-semibold text">Profil</span>
              </Dropdown.Header>
              <DropDownItemLink href="/profile">Account</DropDownItemLink>
              <DropDownItemLink href="/profile/orders">
                Bestellungen
              </DropDownItemLink>
              <Dropdown.Divider />
              <Dropdown.Header>
                <span className="font-semibold text">Staff</span>
              </Dropdown.Header>
              <DropDownItemLink href="/staff/orders">
                Bestellungen
              </DropDownItemLink>
              <DropDownItemLink href="/staff/products">
                Produktverwaltung
              </DropDownItemLink>
              <DropDownItemLink href="/staff/categories">
                Kategorienverwaltung
              </DropDownItemLink>
              <DropDownItemLink href="/staff/accounts">
                Mitarbeiterverwaltung
              </DropDownItemLink>
              <Dropdown.Divider />
              <DropDownItemLink href="/auth/logout">Logout</DropDownItemLink>
            </Dropdown>
            <button type="button" onClick={handleOpenCartDrawer}>
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ height: "20px" }}
              />
            </button>
            <button type="button" onClick={handleOpenMenu} className="ml-2">
              <FontAwesomeIcon icon={faBars} style={{ height: "20px" }} />
            </button>
          </section>
        </div>
      </ContentContainer>
    </nav>
  );
};

export default NavBar;
