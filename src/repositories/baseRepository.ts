import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from "typeorm";

export abstract class BaseRepository<T> {
  protected entity: Repository<T>;

  constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  async create(attributes: DeepPartial<T>): Promise<T> {
    return await this.entity.create(attributes);
  }

  async save(object: T): Promise<T> {
    return await this.entity.save(object);
  }

  async findOneBy(conditions: FindOptionsWhere<T>): Promise<T | null> {
    return await this.entity.findOne({ where: conditions });
  }

  async list(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(options);
  }

  async findAllBy(options?: FindOptionsWhere<T>): Promise<T[]> {
    return await this.entity.find(options);
  }

  async update(id: number, attributes: any): Promise<T | null> {
    const entity = await this.entity.update(id, attributes);
    return this.findOneBy({ id } as unknown as FindOptionsWhere<T>);
  }

  async delete(id: number): Promise<void> {
    await this.entity.delete(id);
  }
}
