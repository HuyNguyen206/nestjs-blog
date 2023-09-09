import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { ConfigService } from "@nestjs/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class UploadService {
  private s3client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION')
  })
  constructor(private configService: ConfigService) {
  }
  async create(fileName: string, content: Buffer) {
    await this.s3client.send(
      new PutObjectCommand({
        Bucket: this.configService.get('AWS_S3_BUCKET', 'test-uploader'),
        Key: fileName,
        Body: content
      })
    )
  }

}
