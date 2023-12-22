import { Subscription } from "../entities/Subscription";
import dataSource from "../db/db.config";
import { BaseRepository } from "./baseRepository";

export default class SubscriptionRepository extends BaseRepository<Subscription> {
  constructor() {
    super(dataSource.getRepository(Subscription));
  }

  async findUserActiveSubscriptions(
    userId: number
  ): Promise<Subscription[] | null> {
    const currentDate = new Date();

    const activeSubscriptions = await this.entity
      .createQueryBuilder("subscriptions")
      .where("subscriptions.userId = :userId", { userId })
      .andWhere("subscriptions.sentSMSsNum < subscriptions.numSMS")
      .andWhere("subscriptions.endDate > :currentDate", { currentDate })
      .orderBy("subscriptions.createdAt", "ASC")
      .getMany();

    return activeSubscriptions;
  }
}
