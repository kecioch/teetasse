import React from "react";
import ContentContainer from "../UI/Container/ContentContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
  children: React.ReactNode;
  icon: IconProp;
}

const IconTextBox = ({ children, icon }: Props) => {
  return (
    <div
      className={`bg-green-950 text-white opacity-80 mt-10 py-20 px-10 flex justify-center`}
    >
      <ContentContainer>
        <div className="flex justify-center flex-col gap-5 items-center">
          <FontAwesomeIcon icon={icon} size="2xl" />
          <p className="max-w-2xl text-center font-extralight text-xl">
            {children}
          </p>
        </div>
      </ContentContainer>
    </div>
  );
};

export default IconTextBox;
