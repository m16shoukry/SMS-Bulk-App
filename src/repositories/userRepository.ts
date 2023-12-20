import dataSource from "../db/db.config";
import { User } from "../entities/User";

export class UserRepository {
  static async findById(id: number): Promise<User | undefined> {
    return await dataSource.getRepository(User).findOne({ where: { id } });
  }

  static async findByPhone(phone: string): Promise<User | undefined> {
    return await dataSource.getRepository(User).findOne({ where: { phone } });
  }
}
