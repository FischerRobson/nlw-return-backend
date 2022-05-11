import { MailAdapter, SendMailData } from "../MailAdapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "dd5e2bdd8b80f8",
    pass: "cc96c2ce1ee1c2"
  }
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Robson Fischer <fischerrobson@gmail.com>',
      subject,
      html: body
    });
  }
}