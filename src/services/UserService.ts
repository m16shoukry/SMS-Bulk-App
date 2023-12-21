import UserRepository from "../repositories/userRepository";
import { User } from "../entities/User";
import { IUserServices } from "../interfaces/IUserService";

export class UsersServices implements IUserServices {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getByPhone(phone: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ phone });
  }
}
