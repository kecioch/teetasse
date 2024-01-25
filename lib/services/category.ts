import prisma from "../prisma";

export async function getCategories() {
  const categories = await prisma.category.findMany({
    include: { subcategories: true },
  });
  return categories;
}
