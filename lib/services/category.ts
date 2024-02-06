import { Category } from "@/types/category";
import prisma from "../prisma";
import { cache } from "react";

export const getCategories = cache(async () => {
  try {
    const data = await prisma.category.findMany({
      include: { subcategories: { orderBy: { id: "asc" } } },
      orderBy: {
        title: "asc",
      },
    });

    const categories = data.map((item) => {
      const category: Category = {
        id: item.id,
        title: item.title,
        subs: item.subcategories,
      };
      return category;
    });
    return categories;
  } catch (err) {
    return undefined;
  }
});
