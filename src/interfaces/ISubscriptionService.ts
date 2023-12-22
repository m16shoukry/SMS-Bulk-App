export interface ISubscriptionService{
    validateUserSubscription(userId: number, messagesCount: number):Promise<boolean>;
}