import SubHeader from "@/components/Product/UI/SubHeader";
import ContentContainer from "@/components/UI/Container/ContentContainer";
import ImageSkeleton from "@/components/UI/Skeleton/ImageSkeleton";
import React from "react";

const LoadingPage = () => {
  const renderReviews = (number: number) => {
    const reviews: any = [];
    for (let i = 0; i < number; i++) {
      reviews.push(
        <div key={i} className="w-full">
          <div className="h-2 bg-gray-200 rounded-full max-w-[150px] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full max-w-[180px] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full w-full mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full w-full mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full w-full mb-2.5" />
        </div>
      );
    }
    return reviews;
  };

  return (
    <ContentContainer className="mt-12 mb-5 p-4 animate-pulse">
      <header className="mt-3">
        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4" />
        <section className="flex pt-5 gap-10 flex-wrap flex-col-reverse md:flex-nowrap md:flex-row">
          <ImageSkeleton className="min-h-80" />

          <section className="w-full flex flex-col items-center md:max-w-[35%]">
            <div className="h-2 bg-gray-200 rounded-full w-full max-w-[60px] mb-2.5" />
            <div className="h-4 bg-gray-200 rounded-full w-full max-w-[300px] mb-5" />
            <div className="h-2.5 bg-gray-200 rounded-full w-full max-w-[120px] mb-5" />

            <div role="status" className="space-y-2.5 w-full">
              <div className="flex items-center w-full">
                <div className="h-2.5 bg-gray-200 rounded-full w-32"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-24"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
              </div>
              <div className="flex items-center w-full md:max-w-[480px]">
                <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-24"></div>
              </div>
              <div className="flex items-center w-full md:max-w-[480px]">
                <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-80"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
              </div>
              <div className="flex items-center w-full md:max-w-[480px]">
                <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-24"></div>
              </div>
              <div className="flex items-center w-full md:max-w-[480px]">
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-32"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-24"></div>
                <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
              </div>
              <div className="flex items-center w-full md:max-w-[480px]">
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-80"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
              </div>
            </div>

            <div className="h-5 bg-gray-200 rounded-full w-full max-w-[250px] mt-10 mb-2.5" />
            <div className="h-5 bg-gray-200 rounded-full w-full max-w-[250px] mb-5" />

            <div className="h-7 bg-gray-200 rounded-full w-full max-w-[280px] mb-2.5" />
          </section>
        </section>
      </header>
      <section className="mt-10">
        <SubHeader>Eigenschaften</SubHeader>
        <div className="md:px-24 mt-7">
          <div className="flex w-full gap-3">
            <div className="h-4 bg-gray-200 rounded-full  w-[30%] mb-2.5" />
            <div className="h-4 bg-gray-200 rounded-full flex-1 mb-2.5" />
          </div>
          <div className="flex w-full gap-3">
            <div className="h-4 bg-gray-200 rounded-full w-[30%] mb-2.5" />
            <div className="h-4 bg-gray-200 rounded-full w-[60%] mb-2.5" />
          </div>
          <div className="flex w-full gap-3">
            <div className="h-4 bg-gray-200 rounded-full w-[30%] mb-2.5" />
            <div className="h-4 bg-gray-200 rounded-full w-[50%] mb-2.5" />
          </div>
          <div className="flex w-full gap-3">
            <div className="h-4 bg-gray-200 rounded-full w-[30%] mb-2.5" />
            <div className="h-4 bg-gray-200 rounded-full flex-1 mb-2.5" />
          </div>
          <div className="flex w-full gap-3">
            <div className="h-4 bg-gray-200 rounded-full w-[30%] mb-2.5" />
            <div className="h-4 bg-gray-200 rounded-full w-[60%] mb-2.5" />
          </div>
          <div className="flex w-full gap-3">
            <div className="h-4 bg-gray-200 rounded-full w-[30%] mb-2.5" />
            <div className="h-4 bg-gray-200 rounded-full w-[40%] mb-2.5" />
          </div>
          <div className="flex w-full gap-3">
            <div className="h-4 bg-gray-200 rounded-full w-[30%] mb-2.5" />
            <div className="h-4 bg-gray-200 rounded-full flex-1 mb-2.5" />
          </div>
        </div>
      </section>
      <section className="mt-10">
        <SubHeader id="reviews">Bewertungen</SubHeader>
        <div className="flex flex-wrap md:flex-nowrap flex-row mt-7 gap-7 justify-center min-h-96">
          <div className="w-full max-w-96 md:w-80 md:max-w-[35%]">
            <div className="h-3 bg-gray-200 rounded-full max-w-[360px] mb-2.5" />
            <div className="h-3 bg-gray-200 rounded-full max-w-[360px] mb-2.5" />
            <div className="h-3 bg-gray-200 rounded-full max-w-[360px] mb-2.5" />
            <div className="h-3 bg-gray-200 rounded-full max-w-[360px] mb-2.5" />
          </div>

          <div className=" w-full md:flex-1 flex flex-col gap-3">
            {renderReviews(6)}
          </div>
        </div>
      </section>
    </ContentContainer>
  );
};

export default LoadingPage;
