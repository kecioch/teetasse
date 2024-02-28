import CategoryManagement from "@/components/Staff/Categories/CategoryManagement/CategoryManagement";
import { getCategories } from "@/lib/services/category";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Kategorienverwaltung",
};

const Categories = async () => {
  const categories = await getCategories();

  return <CategoryManagement data={categories} />;
};

export default Categories;
