import { Module } from '@nestjs/common';
import { CodeVerificationService } from './code-verification.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [CodeVerificationService],
  imports: [DatabaseModule],
  exports: [CodeVerificationService],
})
export class CodeVerificationModule {}
