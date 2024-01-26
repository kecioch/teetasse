import prisma from "../prisma";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: { subcategories: { orderBy: { id: "asc" } } },
      orderBy: {
        id: "asc",
      },
    });
    return categories;
  } catch (err) {
    return undefined;
  }
}
