"use client";

import { Dropdown } from "flowbite-react";
import React from "react";
import DropDownItemLink from "./DropDownItemLink";
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
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Role } from "@prisma/client";
import { ModalStates, setModal } from "@/redux/features/modalSlice";

const NavBarActions = () => {
  const session = useSession();
  const dispatch = useAppDispatch();
  const cartCnt = useAppSelector((state) => state.cart.cartCounter);

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

  return (
    <div className="flex flex-row gap-4">
      <button type="button" onClick={handleOpenSearch} aria-label="Produktsuche">
        <FontAwesomeIcon icon={faSearch} style={{ height: "20px" }} />
      </button>
      <Dropdown
        label=""
        dismissOnClick={true}
        renderTrigger={() => (
          <button type="button" aria-label="Profil">
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
        <DropDownItemLink href="/profile/orders">Bestellungen</DropDownItemLink>
        {(isAdmin || isStaff) && (
          <>
            <Dropdown.Divider />
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
        aria-label="Warenkorb"
      >
        <FontAwesomeIcon icon={faCartShopping} style={{ height: "20px" }} />
        {cartCnt > 0 && (
          <>
            <span className="sr-only">Artikel im Warenkorb</span>
            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-3 -end-3">
              {cartCnt}
            </div>
          </>
        )}
      </button>
      <button type="button" onClick={handleOpenMenu} className="ml-2" aria-label="Menü">
        <FontAwesomeIcon icon={faBars} style={{ height: "20px" }} />
      </button>
    </div>
  );
};

export default NavBarActions;
