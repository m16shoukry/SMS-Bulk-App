export interface ISubscriptionService {
  validateUserSubscription(
    userId: number,
    messagesCount: number
  ): Promise<boolean>;
  updateSentSMSsNum(subId: number, countSentSMS: number): Promise<any>;
}
