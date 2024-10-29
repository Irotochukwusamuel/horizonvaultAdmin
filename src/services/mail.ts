import nodemailer, { SendMailOptions } from 'nodemailer';


export default async function sendMail(data: SendMailOptions) {
  try {
    var transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const response = await transporter.sendMail(data);
    return response;
  } catch (error) {
    console.log('Error sending mail:', error);
  }
}