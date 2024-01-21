import Button from "@/components/UI/Buttons/Button";
import ContentContainer from "@/components/UI/Container/ContentContainer";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="mb-16">
      <section className="bg-green-100">
        <ContentContainer>
          <div className="flex flex-col justify-center items-center py-24 ">
            <h1 className="text-center text-4xl pb-2 font-light">
              Die Kunst des Teetrinkens
            </h1>
            <p className="text-center text-xl font-light">
              Erlesene Auswahl, unvergleichlicher Genuss!
            </p>
            {/* Entdecke alle Teesorten */}
            <Link href="/shop" className="mt-12">
              <Button className="uppercase">Entdecke alle Teesorten</Button>
            </Link>
          </div>
        </ContentContainer>
      </section>
      <section className="px-4">
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
      <section className="bg-gray-300 mt-10 h-80 flex justify-center">
        <ContentContainer>
          <div className="flex justify-center">
            <p className="max-w-2xl text-center font-light text-xl">
              Unser Tee vereint sorgfältig ausgewählte Zutaten von erstklassigen
              Plantagen mit einer meisterhaften Handwerkskunst.
            </p>
          </div>
        </ContentContainer>
      </section>
      <section className="px-4">
        <ContentContainer>
          <h2 className="uppercase font-light text-xl mt-10 mb-3">
            Neu im Shop
          </h2>
          <section className="flex flex-row gap-5 flex-nowrap overflow-x-auto">
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
            <div className="bg-gray-400 min-w-48 h-56"></div>
          </section>
        </ContentContainer>
      </section>

      <section>
        <ContentContainer>
          <h2 className="uppercase font-light text-xl mt-10 mb-3 px-4 text-center">
            Teesorten erleben
          </h2>
          <section className="flex flex-row justify-center gap-5 flex-nowrap overflow-x-auto">
            <div className="bg-gray-400 min-w-56 h-56 rounded-full"></div>
            <div className="bg-gray-400 min-w-56 h-56 rounded-full"></div>
            <div className="bg-gray-400 min-w-56 h-56 rounded-full"></div>
            <div className="bg-gray-400 min-w-56 h-56 rounded-full"></div>
          </section>
          <div className="flex justify-center">
            <Button className="mt-8 mx-4">Alle Teesorten</Button>
          </div>
        </ContentContainer>
      </section>
      <section className="bg-gray-300 h-80 mt-10 flex justify-center">
        <ContentContainer>
          <div className="flex justify-center">
            <p className="max-w-2xl text-center font-light text-xl">
              Unser Qualitätsversprechen bedeutet, dass wir nur die feinsten
              Tees von erstklassigen Plantagen weltweit auswählen. Jede Tasse in
              unserem Teeshop verspricht ein Höchstmaß an Geschmack, Sorgfalt
              und unvergleichlichem Genuss.
            </p>
          </div>
        </ContentContainer>
      </section>
      <section>
        <ContentContainer>
          <h2 className="uppercase font-light text-xl mt-10 mb-3 px-4 text-center">
            Das passende Zubehör
          </h2>
          <section className="flex flex-row justify-center gap-5 flex-nowrap overflow-x-auto">
            <div className="bg-gray-400 min-w-56 h-56 rounded-full"></div>
            <div className="bg-gray-400 min-w-56 h-56 rounded-full"></div>
            <div className="bg-gray-400 min-w-56 h-56 rounded-full"></div>
            <div className="bg-gray-400 min-w-56 h-56 rounded-full"></div>
          </section>
          <div className="flex justify-center">
            <Button className="mt-8 mx-4">Alle Zubehör Kategorien</Button>
          </div>
        </ContentContainer>
      </section>
    </div>
  );
};

export default Home;
