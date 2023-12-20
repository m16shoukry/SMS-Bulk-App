import { User } from "../entities/User";

export interface IUserServices {
  getByPhone(phone: string): Promise<User | undefined>;
}
