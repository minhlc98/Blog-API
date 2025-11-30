import { Injectable } from "@nestjs/common";
import { CommonAbstractSQLService } from "../sql-service/common-abstract-sql-service";
import { UserEntity } from "../entities/user.entity";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { CONNECTION_NAME } from "../typeorm-options";

@Injectable()
export class UserRepositoryService extends CommonAbstractSQLService<UserEntity> {
  constructor(@InjectEntityManager(CONNECTION_NAME) protected readonly entityManager: EntityManager) {
    super(entityManager, UserEntity);
  }
}