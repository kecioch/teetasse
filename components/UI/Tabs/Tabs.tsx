"use client";

import React from "react";
import TabItem, { TabItemData } from "./TabItem";
import { usePathname } from "next/navigation";

interface Props {
  items: TabItemData[];
}

const Tabs = ({ items }: Props) => {
  const pathname = usePathname();
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {items.map((item, index) => (
          <TabItem
            key={index}
            item={item}
            active={pathname.localeCompare(item.href) === 0}
          />
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
