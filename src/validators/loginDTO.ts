import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ErrorApiResponse } from "../core/api-response/Error-api-response.dto";

const data = Joi.object({
  phone: Joi.string()
    .pattern(/^(?:\+?20\s?)?(1[0-9]{10})$/) // accept EGP phone Only
    .required(),
  password: Joi.string().min(8).required(),
});

export const loginDTO = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await data.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error: any) {
    return res.status(400).json(new ErrorApiResponse(error.message));
  }
};
