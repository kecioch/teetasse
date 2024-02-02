import { Category } from "@/types/category";
import prisma from "../prisma";

export async function getCategories() {
  try {
    const data = await prisma.category.findMany({
      include: { subcategories: { orderBy: { id: "asc" } } },
      orderBy: {
        id: "asc",
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
}
