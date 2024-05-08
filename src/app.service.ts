import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const fs = require('fs');


@Injectable()
export class AppService {
  private genAI: any;
  private genaiProModel: any;
  private genAiProVisionModal: any;
  constructor(private readonly config: ConfigService) {
    // Access your API key as an environment variable
    this.genAI = new GoogleGenerativeAI(this.config.get('API_KEY'));

    // For text-only input, use the gemini-pro model
    this.genaiProModel = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

    // For text-and-image input (multimodal), use the gemini-pro-vision model
    this.genAiProVisionModal = this.genAI.getGenerativeModel({
      model: 'gemini-pro-vision',
    });
   
    
  }
  getHello(): string {
    this.config.get('API_KEY');
    return 'Hello World!';
  }
  async getPromptResponse(prompt: string): Promise<string> {
    const result = await this.genaiProModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
  }

  async getpromptwithImageResponse(images: Array<Express.Multer.File>,prompt:string): Promise<string> {
    let imageParts = [];
    for (let image of images) {
      imageParts.push(this.fileToGenerativePart(image.path, image.mimetype));
    }
    console.log(imageParts);
    
    const result = await this.genAiProVisionModal.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
  }

  fileToGenerativePart(path: string, mimeType: string) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString('base64'),
        mimeType,
      },
    };
  }
}
