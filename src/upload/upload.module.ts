import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
