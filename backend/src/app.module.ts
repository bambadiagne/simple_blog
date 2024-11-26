import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { CommonModule } from './common/common.module';
import { CommentsModule } from './comments/comments.module';
import { LoggerModule } from './logger/logger.module';
import { CustomLogger } from './logger/logger.service';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';
import { CodeVerificationModule } from './code-verification/code-verification.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PostsModule,
    CommonModule,
    CommentsModule,
    LoggerModule,
    CodeVerificationModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      useClass: GlobalExceptionFilter,
      provide: APP_FILTER,
    },
  ],
  exports: [],
})
export class AppModule {}
