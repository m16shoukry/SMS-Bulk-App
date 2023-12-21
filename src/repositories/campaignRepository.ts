import dataSource from "../db/db.config";
import { Campaign } from "../entities/Campaign";
import { BaseRepository } from "./baseRepository";

export default class CampaignRepository extends BaseRepository<Campaign> {
  constructor() {
    super(dataSource.getRepository(Campaign));
  }

  async findOneByCampaignName(
    campaignName: string
  ): Promise<Campaign | undefined> {
    return await this.entity.findOne({ where: { campaignName } });
  }

  async findAllByUserId(userId: number): Promise<Campaign[] | undefined> {
    return await this.entity.findBy({ userId });
  }

  async findAllBySenderName(
    senderName: string
  ): Promise<Campaign[] | undefined> {
    return await this.entity.findBy({ senderName });
  }
}
