import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        data,
        message: 'Login successful',
        statusCode: HttpStatus.OK,
      })),
      catchError((error) => {
        return throwError({
          error: 'Something went wrong',
          message: error.message,
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }),
    );
  }
}
