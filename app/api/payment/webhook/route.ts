import { NextRequest } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { PaymentState } from "@prisma/client";

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
      const metadata = paymentIntentSucceeded.metadata;
      const { orderId } = metadata;

      // UPDATE PAYMENT STATE OF ORDER
      await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: { paymentState: PaymentState.PAYED },
      });

      break;

    case "payment_intent.payment_failed":
      console.log("PAYMENT_FAILED", res);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response("RESPONSE EXECUTE", {
    status: 200,
  });
}
