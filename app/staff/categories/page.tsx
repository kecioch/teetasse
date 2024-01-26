import { Category } from "@/components/Staff/Categories/CategoryAccordion/CategoryAccordionItem";
import CategoryManagement from "@/components/Staff/Categories/CategoryManagement/CategoryManagement";
import { getCategories } from "@/lib/services/category";

import React from "react";

const Categories = async () => {
  const loadedCategories = await getCategories();

  const data: Category[] | undefined = loadedCategories?.map((item) => ({
    id: item.id,
    title: item.title,
    subs: item.subcategories.map((sub) => ({ id: sub.id, title: sub.title })),
  }));

  console.log(data);
  return <CategoryManagement data={data} />;
};

export default Categories;
