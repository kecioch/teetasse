import prisma from "../prisma";

export async function getProducts() {
  try {
    const products = await prisma.productgroup.findMany({
      include: {
        products: { where: { visible: true }, orderBy: { title: "asc" } },
        subcategory: { include: { category: true } },
      },
      where: { visible: true },
      orderBy: {
        title: "asc",
      },
    });
    return products;
  } catch (err) {
    return undefined;
  }
}
