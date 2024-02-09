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
import { Dropdown } from "flowbite-react";
import DropDownItemLink from "./DropDownItemLink";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ModalStates, setModal } from "@/redux/features/modalSlice";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Role } from "@prisma/client";

const NavBar = () => {
  const pathname = usePathname();
  const session = useSession();
  const dispatch = useAppDispatch();
  const cartCnt = useAppSelector((state) => state.cart.cartCounter);

  const [isScrolled, setIsScrolled] = useState<boolean | null>(null);

  const isHome = pathname === "/";
  const isLoggedIn = session.status === "authenticated";
  const role = session.data?.user.role;
  const isStaff = role === Role.STAFF;
  const isAdmin = role === Role.ADMIN;

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
              {isLoggedIn && (
                <Dropdown.Header>
                  <span className="font-light">
                    Hallo, {session.data.user.firstName}!
                  </span>
                </Dropdown.Header>
              )}
              <Dropdown.Header>
                <span className="font-semibold text">Profil</span>
              </Dropdown.Header>
              <DropDownItemLink href="/profile">Account</DropDownItemLink>
              <DropDownItemLink href="/profile/orders">
                Bestellungen
              </DropDownItemLink>
              <Dropdown.Divider />
              {(isAdmin || isStaff) && (
                <>
                  <Dropdown.Header>
                    <span className="font-semibold text">Mitarbeiter</span>
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
                </>
              )}
              {isAdmin && (
                <DropDownItemLink href="/staff/accounts">
                  Mitarbeiterverwaltung
                </DropDownItemLink>
              )}
              <Dropdown.Divider />
              {isLoggedIn && (
                <Dropdown.Item
                  onClick={() => {
                    signOut();
                  }}
                >
                  <FontAwesomeIcon icon={faSignOut} className="mr-2" />
                  Logout
                </Dropdown.Item>
              )}
              {!isLoggedIn && (
                <>
                  <DropDownItemLink href="/login">
                    <FontAwesomeIcon icon={faSignIn} className="mr-2" />
                    Login
                  </DropDownItemLink>
                  <DropDownItemLink href="/register">
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    Registrieren
                  </DropDownItemLink>
                </>
              )}
            </Dropdown>

            <button
              type="button"
              className="relative "
              onClick={handleOpenCartDrawer}
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ height: "20px" }}
              />
              {cartCnt > 0 && (
                <>
                  <span className="sr-only">Artikel im Warenkorb</span>
                  <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-3 -end-3">
                    {cartCnt}
                  </div>
                </>
              )}
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
