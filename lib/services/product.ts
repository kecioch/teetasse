import { Features, Product } from "@/types/product";
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

export async function getProduct(id: number) {
  try {
    const data = await prisma.productgroup.findUniqueOrThrow({
      where: { id, visible: true },
      include: {
        products: { where: { visible: true }, orderBy: { title: "asc" } },
        subcategory: { include: { category: true } },
        reviews: true,
      },
    });

    const product: Product = {
      id: data.id,
      title: data.title,
      description: data.description,
      features: data.features as Features,
      rating: data.rating.toNumber(),
      ratingCnt: data.ratingCnt,
      imageIds: data.imageIds,
      recommended: data.recommended,
      subcategory: {
        id: data.subcategory.id,
        title: data.subcategory.title,
        category: {
          id: data.subcategory.category.id,
          title: data.subcategory.category.title,
          subs: [],
        },
      },
      variants: data.products.map((product) => ({
        id: product.id,
        price: product.price.toNumber(),
        stock: product.stock,
        title: product.title,
      })),
      reviews:
        data.reviews.map((review) => ({
          id: review.id,
          comment: review.comment,
          rating: review.rating,
        })) || [],
    };

    return product;
  } catch (error) {
    console.error(error);
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
