import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  gender: number;
}