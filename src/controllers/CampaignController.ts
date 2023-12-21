import { Request, Response } from "express";
import { ICampaignService } from "../interfaces/ICampaignService";
import { SuccessApiResponse } from "../core/api-response/success-api-response.dto";
import { ErrorApiResponse } from "../core/api-response/Error-api-response.dto";

export class CampaignController {
  constructor(private campaignService: ICampaignService) {}

  createCampaign = async (req: Request, res: Response) => {
    try {
      const newCampagin = await this.campaignService.createCampaign(req.body);
      return res
        .status(201)
        .json(new SuccessApiResponse(newCampagin, "Campaign Created!"));
    } catch (error: any) {
      return res.status(500).json(new ErrorApiResponse(error.message));
    }
  };
}
