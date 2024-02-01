import { Review } from "@/types/review";
import React from "react";
import ProductRating from "../Rating/ProductRating";

interface Props {
  data: Review;
  className?: string;
}

const ReviewItem = ({ data, className }: Props) => {
  return (
    <div className={className}>
      <p className="font-extralight">{data.date.toLocaleDateString()}</p>
      <ProductRating rating={data.rating} />
      <p className="mt-1 mb-2">{data.authorName}</p>
      <p className="font-light">{data.comment}</p>
    </div>
  );
};

export default ReviewItem;
