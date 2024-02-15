import ContentContainer from "@/components/UI/Container/ContentContainer";
import Image from "next/image";
import React from "react";

const AboutUsPage = () => {
  return (
    <div>
      <div className="w-fill  h-72 md:h-96 relative">
        <Image
          src="/static/about-us-header.jpg"
          alt="Über uns Header"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <ContentContainer className="mt-7 mb-5 p-4">
        <h1 className="text-4xl">Über uns</h1>
        <section className="font-light text-lg">
          <p className="mt-7">Willkommen bei Teetasse!</p>
          <p className="mt-3 text-justify">
            Unsere Leidenschaft für hochwertigen Tee und unsere Liebe zur
            Teekultur haben uns dazu inspiriert, Teetasse zu gründen. Wir sind
            mehr als nur ein Teeshop. Wir sind ein Ort, an dem sich Teeliebhaber
            treffen, um die Aromen, Traditionen und Geschichten hinter jedem
            Schluck zu entdecken.
          </p>
          <h2 className="text-3xl mt-7">Unsere Geschichte</h2>
          <p className="mt-5 text-justify">
            Die Reise begann in einem kleinen Teehaus, wo unser Gründer, Kevin
            Cioch, die Vielfalt und den Reichtum von Tees aus verschiedenen
            Regionen der Welt entdeckte. Die faszinierende Reise durch Teegärten
            und die Begegnung mit erfahrenen Teemeistern formten die Vision von
            Teetasse.
          </p>
          <h2 className="text-3xl mt-7">Unsere Mission</h2>
          <p className="mt-5 text-justify">
            Unsere Mission ist es, qualitativ hochwertigen Tee mit einer
            einzigartigen Auswahl an Aromen anzubieten. Wir beziehen unsere Tees
            direkt von den besten Teegärten und legen Wert auf nachhaltige und
            ethische Praktiken. Jede Tasse Tee soll nicht nur den Gaumen
            erfreuen, sondern auch eine Geschichte erzählen.
          </p>
          <h2 className="text-3xl mt-7">Entdecken Sie unser Sortiment</h2>
          <p className="mt-5 text-justify">
            Erforschen Sie die Welt des Tees und entdecken Sie bei uns
            einzigartige Aromen, die Ihre Sinne beleben. Stöbern Sie durch
            unseren Online-Shop und lassen Sie sich von der Magie des Tees
            verführen.
          </p>
          <p className="mt-2">
            Vielen Dank, dass Sie Teil unserer Teegemeinschaft sind!
          </p>
          <p className="mt-3"> Mit Grüßen, </p>
          <p> Kevin Cioch</p>
        </section>
      </ContentContainer>
    </div>
  );
};

export default AboutUsPage;
