"use client";

import { Button, Spinner } from "flowbite-react";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  color?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

const LoadingButton = ({
  children,
  className,
  color,
  type = "button",
  isLoading = false,
  onClick,
}: Props) => {
  return (
    <Button
      className={className}
      color={color}
      type={type}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading && (
        <Spinner aria-label="lädt" size="sm" color={color} className="pr-3" />
      )}
      <span>{children}</span>
    </Button>
  );
};

export default LoadingButton;
