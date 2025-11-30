import { Body, Controller, Post } from "@nestjs/common";
import { PostService } from "./post.service";
import { GenerateContentByAIDto } from "src/share/dto/generate-content-by-ai.dto";

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }
  
  @Post('gen-by-ai')
  async generateContentByAI(@Body() data: GenerateContentByAIDto) {
    return this.postService.generateContentByAI(data)
  }
}
