import React from "react";
import ContentContainer from "../UI/Container/ContentContainer";
import styles from "./Header.module.css";
import Link from "next/link";
import ButtonOutline from "../UI/Buttons/ButtonOutline";

const Header = () => {
  return (
    <header className={`w-full relative ${styles.header}`}>
      <ContentContainer className="z-10 relative">
        <div className="flex flex-col justify-center items-center py-24 ">
          <h1 className="text-center text-4xl pb-2 font-light">
            Die Kunst des Teetrinkens
          </h1>
          <p className="text-center text-xl font-light">
            Erlesene Auswahl, unvergleichlicher Genuss!
          </p>
          <Link href="/products" className="mt-12">
            <ButtonOutline className="uppercase p-3 font-light">
              Entdecke alle Produkte
            </ButtonOutline>
          </Link>
        </div>
      </ContentContainer>
    </header>
  );
};

export default Header;
