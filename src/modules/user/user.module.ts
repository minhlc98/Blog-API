import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "../database/user/user.repository.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { S3Module } from "../aws/s3/s3.module";

@Module({
  imports: [UserRepositoryModule, S3Module],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}