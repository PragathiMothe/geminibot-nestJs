import { Injectable } from "@nestjs/common";

@Injectable()
export class FileUtil{
     editFileName(req: any, file: any, callback: any) {
        const originalFileName = file.originalname;
        callback(null, originalFileName);
      }
      
       validateImageFile(req: any, file: any, callback: any) {
        const originalFileName = file.originalname;
        if(!originalFileName.match(/\.(png|jpg|jpeg|gif)$/)){
      return callback(new Error)('Invalid image file',false);
        }
        callback(null,true)
      }
}