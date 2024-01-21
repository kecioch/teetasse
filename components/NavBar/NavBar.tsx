"use client";

import {
  faCartShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import ContentContainer from "../UI/Container/ContentContainer";
import { Dropdown } from "flowbite-react";
import DropDownItemLink from "./DropDownItemLink";
import CartDrawer from "../Cart/CartDrawer";

const NavBar = () => {
  const [showCartDrawer, setshowCartDrawer] = useState(false);

  return (
    <nav className="bg-green-950 text-white p-4 fixed top-0 w-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-80">
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
                <span className="font-semibold text">Admin</span>
              </Dropdown.Header>
              <DropDownItemLink href="/staff/products">
                Produktverwaltung
              </DropDownItemLink>
              <DropDownItemLink href="/admin/staff">
                Mitarbeiterverwaltung
              </DropDownItemLink>
              <DropDownItemLink href="/staff/orders">
                Bestellungen
              </DropDownItemLink>
              <Dropdown.Divider />
              <DropDownItemLink href="/auth/logout">Logout</DropDownItemLink>
            </Dropdown>
            <button
              type="button"
              onClick={() => {
                setshowCartDrawer(true); // Disables Background Scrolling whilst the SideDrawer/Modal is open
                if (typeof window != "undefined" && window.document) {
                  document.body.style.overflow = "hidden";
                }
              }}
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ height: "20px" }}
              />
            </button>
          </section>
        </div>
      </ContentContainer>
      <CartDrawer
        show={showCartDrawer}
        onClose={() => {
          setshowCartDrawer(false); // Unsets Background Scrolling to use when SideDrawer/Modal is closed
          document.body.style.overflow = "unset";
        }}
      />
    </nav>
  );
};

export default NavBar;
