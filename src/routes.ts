import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import express, { Request, Response } from 'express';
import { SubmitFeedbackService } from './services/submitFeedbackService';
import { PrismFeedbacksRepository } from './repositories/prisma/PrismaFeedbacksRepository';

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "dd5e2bdd8b80f8",
    pass: "cc96c2ce1ee1c2"
  }
});

routes.post('/feedbacks', async (req: Request, res: Response) => {
  const { type, comment, screenshot } = req.body;

  const prismFeedbacksRepository = new PrismFeedbacksRepository();
  const submitFeedbackService = new SubmitFeedbackService(prismFeedbacksRepository);

  submitFeedbackService.execute({
    type,
    comment,
    screenshot
  });

  // await transport.sendMail({
  //   from: 'Equipe Feedget <oi@feedget.com>',
  //   to: 'Robson Fischer <fischerrobson@gmail.com>',
  //   subject: 'Novo Feedback',
  //   html: [
  //     `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
  //     `<p>Tipo do Feedback: ${type}</p>`,
  //     `<p>Comentário: ${comment}</p>`,
  //     `</div>`
  //   ].join('\n'),
  // });

  return res.status(201).send();
});