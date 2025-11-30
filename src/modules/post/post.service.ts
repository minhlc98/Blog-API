import { Injectable } from "@nestjs/common";
import { GeminiService } from "../gemini/gemini.service";
import { GenerateContentByAIDto } from "src/share/dto/generate-content-by-ai.dto";

@Injectable()
export class PostService {
  constructor(private readonly geminiService: GeminiService) { }
  
  async generateContentByAI(data: GenerateContentByAIDto) {
    return this.geminiService.generateContent(data);
  }
}