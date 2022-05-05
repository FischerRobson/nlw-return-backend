import express, { Request, Response } from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "dd5e2bdd8b80f8",
    pass: "cc96c2ce1ee1c2"
  }
});

app.post('/feedbacks', async (req: Request, res: Response) => {

  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Robson Fischer <fischerrobson@gmail.com>',
    subject: 'Novo Feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do Feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`
    ].join('\n'),
  });

  return res.status(201).json({ data: feedback })
});

app.listen(3333, () => {
  console.log('Server running!')
});