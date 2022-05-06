import { FeedbacksRepository } from '../repositories/FeedbacksRepository';

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  constructor(
    private feedbacksRepository: FeedbacksRepository
  ) {
    this.feedbacksRepository = feedbacksRepository;
  }

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({ type, comment, screenshot });
  }
}