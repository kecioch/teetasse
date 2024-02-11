"use client";

import React, { useState } from "react";
import ReviewItem from "./ReviewItem";
import { Review } from "@/types/review";
import ReviewFilter from "./ReviewFilter";
import WriteReview from "./WriteReview";
import { useSession } from "next-auth/react";

interface Props {
  data?: Review[];
  productId?: number;
  className?: string;
}

const ReviewSection = ({ data = [], productId }: Props) => {
  const [filter, setFilter] = useState<number[]>([]);
  const [reviews, setReviews] = useState<Review[]>(data);
  const session = useSession();

  const handleFilterChange = (value: number) => {
    setFilter((prev) => {
      const newFilter = [...prev];
      if (prev.includes(value)) newFilter.splice(prev.indexOf(value), 1);
      else newFilter.push(value);
      return newFilter;
    });
  };

  const onCreatedReview = (review: Review) => {
    setReviews((prev) => [review, ...prev]);
  };

  const onDeleteReview = (id: number) => {
    const newReviews = [...reviews];
    const index = newReviews.findIndex((el) => el.id === id);
    newReviews.splice(index, 1);
    setReviews(newReviews);
  };

  const isReviewed = reviews.find(
    (el) => el.authorId === session.data?.user.id
  );

  const filteredReviews: Review[] =
    filter.length <= 0
      ? reviews
      : reviews.filter((el) => filter.includes(el.rating));

  return (
    <div className="flex flex-wrap md:flex-nowrap flex-row mt-7 gap-7 justify-center min-h-96">
      <ReviewFilter
        className="w-full max-w-96 md:w-80 md:max-w-[35%]"
        reviewsData={reviews}
        onChange={handleFilterChange}
      />
      <div className="w-full md:flex-1">
        {session.data?.user && (
          <>
            <WriteReview
              productId={productId}
              onCreated={onCreatedReview}
              disabled={!!isReviewed}
            />
            <hr className="my-5" />
          </>
        )}
        <div className="divide-y divide-gray-300 border-t md:border-none">
          {filteredReviews.length <= 0 && (
            <p className="text-lg text-center font-medium text-gray-400 my-20">
              Keine Bewertungen vorhanden
            </p>
          )}
          {filteredReviews.map((review, index) => (
            <ReviewItem
              key={index}
              data={review}
              currUserId={session.data?.user.id}
              productId={productId}
              className="py-5 px-5 text-center md:text-start"
              onDelete={onDeleteReview}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
