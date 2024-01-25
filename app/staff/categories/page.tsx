import { Category } from "@/components/Staff/Categories/CategoryAccordion/CategoryAccordionItem";
import CategoryManagement from "@/components/Staff/Categories/CategoryManagement/CategoryManagement";
import { getCategories } from "@/lib/services/category";

import React from "react";

const Categories = async () => {
  const loadedCategories = await getCategories();
  console.log(loadedCategories);

  const data: Category[] = loadedCategories.map((item) => ({
    id: item.id,
    title: item.title,
    subs: item.subcategories.map((sub) => ({ id: sub.id, title: sub.title })),
  }));
  console.log(data);

  // const data: Category[] = [
  //   {
  //     title: "Tee",
  //     subs: [
  //       {
  //         title: "Schwarztee",
  //       },
  //       {
  //         title: "Grüntee",
  //       },
  //       {
  //         title: "Oolong",
  //       },
  //       {
  //         title: "Früchte",
  //       },
  //     ],
  //   },
  //   { title: "Zubehör", subs: [] },
  // ];

  return (
    <div>
      <h1 className="text-3xl mb-7 uppercase text-gray-800">
        Kategorienverwaltung
      </h1>
      <CategoryManagement data={data} />
    </div>
  );
};

export default Categories;
