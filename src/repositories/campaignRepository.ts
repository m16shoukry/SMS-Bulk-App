import dataSource from "../db/db.config";
import { Campaign } from "../entities/Campaign";
import { BaseRepository } from "./baseRepository";

export default class CampaignRepository extends BaseRepository<Campaign> {
  constructor() {
    super(dataSource.getRepository(Campaign));
  }

}
