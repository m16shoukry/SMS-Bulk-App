import { FindOptionsWhere, Repository } from "typeorm";

export abstract class BaseRepository<T> {
  protected entity: Repository<T>;

  constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  async findById(id: number): Promise<T | null> {
    return await this.entity.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
    });
  }

  async findAll(): Promise<Array<T>> {
    return await this.entity.find();
  }

  async delete(id: number) {
    await this.entity.delete(id);
  }
}
