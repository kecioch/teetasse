"use client";

import React, { useState } from "react";
import ReviewItem from "./ReviewItem";
import { Review } from "@/types/review";
import ReviewFilter from "./ReviewFilter";

interface Props {
  data?: Review[];
  className?: string;
}

const ReviewSection = ({ data = [] }: Props) => {
  const [filter, setFilter] = useState<number[]>([]);

  const handleFilterChange = (value: number) => {
    setFilter((prev) => {
      const newFilter = [...prev];
      if (prev.includes(value)) newFilter.splice(prev.indexOf(value), 1);
      else newFilter.push(value);
      return newFilter;
    });
  };

  const filteredReviews: Review[] =
    filter.length <= 0 ? data : data.filter((el) => filter.includes(el.rating));

  return (
    <div className="flex flex-wrap md:flex-nowrap flex-row mt-7 gap-7 justify-center min-h-96">
      <ReviewFilter
        className="w-full max-w-96 md:w-80 md:max-w-[35%]"
        reviewsData={data}
        onChange={handleFilterChange}
      />
      <div className=" w-full md:flex-1 divide-y divide-gray-300 border-t md:border-none">
        {filteredReviews.length <= 0 && (
          <p className="text-lg text-center font-medium text-gray-400 my-20">
            Keine Bewertungen vorhanden
          </p>
        )}
        {filteredReviews.map((review, index) => (
          <ReviewItem
            key={index}
            data={review}
            className="py-5 px-5 text-center md:text-start"
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
