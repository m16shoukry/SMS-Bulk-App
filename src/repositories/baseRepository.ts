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
    const newEntity = this.entity.create(attributes);
    return this.save(newEntity);
  }

  async save(object: T): Promise<T> {
    return await this.entity.save(object);
  }

  async findOneBy(conditions: FindOptionsWhere<T>): Promise<T | null> {
    return await this.entity.findOne({ where: conditions });
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(options);
  }

  async update(id: number, attributes: any): Promise<T | null> {
    await this.entity.update(id, attributes);
    return this.findOneBy({ id } as unknown as FindOptionsWhere<T>);
  }

  async delete(id: number): Promise<void> {
    await this.entity.delete(id);
  }
}
