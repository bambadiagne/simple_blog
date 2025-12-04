import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CodeVerificationModule } from 'src/code-verification/code-verification.module';
import { CommonModule } from 'src/common/common.module';
import { GoogleAuthService } from 'src/auth/google.service';
@Module({
  controllers: [UsersController],
  providers: [UsersService, GoogleAuthService],
  exports: [UsersService],
  imports: [DatabaseModule, CodeVerificationModule, CommonModule],
})
export class UsersModule {}
