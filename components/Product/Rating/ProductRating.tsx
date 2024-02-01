import { Rating, RatingStar } from "flowbite-react";
import React from "react";

interface Props {
  rating: number;
  ratingCnt?: number;
  maxRating?: number;
  href?: string;
}

const ProductRating = ({ rating, ratingCnt, href, maxRating = 5 }: Props) => {
  const stars = [];
  for (let i = 0; i < maxRating; i++) {
    const isFull = Math.floor(rating) > i;
    stars.push(
      <RatingStar
        key={i}
        className={isFull ? "text-green-800" : ""}
        filled={isFull}
      />
    );
  }

  const content = (
    <Rating className="inline-flex flex-row">
      {stars}
      {ratingCnt !== undefined && (
        <p className="ml-2 text-sm text-gray-500 font-light">({ratingCnt})</p>
      )}
    </Rating>
  );

  if (href) return <a href={href}>{content}</a>;
  else return content;
};

export default ProductRating;
