import { Subscription } from "../entities/Subscription";

export interface ISubscriptionService {
  validateUserSubscriptions(
    userId: number,
    messagesCount: number,
    contactsNums: number
  ): Promise<any>;
  deductQuota(subscription: Subscription, messagesCount: number): Promise<void>;
}
