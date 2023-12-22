import express from "express";
import AuthMiddleware from "../middleware/isLoggedIn";
import { CampaignController } from "../controllers/CampaignController";
import UserRepository from "../repositories/userRepository";
import { CampaignServices } from "../services/CampaignService";
import CampaignRepository from "../repositories/campaignRepository";
import { createCampaignDTO } from "../validators/createCampaignDTO";
import MessageRepository from "../repositories/messageRepository";
import ContactsRepository from "../repositories/contactsRepository";
import SubscriptionRepository from "../repositories/subscriptionRepository";
import { MessageServices } from "../services/MessageService";
import { ContactsServices } from "../services/ContactsService";
import { SubscriptionServices } from "../services/SubscriptionService";

export const campaignRouter = express.Router();

const { isLoggedIn } = new AuthMiddleware(new UserRepository());
const { createCampaign } = new CampaignController(
  new CampaignServices(
    new CampaignRepository(),
    new MessageServices(new MessageRepository()),
    new ContactsServices(new ContactsRepository()),
    new SubscriptionServices(new SubscriptionRepository())
  )
);

campaignRouter.post("/create", isLoggedIn, createCampaignDTO, createCampaign);
