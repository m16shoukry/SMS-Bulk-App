export interface ICampaignService {
  createCampaign(body: CampaignData): Promise<any>;
}

export interface CampaignData {
  campaignName: string;
  senderName: string;
  userId: number;
  message: string;
  phoneNumbers: Array<string>;
}
