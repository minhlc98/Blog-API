import { BadRequestException, Body, Controller, NotFoundException, Param, Post, Put, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRegisterDto } from "src/share/dto/user-register.dto";
import { UserEntity } from "../database/entities/user.entity";
import { UserLoginDto } from "src/share/dto/user-login-dto";
import { FastifyRequest } from "fastify";
import { S3Service } from "../aws/s3/s3.service";

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly s3Service: S3Service
  ) { }
  
  @Post('register')
  register(@Body() data: UserRegisterDto): Promise<Partial<UserEntity>> {
    return this.userService.register(data);
  }

  @Post('login')
  login(@Body() data: UserLoginDto): Promise<Partial<UserEntity>> {
    return this.userService.login(data);
  }

  @Put(':id/upload-avatar')
  async uploadAvatar(@Req() req: FastifyRequest, @Param("id") id: string) {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException();
    }

    const file = await req.file();
    if (!file || !file.filename || !file.file) {
      throw new BadRequestException("Invalid file.");
    }
    const key = `uploads/${Date.now()}-${file.filename}`;

    await this.s3Service.uploadStream(
      process.env.AWS_S3_BUCKET!,
      key,
      file.file,
      file.mimetype,
    );

    const url = await this.s3Service.getFileUrl(
      process.env.AWS_S3_BUCKET!,
      key,
      60 * 60 * 24
    );

    await this.userService.updateInfo(user, { avatar: url.split("?")[0] });

    return { key, url };
  }
}