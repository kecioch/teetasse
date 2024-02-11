"use client";

import { Review } from "@/types/review";
import React from "react";
import ProductRating from "../Rating/ProductRating";
import { Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useFetch from "@/hooks/useFetch";

interface Props {
  data: Review;
  currUserId?: number;
  productId?: number;
  className?: string;
  onDelete: (id: number) => void;
}

const ReviewItem = ({
  data,
  className,
  productId,
  currUserId,
  onDelete,
}: Props) => {
  const { errorMsg, isFetching, fetch, clearErrorMsg } = useFetch();

  const handleDeleteItem = async () => {
    if (!productId) return;

    const res = await fetch.delete(
      `/api/products/${productId}/reviews/${data.id}`
    );

    if (res.status !== 200) return;
    onDelete(res.data.id);
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center flex-col-reverse gap-3 md:flex-row">
        <div>
          <p className="font-extralight">{data.created.toLocaleDateString()}</p>
          <ProductRating rating={data.rating} />
        </div>
        {currUserId === data.authorId && (
          <div>
            <Button
              color="failure"
              onClick={handleDeleteItem}
              disabled={isFetching}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        )}
      </div>
      <p className="mt-1 mb-2">{data.authorName}</p>
      {data.comment && <p className="font-light">{data.comment}</p>}
    </div>
  );
};

export default ReviewItem;
