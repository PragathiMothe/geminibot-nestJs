import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUtil } from './file/file.util';
import { FileModule } from './file/file.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //module is marked as global, its providers are available everywhere in the application.
    }), // forRoot() is a method configured at the root level of the application.

    MulterModule.registerAsync({
      imports:[FileModule],
     useFactory:(fileUtil:FileUtil)=>({
      fileFilter:fileUtil.validateImageFile,
      storage: diskStorage({
        destination: 'upload',
        filename: fileUtil.editFileName,
      }),
     }),
     inject:[FileUtil]
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
