import { Subscription } from "../entities/Subscription";
import { ErrorApiResponse } from "../core/api-response/Error-api-response.dto";
import { ISubscriptionService } from "../interfaces/ISubscriptionService";
import SubscriptionRepository from "../repositories/subscriptionRepository";

export class SubscriptionServices implements ISubscriptionService {
  constructor(private subscriptionRepository: SubscriptionRepository) {
    this.subscriptionRepository = subscriptionRepository;
  }

  async validateUserSubscriptions(
    userId: number,
    messagesCount: number,
    contactsNums:number
  ): Promise<any> {
    const activeSubscriptions =
      await this.subscriptionRepository.findUserActiveSubscriptions(userId);

    if (!activeSubscriptions) {
      throw new ErrorApiResponse("please create subscription");
    }

    const totalSentSMSsNum = activeSubscriptions.reduce(
      (total, subscription) => total + subscription.sentSMSsNum,
      0
    );
    const totalNumSMS = activeSubscriptions.reduce(
      (total, subscription) => total + subscription.numSMS,
      0
    );

    let allMessages = messagesCount *contactsNums;
    

    if (allMessages > totalNumSMS - totalSentSMSsNum) {
      throw new ErrorApiResponse("not enough qouta to send all messages");
    }

    for (let subscription of activeSubscriptions) {
      const deductNum =
        allMessages >= subscription.numSMS - subscription.sentSMSsNum
          ? subscription.numSMS - subscription.sentSMSsNum
          : allMessages;

      await this.deductQuota(subscription, deductNum);
      allMessages = allMessages - deductNum;

      if (deductNum === 0) {
        break;
      }
    }
  }

  async deductQuota(
    subscription: Subscription,
    messagesCount: number
  ): Promise<void> {
    try {
      const updatedSentSMSsNum = subscription.sentSMSsNum + messagesCount;
      await this.updateSentSMSsNum(subscription.id, updatedSentSMSsNum);
    } catch (error: any) {
      throw new ErrorApiResponse(error.message);
    }
  }

  async updateSentSMSsNum(subId: number, countSentSMS: number) {
    try {
      await this.subscriptionRepository.update(subId, {
        sentSMSsNum: countSentSMS,
      });
    } catch (error: any) {
      throw new ErrorApiResponse(error.message);
    }
  }
}
