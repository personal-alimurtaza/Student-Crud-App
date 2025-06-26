import nodemailer from "nodemailer";
import ENV from "#env";

const transporter = nodemailer.createTransport({
  host: ENV.SMTP.host,
  port: ENV.SMTP.port,
  secure: false,
  auth: {
    user: ENV.SMTP.user,
    pass: ENV.SMTP.pass,
  },
});

export default transporter