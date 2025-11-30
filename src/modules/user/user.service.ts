import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserRepositoryService } from "../database/user/user.repository.service";
import { UserRegisterDto } from "src/share/dto/user-register.dto";
import { UserEntity } from "../database/entities/user.entity";
import { UserLoginDto } from "src/share/dto/user-login-dto";
import { FindOneOptions, FindOptionsWhere } from "typeorm";

@Injectable()
export class UserService {
  private bcryptSaltRound: number = 10;
  constructor(private readonly userRepositoryService: UserRepositoryService) { }
  
  async register(userRegisterDto: UserRegisterDto): Promise<Partial<UserEntity>> {
    const { email, name, password, gender } = userRegisterDto;

    const exitedUser = await this.userRepositoryService.count({
      where: { email }
    });
    if (exitedUser) {
      throw new BadRequestException("Email already existed.");
    }

    const dataInsert = new UserEntity();
    dataInsert.email = email;
    dataInsert.name = name;
    dataInsert.password = await bcrypt.hash(password, this.bcryptSaltRound);
    dataInsert.gender = gender

    const insertResult = await this.userRepositoryService.insert(dataInsert);
    return {
      id: insertResult.id
    }
  }

  async login(userLoginDto: UserLoginDto): Promise<Partial<UserEntity>> {
    const { email, password } = userLoginDto;
    const user = await this.userRepositoryService.sqlFindOne({
      select: {
        name: true,
        password: true,
        email: true,
        gender: true,
        avatar: true,
      },
      where: { email }
    }) as UserEntity;
    if (!user) {
      throw new BadRequestException("Email or password is incorrect.");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException("Email or password is incorrect.");
    }

    user.password = "";

    return user;
  }

  async getById(id: string): Promise<UserEntity | null> {
    if (!id || id.length < 30) return null;
    return this.userRepositoryService.sqlFindOne(
      {
        where: { id }
      } as FindOneOptions
    );
  }

  async assertExists(id: string): Promise<UserEntity> {
    const user = await this.getById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateInfo(user: UserEntity, data: Partial<UserEntity>): Promise<Boolean> {
    if (!user || !data) return false;
    const isSuccess = await this.userRepositoryService.update(
      {
        id: user.id
      } as FindOptionsWhere<UserEntity>,
      {
        ...data
      }
    );

    if (!isSuccess) {
      throw new BadRequestException("Failed to update user avatar");
    }

    return isSuccess
  }
}