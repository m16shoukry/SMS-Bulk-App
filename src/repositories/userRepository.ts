import dataSource from "../db/db.config";
import { User } from "../entities/User";
import { BaseRepository } from "./baseRepository";

export default class UserRepository extends BaseRepository<User> {
  constructor() {
    super(dataSource.getRepository(User));
  }

  async findByPhone(phone: string): Promise<User | undefined> {
    return await this.entity.findOne({ where: { phone } });
  }
}
