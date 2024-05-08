import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { promptBody } from './dto/prompt.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @HttpCode(HttpStatus.OK)
  @Post('prompt')
  getPromptResponse(@Body() body: promptBody) {
    return this.appService.getPromptResponse(body.prompt);
  }

  @UseInterceptors(FilesInterceptor('images', 10))
  @HttpCode(HttpStatus.OK)
  @Post('prompt-with-image')
  getPromptwithImageResponse(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() body: promptBody,
  ) {
    console.log(images);
    console.log(Body);
    return this.appService.getpromptwithImageResponse(images, body.prompt);
  }
}
