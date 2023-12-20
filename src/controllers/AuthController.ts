import { Request, Response } from "express";
import { IAuthService } from "../interfaces/IAuthService";
import { SuccessApiResponse } from "../core/api-response/success-api-response.dto";
import { ErrorApiResponse } from "../core/api-response/Error-api-response.dto";

export class AuthController {
  constructor(private authService: IAuthService) {}

  login = async (req: Request, res: Response) => {
    try {
      const token = await this.authService.login(req.body);
      return res.status(200).json(new SuccessApiResponse({ token }));
    } catch (error: any) {
      return res.status(500).json(new ErrorApiResponse(error.message));
    }
  };
}
