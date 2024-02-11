"use client";

import LoadingButton from "@/components/UI/Buttons/LoadingButton";
import { Label, Textarea } from "flowbite-react";
import React, { useState } from "react";
import ProductRating from "../Rating/ProductRating";
import useFetch from "@/hooks/useFetch";
import { Review } from "@/types/review";

interface Props {
  productId?: number;
  disabled?: boolean;
  onCreated: (review: Review) => void;
}

const WriteReview = ({ productId, disabled = false, onCreated }: Props) => {
  const { errorMsg, isFetching, fetch, clearErrorMsg } = useFetch();

  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");

  const handleSelectRating = (num: number) => {
    if (disabled) return;
    setRating(num);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch.post(`/api/products/${productId}/reviews`, {
      comment,
      rating,
    });

    if (res.status !== 200) return;

    const newReview: Review = {
      id: res.data.id,
      authorName: res.data.authorName,
      authorId: res.data.authorId,
      created: new Date(res.data.created),
      rating: res.data.rating,
      comment: res.data.comment,
    };

    onCreated(newReview);
  };

  return (
    <div className="px-5">
      <h3 className="text-lg uppercase text-gray-600 mb-3">
        Bewertung verfassen
      </h3>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 flex justify-between">
            <Label
              htmlFor="comment"
              value="Kommentar"
              className="text-gray-500 uppercase"
            />
            <ProductRating
              rating={rating}
              onClick={handleSelectRating}
              size="md"
              disabled={disabled}
            />
          </div>
          <Textarea
            id="comment"
            placeholder="Lass einen Kommentar da..."
            className="min-h-28"
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
            disabled={disabled}
          />
        </div>
        {errorMsg && <p className="text-red-700 font-light mt-3">{errorMsg}</p>}
        <LoadingButton
          isLoading={isFetching}
          type="submit"
          color="success"
          className="mt-3"
          disabled={disabled}
        >
          Speichern
        </LoadingButton>
      </form>
    </div>
  );
};

export default WriteReview;
