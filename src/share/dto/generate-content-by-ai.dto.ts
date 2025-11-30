import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class GenerateContentByAIDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value && value.trim())
  prompt: string;
}