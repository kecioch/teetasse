import prisma from "@/lib/prisma";
import { authenticateServer } from "@/services/auth/authentication";
import { OrderProduct } from "@/types/order";
import { CustomError } from "@/utils/errors/CustomError";
import { Order } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const user = await authenticateServer();
    console.log("PAYMENT INTENT", { data });
    const { deliveryAddress, customerInformation, products } = data;

    // VALIDATION
    if (
      !user &&
      (!customerInformation ||
        !customerInformation.firstName ||
        !customerInformation.lastName ||
        !customerInformation.email)
    )
      throw new CustomError("Kundendaten nicht vorhanden");
    if (
      !deliveryAddress ||
      !deliveryAddress.street ||
      !deliveryAddress.nr ||
      !deliveryAddress.city ||
      !deliveryAddress.zip
    )
      throw new CustomError("Lieferadresse nicht vorhanden");
    if (!products || products.lenght <= 0)
      throw new CustomError("Keine Produkte vorhanden");

    // CHECK PRODUCTS AVAILABILITY
    const orderList: OrderProduct[] = [];
    await Promise.all(
      products.map(async (el: OrderProduct) => {
        const product = await prisma.product.findUnique({
          where: { id: el.id },
          include: { productgroup: true },
        });
        if (product && product.stock >= el.qty) {
          const orderProduct: OrderProduct = {
            id: el.id,
            qty: el.qty,
            price: product.price.toNumber(),
            title: product.productgroup.title,
            subtitle: product.title,
          };
          orderList.push(orderProduct);
        }
      })
    );
    if (orderList.length <= 0)
      throw new CustomError("Keine Produkte vorhanden ORDERLIST");

    // CREATE ORDER
    const createdOrder = await prisma.order.create({
      data: { userId: user && !customerInformation ? user.id : undefined },
    });

    // CREATE DELIVERY ADDRESS
    const createdAddress = await prisma.deliveryAddress.create({
      data: { orderId: createdOrder.id, ...deliveryAddress },
    });

    // CREATE CUSTOMERINFORMATION
    if (customerInformation) {
      const createdCustomerInfo = await prisma.customerInformation.create({
        data: { orderId: createdOrder.id, ...customerInformation },
      });
    }

    // CREATE PRODUCTORDER
    await Promise.all(
      orderList.map(async (product) => {
        // UPDATE STOCK
        await prisma.product.update({
          where: { id: product.id },
          data: {
            stock: { decrement: product.qty },
          },
        });

        // CREATE
        await prisma.productOrder.create({
          data: {
            quantity: product.qty,
            productId: product.id,
            orderId: createdOrder.id,
          },
        });
      })
    );

    // CREATE PAYMENT INTENT
    const totalPrice = orderList.reduce((acc, curr) => {
      console.log(curr);
      return curr.price ? acc + curr.price * curr.qty : acc;
    }, 0);
    const amount = Math.round(totalPrice * 100 * 100) / 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "EUR",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: createdOrder.id,
      },
    });
    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret, products: orderList },
      { status: 200 }
    );
  } catch (e: any) {
    console.log(e);
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    }

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}
