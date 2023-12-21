import express from "express";
import AuthMiddleware from "../middleware/isLoggedIn";
import { CampaignController } from "../controllers/CampaignController";
import UserRepository from "../repositories/userRepository";
import { CampaignServices } from "../services/CampaignService";
import CampaignRepository from "../repositories/campaignRepository";
import { createCampaignDTO } from "../validators/createCampaignDTO";

export const campaignRouter = express.Router();

const { isLoggedIn } = new AuthMiddleware(new UserRepository());
const { createCampaign } = new CampaignController(
  new CampaignServices(new CampaignRepository())
);

campaignRouter.post("/create", isLoggedIn, createCampaignDTO, createCampaign);
