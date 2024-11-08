import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLogger } from 'src/logger/logger.service';
interface IErrorMessage {
  status: boolean;
  message: string;
}
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLogger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as IErrorMessage)
        : { message: exception.message, status: false };

    const errorDetails = {
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
      ...(request['user'] && { userId: request['user']['id'] }),
      query: request.query,
      body: this.deleteCredentialsFromRequest(request.body),
    };

    this.logger.error(
      `${exception.message}`,
      exception.stack,
      JSON.stringify(errorDetails),
    );

    response.status(status).json({
      statusCode: status,
      path: request.url,
      message: message,
      error: exception.name,
    });
  }
  deleteCredentialsFromRequest(body: any) {
    delete body.password;
    delete body.image;
    return body;
  }
}
