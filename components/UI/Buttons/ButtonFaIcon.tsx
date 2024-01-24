import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "flowbite-react";
import React from "react";

interface Props {
  children: React.ReactNode;
  icon: IconProp;
  title?: string;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const ButtonFaIcon = ({
  children,
  icon,
  title,
  color,
  className,
  onClick,
}: Props) => {
  return (
    <Button
      title={title}
      color={color && color}
      className={className && className}
      onClick={onClick && onClick}
    >
      <FontAwesomeIcon icon={icon} className="mr-3 w-4 h-4" />
      {children}
    </Button>
  );
};

export default ButtonFaIcon;
