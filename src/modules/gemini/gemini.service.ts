import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleGenAI } from "@google/genai";
import { GenerateContentByAIDto } from "src/share/dto/generate-content-by-ai.dto";

@Injectable()
export class GeminiService {
  private googleAI: GoogleGenAI;
  private model: string = "gemini-2.5-flash"

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>("GEMINI_API_KEY") || ""
    this.googleAI = new GoogleGenAI({ apiKey });
  }

  async generateContent(data: GenerateContentByAIDto) {
    const response = await this.googleAI.models.generateContent({
      model: this.model,
      contents: data.prompt,
    });

    return {
      result: response.text
    }
  }
}