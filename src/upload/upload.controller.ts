import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe, MaxFileSizeValidator, FileTypeValidator
} from "@nestjs/common";
import { UploadService } from './upload.service';
import { FileInterceptor} from "@nestjs/platform-express";

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  create(@UploadedFile(new ParseFilePipe(
    {
      validators: [
        new MaxFileSizeValidator({maxSize: 10 * 1000}),
        // new FileTypeValidator({fileType: 'image/jpeg'}),
        new FileTypeValidator({fileType: 'image/png'}),
      ]
    }
  )) avatar: Express.Multer.File) {
    console.log(avatar);
    this.uploadService.create(avatar.filename, avatar.buffer)
  }

}
