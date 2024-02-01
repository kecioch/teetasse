"use client";

import React from "react";
import ReviewFilterRating from "./ReviewFilterRating";
import ProductRating from "../Rating/ProductRating";
import { Review } from "@/types/review";

interface Props {
  className?: string;
  reviewsData: Review[];
  onChange: (filterVal: number) => void;
}

const ReviewFilter = ({ reviewsData, className, onChange }: Props) => {
  const ratingsCnt = reviewsData.length;
  const avgRating =
    ratingsCnt <= 0
      ? 0
      : reviewsData.reduce((acc, curr) => acc + curr.rating, 0) / ratingsCnt;

  const calculatePercentage = (val: number) => {
    if (ratingsCnt === 0) return 0;

    let cnt = 0;
    reviewsData.forEach((item) => {
      if (item.rating === val) cnt++;
    });
    return Math.round((cnt / ratingsCnt) * 100);
  };

  const handleChangeFilterRating = (value: number) => {
    onChange(value);
  };

  return (
    <div className={className}>
      <p className="text-md font-medium text-gray-500 ">
        {avgRating.toFixed(1)} von 5.0
      </p>
      <ProductRating rating={avgRating} ratingCnt={ratingsCnt} />
      <ReviewFilterRating
        label="5"
        percentage={calculatePercentage(5)}
        onChange={() => handleChangeFilterRating(5)}
      />
      <ReviewFilterRating
        label="4"
        percentage={calculatePercentage(4)}
        onChange={() => handleChangeFilterRating(4)}
      />
      <ReviewFilterRating
        label="3"
        percentage={calculatePercentage(3)}
        onChange={() => handleChangeFilterRating(3)}
      />
      <ReviewFilterRating
        label="2"
        percentage={calculatePercentage(2)}
        onChange={() => handleChangeFilterRating(2)}
      />
      <ReviewFilterRating
        label="1"
        percentage={calculatePercentage(1)}
        onChange={() => handleChangeFilterRating(1)}
      />
    </div>
  );
};

export default ReviewFilter;
