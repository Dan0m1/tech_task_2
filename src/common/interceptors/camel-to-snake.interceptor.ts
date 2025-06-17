import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import * as snakecaseKeys from 'snakecase-keys';

@Injectable()
export class CamelToSnakeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((data) => this.convertToSnakeCase(data)));
  }

  convertToSnakeCase(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => snakecaseKeys(item, { deep: true }));
    } else if (typeof data === 'object' && data !== null) {
      return snakecaseKeys(data, { deep: true });
    }
    return data;
  }
}
