import Link from "next/link";
import React from "react";

export interface TabItemData {
  title: string;
  href: string;
  disabled?: boolean;
}

interface Props {
  item: TabItemData;
  active?: boolean;
}

const TabItem = ({ item, active = false }: Props) => {
  const baseStyle = "inline-block p-4 border-b-2 rounded-t-lg";
  const inactiveStyle = `border-transparent ${
    !item.disabled && "hover:text-gray-600 hover:border-gray-300"
  }`;
  const activeStyle =
    "text-[color:var(--primary-test-color)] border-[color:var(--primary-test-color)] active";
  const disabledStyle = "text-gray-400 cursor-not-allowed";

  return (
    <li className="me-2">
      {item.disabled ? (
        <span
          aria-current={active ? "page" : "false"}
          className={`${baseStyle} ${
            active ? activeStyle : inactiveStyle
          } ${disabledStyle} `}
        >
          {item.title}
        </span>
      ) : (
        <Link
          href={item.href}
          className={`${baseStyle} ${active ? activeStyle : inactiveStyle} `}
          aria-current={active ? "page" : "false"}
        >
          {item.title}
        </Link>
      )}
    </li>
  );
};

export default TabItem;
