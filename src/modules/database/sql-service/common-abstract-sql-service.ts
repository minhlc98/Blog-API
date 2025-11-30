import { EntityManager, EntityTarget, FindOneOptions, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class CommonAbstractSQLService<T extends ObjectLiteral> {
  protected readonly entityManager: EntityManager;
  protected readonly entity: EntityTarget<T>;

  constructor(entityManager: EntityManager, entity: EntityTarget<T>) {
    this.entityManager = entityManager;
    this.entity = entity;
  }

  public repository(): Repository<T> {
    return this.entityManager.getRepository(this.entity);
  }

  public sqlFindOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository().findOne({
      ...options,
      where: {
        ...options.where,
      }
    });
  }

  public insert(data: T): Promise<T> { 
    return this.repository().save(data);
  }

  public bulkInsert(data: T[]): Promise<T[]> { 
    return this.repository()
      .createQueryBuilder()
      .insert()
      .into(this.entity)
      .values(data)
      .execute()
      .then(() => data
    );
  }

  public async update(findCondition: FindOptionsWhere<T>, data: QueryDeepPartialEntity<T>) {
    const updatedResult = await this.repository().update(findCondition, data);
    return updatedResult.affected ? updatedResult.affected > 0 : false;
  }

  public async upsert(data: T, conflictOptions: string []): Promise<Partial<T>> {
    const insertResult = await this.repository().upsert(data, conflictOptions);
    return {
      id: insertResult.identifiers[0].id,
    } as unknown as Partial<T>;
  }

  public count(options?: FindOneOptions<T>): Promise<number> {
    return this.repository().count(options);
  }
}