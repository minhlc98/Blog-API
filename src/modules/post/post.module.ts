import { Module } from "@nestjs/common";
import { GeminiModule } from "../gemini/gemini.module";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
  imports: [GeminiModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}