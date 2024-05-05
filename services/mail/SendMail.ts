import { Mail } from "@/types/mail";
import { sendMail } from "./Nodemailer";
import prisma from "@/lib/prisma";

export const sendOrderConfirmation = async (orderId: number) => {
  console.log("SEND ORDER CONFIRMATION")
  // FIND ORDER
  const order = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      user: true,
      customerInfo: true,
      products: { include: { product: { include: { productgroup: true } } } },
    },
  });
  if (!order) return;
  console.log("ORDER FOUND")
  
  const to = order.user?.email || order.customerInfo?.email;
  if (!to) return;
  console.log("TO FOUND")

  // Create mail information
  const orderIdHTML = `<h2>Bestell-Nr: #${order.id}</h2>`;
  const userTextHTML = `<p>Hallo ${
    order.user?.firstName || order.customerInfo?.firstName
  },</p><p>Deine Bestellung ist erfolgreich bei uns eingegangen und wird nun von uns umgehend bearbeitet.</p>`;
  let productsHTML = "";
  order.products.map(
    (item) =>
      (productsHTML += `<li>${item.product.productgroup.title} (${item.product.title}) | ${item.quantity}x ${item.product.price}€</li>`)
  );

  const mail: Mail = {
    to,
    subject: "Bestellung bestätigt | Teetasse",
    html:
      "<h1>Deine Bestellung wurde bestätigt</h1>" +
      orderIdHTML +
      userTextHTML +
      "<ul>" +
      productsHTML +
      "</ul>",
  };

  // Send mail to customer
  console.log("SEND MAIL")
  await sendMail(mail);
};
