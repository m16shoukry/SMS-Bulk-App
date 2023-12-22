import CampaignRepository from "../repositories/campaignRepository";
import { CampaignData, ICampaignService } from "../interfaces/ICampaignService";
import { Campaign } from "../entities/Campaign";
import { ErrorApiResponse } from "../core/api-response/Error-api-response.dto";
import { ISubscriptionService } from "../interfaces/ISubscriptionService";
import { IMessageServices } from "../interfaces/IMessageService";
import { IContactsService } from "../interfaces/IContactsService";

export class CampaignServices implements ICampaignService {
  constructor(
    private campaignRepository: CampaignRepository,
    private messageServices: IMessageServices,
    private contactsService: IContactsService,
    private subscriptionServices: ISubscriptionService
  ) {
    this.campaignRepository = campaignRepository;
    this.messageServices = messageServices;
    this.contactsService = contactsService;
    this.subscriptionServices = subscriptionServices;
  }

  async createCampaign(body: CampaignData): Promise<Campaign | any> {
    try {
      const { campaignName, senderName, message, userId, phoneNumbers } = body;

      // validate and split messeges
      const messages: string[] = await this.messageServices.customMessageLenght(
        message
      );
      // count messages created
      const messagesCount = messages.length;

      const validate = await this.subscriptionServices.validateUserSubscription(
        userId,
        messagesCount
      );

      if (!validate) {
        throw new ErrorApiResponse("have no enough qouta to sent all messages");
      }

      const newCampaign = await this.campaignRepository.create({
        campaignName,
        senderName,
        userId,
      });
      await this.campaignRepository.save(newCampaign);

      await Promise.all([
        this.messageServices.saveMessages(messages, newCampaign.id),
        this.contactsService.saveContacts(phoneNumbers, newCampaign.id),
      ]);
      return await this.campaignRepository.findOneBy({ id: newCampaign.id });
    } catch (error: any) {
      throw new ErrorApiResponse(error.message);
    }
  }
}
