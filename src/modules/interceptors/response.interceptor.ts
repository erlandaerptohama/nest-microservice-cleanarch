import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponsePattern } from '../../core/common/response.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponsePattern<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponsePattern<T>> {
        const now = Date.now();
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();

        return next.handle().pipe(
            map((data) => ({
                data,
                isArray: Array.isArray(data),
                path: request.path,
                duration: `${Date.now() - now}ms`,
                method: request.method,
            })),
        );
    }
}
