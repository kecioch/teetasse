import { Features, Product } from "@/types/product";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";
import { FilterOptions, SortBy } from "@/types/filterOptions";

const getOrderConfig = (
  sortBy?: SortBy
): Prisma.ProductgroupOrderByWithRelationInput => {
  switch (sortBy) {
    case SortBy.NEW_ASC:
      return { created: "asc" };
    case SortBy.NEW_DESC:
      return { created: "desc" };
    case SortBy.BEST_RATING_ASC:
      return { rating: "asc" };
    case SortBy.BEST_RATING_DESC:
      return { rating: "desc" };
    default: {
      return { created: "desc" };
    }
  }
};

const PAGE_SIZE_DEFAULT = 1;

export async function getProducts(options?: FilterOptions): Promise<{
  products?: Product[];
  totalPages?: number;
  page?: number;
  pageSize?: number;
}> {
  try {
    // Pagination selection
    const pageSize = options?.pageSize || PAGE_SIZE_DEFAULT;
    const page = options?.page || 1;
    const skip = (page - 1) * pageSize;

    // Construct where condition
    const whereCondition: any = {
      visible: true,
    };

    if (options?.search && options?.search.length > 0)
      whereCondition.title = { contains: options.search, mode: "insensitive" };

    if (options?.subcategoryId)
      whereCondition.subcategoryId = options?.subcategoryId;

    if (options?.categoryId) whereCondition.subcategory= { categoryId: options.categoryId };

    // Fetch products
    const data = await prisma.productgroup.findMany({
      include: {
        products: { where: { visible: true }, orderBy: { title: "asc" } },
        subcategory: { include: { category: true } },
      },
      where: whereCondition,
      // where: {subcategory: {categoryId: {}}}
      orderBy: getOrderConfig(options?.sortBy),
      skip: skip,
      take: pageSize,
    });

    const products =
      data.map((item) => {
        const product: Product = {
          id: item.id,
          title: item.title,
          description: item.description,
          features: item.features as Features,
          rating: item.rating.toNumber(),
          ratingCnt: item.ratingCnt,
          imageIds: item.imageIds,
          recommended: item.recommended,
          subcategory: {
            id: item.subcategory.id,
            title: item.subcategory.title,
            category: {
              id: item.subcategory.category.id,
              title: item.subcategory.category.title,
              subs: [],
            },
          },
          variants: item.products.map((product) => ({
            id: product.id,
            price: product.price.toNumber(),
            stock: product.stock,
            title: product.title,
          })),
        };
        return product;
      }) || [];

    // Calculate the total number of pages
    const totalProducts = await prisma.productgroup.count({
      where: whereCondition,
    });
    const totalPages = Math.ceil(totalProducts / pageSize);

    return { products, totalPages, page, pageSize };
  } catch (err) {
    console.log(err);
    return { products: undefined };
  }
}

export async function getProduct(id: number) {
  try {
    const data = await prisma.productgroup.findUniqueOrThrow({
      where: { id, visible: true },
      include: {
        products: { where: { visible: true }, orderBy: { title: "asc" } },
        subcategory: { include: { category: true } },
        reviews: { include: { author: true } },
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
          authorId: review.authorId,
          authorName: `${
            review.author.firstName
          } ${review.author.lastName.substring(0, 1)}.`,
          created: review.created,
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
