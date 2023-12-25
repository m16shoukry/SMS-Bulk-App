import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ErrorApiResponse } from "../core/api-response/Error-api-response.dto";

const data = Joi.object({
  campaignName: Joi.string().required(),
  senderName: Joi.string().required(),
  userId: Joi.number().required(),
  message: Joi.string().required(),
  phoneNumbers: Joi.array()
    .items(Joi.string().pattern(/^(?:\+?20\s?)?(01[0-9]{9})$/))
    .min(1).unique()
    .required(),
});

export const createCampaignDTO = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: number = Number(req["user"].id);
    req.body.userId = userId;
    await data.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error: any) {
    return res.status(400).json(new ErrorApiResponse(error.message));
  }
};
