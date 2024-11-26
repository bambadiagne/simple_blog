import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Cron } from '@nestjs/schedule';
import { CustomLogger } from 'src/logger/logger.service';

@Injectable()
export class CodeVerificationService {
  constructor(
    private dbService: DatabaseService,
    private logger: CustomLogger,
  ) {
    this.logger.setContext('CodeVerificationService');
  }
  async create(user_id: number) {
    const code = this.randomFixedInteger(6).toString();
    return await this.dbService.codeVerification.create({
      data: {
        code,
        user_id,
      },
    });
  }
  randomFixedInteger = function (length) {
    return Math.floor(
      Math.pow(10, length - 1) +
        Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1),
    );
  };
  async findByUser(user_id: number) {
    return await this.dbService.codeVerification.findFirst({
      where: {
        user_id,
      },
    });
  }
  async findByCodeAndUser(code: string, user_id: number) {
    return await this.dbService.codeVerification.findFirst({
      where: {
        code,
        user_id,
      },
    });
  }
  async delete(id: number) {
    return await this.dbService.codeVerification.delete({
      where: {
        id,
      },
    });
  }

  @Cron('*/15 * * * *')
  async deleteCodes() {
    this.logger.log('Deleting old codes');
    try {
      await this.dbService.codeVerification.deleteMany({
        where: {
          created_at: {
            lte: new Date(new Date().getTime() - 1000 * 60 * 1),
          },
        },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
