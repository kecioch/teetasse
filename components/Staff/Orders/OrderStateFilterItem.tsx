"use client";

import { Checkbox, Label } from "flowbite-react";
import React, { ChangeEvent } from "react";

interface Props {
  id: string;
  children: React.ReactNode;
  defaultChecked?: boolean;
  onChange: (checked: boolean) => void;
}

const OrderStateFilterItem = ({
  id,
  children,
  defaultChecked = false,
  onChange,
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    onChange(value);
  };

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        onChange={handleChange}
        defaultChecked={defaultChecked}
      />
      <Label htmlFor={id} className="font-light">
        {children}
      </Label>
    </div>
  );
};

export default OrderStateFilterItem;
