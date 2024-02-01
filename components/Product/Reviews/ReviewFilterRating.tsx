import { Checkbox } from "flowbite-react";
import React from "react";

interface Props {
  label: string;
  percentage: number | string;
  checked?: boolean;
  onChange?: () => void;
}

const ReviewFilterRating = ({
  label,
  percentage,
  checked,
  onChange,
}: Props) => {
  return (
    <div className="flex flex-row items-center flex-nowrap w-full mt-2">
      <div className="flex items-center gap-2 w-[90%]">
        <span className="w-[10%] text-sm font-medium text-center pl-3">
          {label}
        </span>
        <div className="w-[80%] h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
          <div
            className="h-5 bg-green-700 rounded"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className=" w-[10%] text-sm font-medium text-gray-500 text-end">
          {percentage}%
        </span>
      </div>
      <div className="w-[10%] pl-5">
        <Checkbox
          checked={checked}
          onChange={onChange}
          className="text-green-600 focus:ring-green-500"
        />
      </div>
    </div>
  );
};

export default ReviewFilterRating;
