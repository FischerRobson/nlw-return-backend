import { SubmitFeedbackService } from './SubmitFeedbackService';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackService = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
)

describe(`${SubmitFeedbackService.name}`, () => {

  it('Should be able to submit a feedback', async () => {
    await expect(submitFeedbackService.execute({
      type: 'Bug',
      comment: 'example',
      screenshot: 'data:image/png;base64,test.jpg'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('Should not be able to submit feedback without type', async () => {
    await expect(submitFeedbackService.execute({
      type: '',
      comment: 'example',
      screenshot: 'data:image/png;base64,test.jpg'
    })).rejects.toThrow();
  });

  it('Should not be able to submit feedback without comment', async () => {
    await expect(submitFeedbackService.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,test.jpg'
    })).rejects.toThrow();
  });

  it('Should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedbackService.execute({
      type: 'BUG',
      comment: 'comment',
      screenshot: 'test.jpg'
    })).rejects.toThrow();
  });

});