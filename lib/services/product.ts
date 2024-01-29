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
        id: "asc",
      },
    });
    return products;
  } catch (err) {
    return undefined;
  }
}

export function hasDuplicateProductTitle(objectsArray: any[]) {
  const titleSet = new Set();

  for (const obj of objectsArray) {
    if (titleSet.has(obj.title)) {
      // Duplicate title found
      return true;
    } else {
      titleSet.add(obj.title);
    }
  }

  // No duplicate titles found
  return false;
}
