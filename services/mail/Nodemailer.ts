import { Mail } from "@/types/mail";

const nodemailer = require("nodemailer");

const send = async (mail: Mail) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `"TEETASSE 🍵" <${process.env.NODEMAILER_USERNAME}>`,
    to: mail.to,
    priority: "high",
    subject: mail.subject,
    html: mail.html,
  });

  console.log("Mail sent: %s", info.messageId);
};

export const sendMail = async (mail: Mail) => {
  send(mail).catch(console.error);
};
