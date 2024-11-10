import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  PayloadTooLargeException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import * as path from 'path';

export interface FileInterceptorOptions {
  fieldName?: string;
  maxSize?: number;
  allowedExtensions?: string[];
}

@Injectable()
export class CustomFileInterceptor implements NestInterceptor {
  private readonly fileInterceptor: NestInterceptor;
  private readonly maxSize: number;
  private readonly allowedExtensions: string[];

  constructor(options: FileInterceptorOptions = {}) {
    const {
      fieldName = 'file',
      maxSize = 5 * 1024 * 1024,
      allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'],
    } = options;

    this.maxSize = maxSize;
    this.allowedExtensions = allowedExtensions.map((ext) => ext.toLowerCase());

    this.fileInterceptor = new (FileInterceptor(fieldName))();
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    await this.fileInterceptor.intercept(context, next);

    const file: Express.Multer.File = request.file;

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (file.size > this.maxSize) {
      throw new PayloadTooLargeException(
        `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds the limit of ${(this.maxSize / 1024 / 1024).toFixed(2)}MB`,
      );
    }

    const extension = path.extname(file.originalname).toLowerCase().slice(1);
    if (!this.allowedExtensions.includes(extension)) {
      throw new BadRequestException(
        `File type .${extension} is not allowed. Allowed types: ${this.allowedExtensions.join(', ')}`,
      );
    }

    return next.handle();
  }
}
