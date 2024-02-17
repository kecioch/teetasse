import { Order, OrderProduct } from "@/types/order";
import prisma from "../prisma";
import { OrderFilterOptions, SortBy } from "@/types/filterOptions";
import { OrderState, Prisma } from "@prisma/client";

const getSortConfig = (
  sortBy?: SortBy
): Prisma.OrderOrderByWithRelationInput => {
  switch (sortBy) {
    case SortBy.NEW_ASC:
      return { created: "asc" };
    case SortBy.NEW_DESC:
      return { created: "desc" };
    default:
      return { created: "desc" };
  }
};

const PAGE_SIZE_DEFAULT = 15;

export const getOrders = async (
  userId?: number,
  options?: OrderFilterOptions
): Promise<{
  orders?: Order[];
  totalPages?: number;
  page?: number;
  pageSize?: number;
  sortBy?: SortBy;
}> => {
  try {
    // PAGINATION SELECTION
    const pageSize = options?.pageSize || PAGE_SIZE_DEFAULT;
    const page = options?.page || 1;
    const skip = (page - 1) * pageSize;
    const sortBy =
      options?.sortBy !== undefined ? options.sortBy : SortBy.NEW_DESC;

    // CONSTRUCT WHERE CONDITION
    const whereCondition: any = {};

    if (userId) whereCondition.userId = userId;

    if (
      options?.search &&
      options?.search.length > 0 &&
      !isNaN(Number(options.search))
    )
      whereCondition.id = parseInt(options.search);

    // States Filter
    if (options?.states?.orderState && options.states.orderState.length > 0) {
      whereCondition.orderState = {
        in: options.states.orderState,
      };
    }
    if (
      options?.states?.paymentState &&
      options.states.paymentState.length > 0
    ) {
      whereCondition.paymentState = {
        in: options.states.paymentState,
      };
    }
    if (
      options?.states?.deliveryState &&
      options.states.deliveryState.length > 0
    ) {
      whereCondition.deliveryState = {
        in: options.states.deliveryState,
      };
    }

    // FETCH DATA
    const data = await prisma.order.findMany({
      where: whereCondition,
      include: {
        customerInfo: true,
        deliveryAddress: true,
        user: true,
        products: {
          include: {
            product: {
              include: { productgroup: true },
            },
          },
        },
      },
      orderBy: getSortConfig(sortBy),
      skip: skip,
      take: pageSize,
    });

    // CONSTRUCT ORDERS
    const orders: Order[] =
      data.map((item) => {
        const products: OrderProduct[] = item.products.map((el) => ({
          id: el.id,
          qty: el.quantity,
          price: el.product.price.toNumber(),
          title: el.product.productgroup.title,
          subtitle: el.product.title,
        }));

        const order: Order = {
          id: item.id,
          created: item.created,
          paymentState: item.paymentState,
          deliveryState: item.deliveryState,
          orderState: item.orderState,
          deliveryAddress: {
            city: item.deliveryAddress?.city!,
            nr: item.deliveryAddress?.nr!,
            street: item.deliveryAddress?.street!,
            zip: item.deliveryAddress?.zip!,
          },
          products,
        };
        if (item.userId && item.user) {
          order.user = {
            id: item.user.id,
            firstName: item.user.firstName,
            lastName: item.user.lastName,
            email: item.user.email,
            role: item.user.role,
          };
        }
        if (item.customerInfo) {
          order.customerInformation = item.customerInfo;
        }

        return order;
      }) || [];

    // Calculate the total number of pages
    const totalOrders = await prisma.order.count({
      where: whereCondition,
    });
    const totalPages = Math.ceil(totalOrders / pageSize);

    return {
      orders,
      totalPages,
      page,
      pageSize,
      sortBy,
    };
  } catch (err) {
    return { orders: undefined };
  }
};
