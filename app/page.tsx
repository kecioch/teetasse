import ButtonOutline from "@/components/UI/Buttons/ButtonOutline";
import ContentContainer from "@/components/UI/Container/ContentContainer";
import Link from "next/link";
import React from "react";
import { getProducts } from "@/lib/services/product";
import ProductItem from "@/components/Catalog/ProductItem";
import { ProductSortBy } from "@/types/filterOptions";
import DiscoverLinkItem from "@/components/Home/DiscoverLinkItem";
import { faMedal, faTrophy } from "@fortawesome/free-solid-svg-icons";
import IconTextBox from "@/components/Home/IconTextBox";
import Header from "@/components/Home/Header";

const Home = async () => {
  const newProducts = await getProducts({
    page: 1,
    pageSize: 5,
    sortBy: ProductSortBy.NEW_DESC,
  });
  const recommendedProducts = await getProducts({
    page: 1,
    pageSize: 5,
    sortBy: ProductSortBy.NEW_DESC,
    recommended: true,
  });

  return (
    <div className="mb-16 w-full">
      <Header />
      <section className="px-4">
        <ContentContainer>
          <h2 className="uppercase font-light text-xl mt-10 mb-3">
            Unsere Empfehlungen
          </h2>
          <section className="p-3 flex flex-row gap-5 flex-nowrap overflow-x-auto overflow-y-visible">
            {recommendedProducts.products?.map((el, index) => (
              <ProductItem
                key={index}
                data={el}
                className="w-full xs:w-[48%] sm:w-[31%] md:w-[23%] lg:w-[18.5%] xl:w-[16%]"
              />
            ))}
          </section>
        </ContentContainer>
      </section>
      <IconTextBox icon={faMedal}>
        Unser Tee vereint sorgfältig ausgewählte Zutaten von erstklassigen
        Plantagen mit einer meisterhaften Handwerkskunst.
      </IconTextBox>
      <section className="px-4">
        <ContentContainer>
          <h2 className="uppercase font-light text-xl mt-10 mb-3">
            Neu im Shop
          </h2>
          <section className="p-3 flex flex-row gap-5 flex-nowrap overflow-x-auto overflow-y-visible">
            {newProducts.products?.map((el, index) => (
              <ProductItem
                key={index}
                data={el}
                className="w-full xs:w-[48%] sm:w-[31%] md:w-[23%] lg:w-[18.5%] xl:w-[16%]"
              />
            ))}
          </section>
        </ContentContainer>
      </section>
      <section>
        <ContentContainer>
          <h2 className="uppercase font-light text-2xl mt-14 mb-10 px-4 text-center">
            Teesorten erleben
          </h2>
          <section className="px-5 flex flex-row justify-center gap-7 flex-wrap">
            <DiscoverLinkItem
              src="/static/home/teesorten/schwarztee.png"
              href="/products?categoryId=1&subcategoryId=1"
              description="Schwarztee"
            />
            <DiscoverLinkItem
              src="/static/home/teesorten/gruentee.png"
              href="/products?categoryId=1&subcategoryId=2"
              description="Grüntee"
            />
            <DiscoverLinkItem
              src="/static/home/teesorten/fruechtetee.png"
              href="/products?categoryId=1&subcategoryId=3"
              description="Früchtetee"
            />
            <DiscoverLinkItem
              src="/static/home/teesorten/bio-kraeutertee.png"
              href="/products?categoryId=1&subcategoryId=4"
              description="Bio-Kräutertee"
            />
          </section>
          <div className="flex justify-center">
            <Link href="/products?categoryId=1" className="mt-10 mx-4">
              <ButtonOutline className="py-3 px-20">
                Alle Teesorten
              </ButtonOutline>
            </Link>
          </div>
        </ContentContainer>
      </section>
      <IconTextBox icon={faTrophy}>
        Unser Qualitätsversprechen bedeutet, dass wir nur die feinsten Tees von
        erstklassigen Plantagen weltweit auswählen. Jede Tasse in unserem
        Teeshop verspricht ein Höchstmaß an Geschmack, Sorgfalt und
        unvergleichlichem Genuss.
      </IconTextBox>
      <section>
        <ContentContainer>
          <h2 className="uppercase font-light text-2xl mt-14 mb-10 px-4 text-center">
            Das passende Zubehör
          </h2>
          <section className="px-5 flex flex-row justify-center gap-7 flex-wrap">
            <DiscoverLinkItem
              src="/static/home/zubehoer/tassen.png"
              href="/products?categoryId=2&subcategoryId=5"
              description="Tassen"
            />
            <DiscoverLinkItem
              src="/static/home/zubehoer/kannen.png"
              href="/products?categoryId=2&subcategoryId=7"
              description="Kannen"
            />
            <DiscoverLinkItem
              src="/static/home/zubehoer/dosen.png"
              href="/products?categoryId=2&subcategoryId=6"
              description="Dosen"
            />
          </section>
          <div className="flex justify-center">
            <Link href="/products?categoryId=2" className="mt-10 mx-4">
              <ButtonOutline className="py-3 px-20">
                Alle Zubehör Kategorien
              </ButtonOutline>
            </Link>
          </div>
        </ContentContainer>
      </section>
    </div>
  );
};

export default Home;
