import jwt from "jsonwebtoken";
import { IAuthService, LoginInput } from "../interfaces/IAuthService";
import { IUserServices } from "../interfaces/IUserService";
import { ErrorApiResponse } from "../core/api-response/Error-api-response.dto";

export class AuthServices implements IAuthService {
  constructor(private usersServices: IUserServices) {}

  async login(body: LoginInput): Promise<string> {
    try {
      const { phone, password } = body;
      const user = await this.usersServices.getByPhone(phone);
      
      if (!user || !(await this.checkPassword(password, user.password))) {
        throw new ErrorApiResponse('invalid credintials');
      }

      const token = jwt.sign(
        { phone: user.phone, id: user.id },
        process.env.JWT_KEY,
        {
          expiresIn: "6h",
        }
      );

      return token;
    } catch (error:any) {
      throw new ErrorApiResponse(error.message);
    }
  }

  async checkPassword(
    candidatePassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    //TODO: use bycrypt instead
    return candidatePassword === hashedPassword;
  }
}
