import express, { Request, Response } from 'express';
import { SubmitFeedbackService } from './services/SubmitFeedbackService';
import { PrismFeedbacksRepository } from './repositories/prisma/PrismaFeedbacksRepository';
import { NodeMailerMailAdapter } from './adapters/nodemailer/NodeMailerMailAdapter';

export const routes = express.Router();


routes.post('/feedbacks', async (req: Request, res: Response) => {
  const { type, comment, screenshot } = req.body;

  const prismFeedbacksRepository = new PrismFeedbacksRepository();
  const nodeMailerMailAdapter = new NodeMailerMailAdapter();

  const submitFeedbackService = new SubmitFeedbackService(prismFeedbacksRepository, nodeMailerMailAdapter);

  submitFeedbackService.execute({
    type,
    comment,
    screenshot
  });



  return res.status(201).send();
});