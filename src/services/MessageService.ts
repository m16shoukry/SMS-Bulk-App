import { ErrorApiResponse } from "../core/api-response/Error-api-response.dto";
import { IMessageServices } from "../interfaces/IMessageService";
import MessageRepository from "../repositories/messageRepository";

export class MessageServices implements IMessageServices {
  constructor(private messageRepository: MessageRepository) {
    this.messageRepository = messageRepository;
  }

  async customMessageLenght(message: string): Promise<string[]> {
    try {
      const maxLengthEnglish = 160;
      const maxLengthArabic = 70;

      const messages: string[] = [];

      if (this.isEnglish(message)) {
        while (message.length > maxLengthEnglish && message.length > 0) {
          // split message into 150 chars
          messages.push(message.slice(0, 153));
          message = message.slice(153);
        }

        messages.push(message);
      } else if (this.isArabic(message)) {
        while (message.length > maxLengthArabic && message.length > 0) {
          messages.push(message.slice(0, maxLengthArabic));
          message = message.slice(maxLengthArabic);
        }

        messages.push(message);
      } else {
        throw new ErrorApiResponse("Unsupported language");
      }

      return messages;
    } catch (error: any) {
      throw new ErrorApiResponse(error.message);
    }
  }

  isEnglish(text: string): Boolean {
    const regex = /^[A-Za-z0-9\s.,!?]*$/;
    return regex.test(text);
  }

  isArabic(text: string): Boolean {
    const regex = /[\u0600-\u06FF]/;
    return regex.test(text);
  }

  async saveMessages(messages: string[], campaignId: number) {
    try {
      for (let text of messages) {
        const newText = await this.messageRepository.create({
          campaignId,
          text: text,
        });
        await this.messageRepository.save(newText);
      }
    } catch (error: any) {
      throw new ErrorApiResponse(error.message);
    }
  }
}
