import Button from "@/components/UI/Buttons/Button";
import ContentContainer from "@/components/UI/Container/ContentContainer";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="mb-16">
      <section className="bg-green-100">
        <ContentContainer>
          <div className="flex flex-col justify-center items-center py-24">
            <h1 className="text-center text-4xl pb-2">
              Die Kunst des Teetrinkens
            </h1>
            <p className="text-center text-xl font-light">
              Erlesene Auswahl, unvergleichlicher Genuss!
            </p>
            {/* Entdecke alle Teesorten */}
            <Link href="/shop">
              <Button className="mt-12 uppercase">
                Entdecke alle Teesorten
              </Button>
            </Link>
          </div>
        </ContentContainer>
      </section>
      <section>
        <ContentContainer>
          <h2 className="uppercase font-light text-xl mt-5 mb-3">
            Unsere Empfehlungen
          </h2>
          <section className="flex flex-row gap-5 flex-nowrap overflow-x-auto">
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            {/* <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div> */}
          </section>
        </ContentContainer>
      </section>
      <section>
        <ContentContainer>
          <h2 className="uppercase font-light text-xl mt-5 mb-3">
            Neu im Shop
          </h2>
          <section className="flex flex-row gap-5 flex-nowrap overflow-x-auto">
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            {/* <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div> */}
          </section>
        </ContentContainer>
      </section>
      <section>
        <ContentContainer>
          <h2 className="uppercase font-light text-xl mt-5 mb-3">
            Teesorten erleben
          </h2>
          <section className="flex flex-row gap-5 flex-nowrap overflow-x-auto">
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
          </section>
        </ContentContainer>
      </section>
      <section>
        <ContentContainer>
          <h2 className="uppercase font-light text-xl mt-5 mb-3">
            Das passende Zubehör
          </h2>
          <section className="flex flex-row gap-5 flex-nowrap overflow-x-auto">
            <div className="bg-gray-400 min-w-56 h-56 rounded-full"></div>
            <div className="bg-gray-400 min-w-56 h-56 rounded-full"></div>
            <div className="bg-gray-400 min-w-56 h-56 rounded-full"></div>
            <div className="bg-gray-400 min-w-56 h-56 rounded-full"></div>
          </section>
          <Button className="mt-8">Alle Zubehör Kategorien</Button>
        </ContentContainer>
      </section>
    </div>
  );
};

export default Home;
