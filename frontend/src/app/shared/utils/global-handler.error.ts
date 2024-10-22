import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomError } from './custom-error';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    console.log('Global Error Handler', error);
    if (error instanceof HttpErrorResponse) {
      alert(error.error.message);
      if (!navigator.onLine) {
        throw new CustomError({
          status: error.status,
          message: 'No Internet Connection',
          error: error.error
        });
      } else {
        alert(error.error.message);
        throw new CustomError({
          status: error.status,
          message: error.error.message,
          error: error.error
        });
      }
    } else {
      alert(error.message);
      throw new CustomError({
        status: 500,
        message: error.message,
        error: error.stack
      });
    }
  }
}
