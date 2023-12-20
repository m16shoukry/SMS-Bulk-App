import { UserRepository } from "../repositories/userRepository";
import { User } from "../entities/User";
import { IUserServices } from "../interfaces/IUserService";

export class UsersServices implements IUserServices {

  constructor() {}
  
  async getByPhone(phone: string): Promise<User | undefined> {
    return await UserRepository.findByPhone(phone);
  }
}
