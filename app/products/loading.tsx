import ContentContainer from "@/components/UI/Container/ContentContainer";
import ImageSkeleton from "@/components/UI/Skeleton/ImageSkeleton";
import React from "react";

const LoadingPage = () => {
  const renderProducts = (number: number) => {
    const products: any = [];
    for (let i = 0; i < number; i++)
      products.push(
        <div
          key={i}
          className="flex flex-shrink-0 justify-center items-center flex-col w-full overflow-hidden xs:w-[48%] sm:w-[31%] md:w-[23%] lg:w-[18.5%] xl:w-[19%]"
        >
          <div className="w-full h-40 flex justify-center mb-2.5">
            <ImageSkeleton />
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full w-full max-w-[120px] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full w-full max-w-[80px] mb-2.5" />
          <div className="h-3 bg-gray-200 rounded-full w-full mb-2.5" />
        </div>
      );
    return products;
  };
  return (
    <ContentContainer className="mt-12 mb-5 p-4 pt-10 animate-pulse">
      <div className="flex gap-3 items-end justify-between flex-wrap md:flex-nowrap">
        <div className="flex items-end gap-3 w-full md:w-auto">
          <div className="w-full md:w-[50%]">
            <div className="h-2.5 bg-gray-200 rounded-full w-full md:w-56 mb-2.5" />
            <div className="h-8 bg-gray-200 rounded-full w-full md:w-56 mb-2.5" />
          </div>
          <div className="h-8 bg-gray-200 rounded-full w-full md:w-56 mb-2.5" />
        </div>
        <div className="w-full md:w-auto">
          <div className="h-2.5 bg-gray-200 rounded-full w-full md:w-56 mb-2.5" />
          <div className="h-8 bg-gray-200 rounded-full w-full md:w-56 mb-2.5" />
        </div>
      </div>
      <div className="mt-10 w-full flex flex-row gap-3 flex-wrap">
        {renderProducts(20)}
      </div>
    </ContentContainer>
  );
};

export default LoadingPage;
