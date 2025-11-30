import { Module } from "@nestjs/common";
import { UserRepositoryService } from "./user.repository.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { CONNECTION_NAME } from "../typeorm-options";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity], CONNECTION_NAME)
  ],
  providers: [UserRepositoryService],
  exports: [UserRepositoryService],
})
export class UserRepositoryModule {}