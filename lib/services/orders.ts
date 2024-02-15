import { Order, OrderProduct } from "@/types/order";
import prisma from "../prisma";
import { User } from "@/types/user";
import { CustomerInformation } from "@/types/customer";

export const getOrders = async (userId?: number) => {
  try {
    const data = await prisma.order.findMany({
      where: {
        userId,
      },
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
      orderBy: {
        created: "desc",
      },
    });

    const orders: Order[] = data.map((item) => {
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
        order.user = item.user;
      }
      if (item.customerInfo) {
        order.customerInformation = item.customerInfo;
      }

      return order;
    });

    return orders;
  } catch (err) {
    return undefined;
  }
};
