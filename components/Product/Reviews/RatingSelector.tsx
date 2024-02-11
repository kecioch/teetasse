"use client";

import { Rating, RatingStar } from "flowbite-react";
import React from "react";

const RatingSelector = () => {
  return (
    <div>
      <Rating>
        <RatingStar />
        <RatingStar />
        <RatingStar />
        <RatingStar />
        <RatingStar />
      </Rating>
    </div>
  );
};

export default RatingSelector;
