import { ErrorApiResponse } from "../core/api-response/Error-api-response.dto";
import { ISubscriptionService } from "../interfaces/ISubscriptionService";
import SubscriptionRepository from "../repositories/subscriptionRepository";

export class SubscriptionServices implements ISubscriptionService {
  constructor(private subscriptionRepository: SubscriptionRepository) {
    this.subscriptionRepository = subscriptionRepository;
  }

  async validateUserSubscription(
    userId: number,
    messagesCount: number
  ): Promise<boolean> {
    const activeSubscriptions =
      await this.subscriptionRepository.findUserActiveSubscriptions(userId);

    if (!activeSubscriptions) {
      throw new ErrorApiResponse("please create subscription");
    }

    const firstSubscription = activeSubscriptions[0];
    const isEnoughToSend =
      Number(firstSubscription.numSMS) - Number(firstSubscription.sentSMSsNum) >
      messagesCount;

    if (!isEnoughToSend) {
      if (activeSubscriptions.length > 1 && activeSubscriptions !== null) {
        for (let subscription of activeSubscriptions) {
          if (
            Number(subscription.numSMS) - Number(subscription.sentSMSsNum) >
            messagesCount
          ) {
            // add messagesCount to this sub 
            await this.subscriptionRepository.update(subscription.id, {
              sentSMSsNum: subscription.sentSMSsNum + messagesCount,
            });
            return true;
          } else {
            throw new ErrorApiResponse("please charge your subscription");
          }
        }
      } else {
        throw new ErrorApiResponse("please charge your subscription");
      }
    }
//TODO: bug here
    // add messagesCount to this sub
    await this.subscriptionRepository.update(firstSubscription.id, {
      sentSMSsNum: firstSubscription.sentSMSsNum + messagesCount,
    });
    return true;
  }
}
