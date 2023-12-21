import CampaignRepository from "../repositories/campaignRepository";
import { CampaignData, ICampaignService } from "../interfaces/ICampaignService";
import { Campaign } from "../entities/Campaign";

export class CampaignServices implements ICampaignService {
  private campaignRepository: CampaignRepository;

  constructor(campaignRepository: CampaignRepository) {
    this.campaignRepository = campaignRepository;
  }

  async createCampaign(body: CampaignData): Promise<Campaign | any> {
    const { campaignName, senderName, message, userId, phoneNumbers } = body;

    const newCampagin = await this.campaignRepository.create({
      campaignName,
      senderName,
      userId,
    });

    
  }
}
