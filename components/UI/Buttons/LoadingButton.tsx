"use client";

import { Button, Spinner } from "flowbite-react";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  color?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  pill?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const LoadingButton = ({
  children,
  className,
  color,
  type = "button",
  isLoading = false,
  pill = false,
  disabled = false,
  onClick,
}: Props) => {
  return (
    <Button
      className={className}
      color={color}
      type={type}
      disabled={isLoading || disabled}
      onClick={onClick}
      pill={pill}
    >
      {isLoading && (
        <Spinner aria-label="lädt" size="sm" color={"gray"} className="mr-3" />
      )}
      <span>{children}</span>
    </Button>
  );
};

export default LoadingButton;
