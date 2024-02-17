import { NextRequest } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { OrderState, PaymentState } from "@prisma/client";
import { sendOrderConfirmation } from "@/services/mail/SendMail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET!;
  const sig = headers().get("stripe-signature") as string;

  // CONSTRUCT WEBHOOK
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  // HANDLING EVENTS
  const res = event.data.object;
  switch (event.type) {
    case "payment_intent.succeeded":
      console.log("PAYMENT_SUCCESS");
      const paymentIntentSucceeded = event.data.object;

      // GET METADATA FROM PAYMENT
      const metaSuccess = paymentIntentSucceeded.metadata;
      const orderIdSuccess = parseInt(metaSuccess.orderId);

      // UPDATE PAYMENT STATE OF ORDER
      await prisma.order.update({
        where: { id: orderIdSuccess },
        data: { paymentState: PaymentState.PAYED },
      });

      // SEND USER CONFIRMATION MAIL
      await sendOrderConfirmation(orderIdSuccess);

      break;

    case "payment_intent.payment_failed":
      console.log("PAYMENT_FAILED", res);
      const paymentIntetFailed = event.data.object;

      // GET METADATA FROM FAILED PAYMENT
      const metaFailed = paymentIntetFailed.metadata;
      const orderIdFailed = metaFailed.orderId;

      // UPDATE PAYMENT STATE OF ORDER
      await prisma.order.update({
        where: { id: parseInt(orderIdFailed) },
        data: {
          paymentState: PaymentState.FAILED,
          orderState: OrderState.CANCELED,
        },
      });

      // UPDATE STOCK
      const order = await prisma.order.findUnique({
        where: { id: parseInt(orderIdFailed) },
        include: { products: { include: { product: true } } },
      });
      if (order?.products) {
        await Promise.all(
          order.products.map(async (el) => {
            const product = await prisma.product.update({
              where: { id: el.product.id },
              data: {
                stock: { increment: el.quantity },
              },
            });
          })
        );
      }

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response("RESPONSE EXECUTE", {
    status: 200,
  });
}
