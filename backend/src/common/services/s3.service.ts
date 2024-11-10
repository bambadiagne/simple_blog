import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { IStorageService } from './storage.service';

@Injectable()
export class S3Service implements IStorageService {
  private s3: S3;
  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      region: configService.get('AWS_REGION'),
    });
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const result = await this.s3
        .upload({
          Bucket: this.configService.get('AWS_BUCKET_NAME'),
          Key: `WaxSaXalaat_${Date.now()}_${file.originalname}`,
          Body: file.buffer,
          ACL: 'public-read',
        })
        .promise();
      return result.Location;
    } catch (error) {
      throw new BadRequestException('Error uploading file');
    }
  }
  async deleteFile(key: string) {
    console.log('key', key);

    try {
      return await this.s3
        .deleteObject({
          Bucket: this.configService.get('AWS_BUCKET_NAME'),
          Key: key,
        })
        .promise();
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error deleting file');
    }
  }
}
