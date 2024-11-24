import { Module } from '@nestjs/common';
import { S3Service } from './services/storage/s3.service';
import { SesService } from './services/mailing/ses.service';

@Module({
  imports: [],
  controllers: [],
  providers: [S3Service, SesService],
  exports: [S3Service, SesService],
})
export class CommonModule {}
