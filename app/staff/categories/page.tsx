import CategoryManagement from "@/components/Staff/Categories/CategoryManagement/CategoryManagement";
import { getCategories } from "@/lib/services/category";

import React from "react";

const Categories = async () => {
  const categories = await getCategories();

  return <CategoryManagement data={categories} />;
};

export default Categories;
