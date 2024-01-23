"use client";

import {
  faCartShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import ContentContainer from "../UI/Container/ContentContainer";
import { Dropdown } from "flowbite-react";
import DropDownItemLink from "./DropDownItemLink";
import { useAppDispatch } from "@/redux/hooks";
import { ModalStates, closeModal, setModal } from "@/redux/features/modalSlice";

const NavBar = () => {
  const dispatch = useAppDispatch();

  const handleOpenCartDrawer = () => {
    dispatch(setModal(ModalStates.CART_DRAWER));
  };

  return (
    <nav className="fixed bg-green-950 text-white p-4 z-20 top-0 w-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-80">
      <ContentContainer>
        <div className="flex flex-row justify-between">
          <Link href="/">
            <span className="font-light">TEETASSE</span>
          </Link>
          <section className="flex flex-row gap-4">
            <button type="button">
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
          </section>
        </div>
      </ContentContainer>
      {/* <CartDrawer show={showCartDrawer} onClose={handleCloseCartDrawer} /> */}
    </nav>
  );
};

export default NavBar;
