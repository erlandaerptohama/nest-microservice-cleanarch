import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    constructor(private readonly logger: LoggerService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const ip = this.getIP(request);

        this.logger.log(`Incoming Request on ${JSON.stringify(request.path)} method=${request.method} ip=${ip}`);
        this.logger.log(`Request Headers ${JSON.stringify(request.headers)}`);
        this.logger.log(`Request Params ${JSON.stringify(request.params)}`);
        this.logger.log(`Request Query ${JSON.stringify(request.query)}`);
        this.logger.log(`Request Body ${JSON.stringify(request.body)}`);

        return next.handle().pipe(
            tap((response) => {
                this.logger.log(`End Request for ${request.path} method=${request.method} ip=${ip} duration=${Date.now() - now}ms`);
                this.logger.log(`Response Body ${JSON.stringify(response)}`);
            }),
        );
    }

    private getIP(request: any): string {
        let ip: string;
        const ipAddr = request.headers['x-forwarded-for'];
        if (ipAddr) {
        const list = ipAddr.split(',');
        ip = list[list.length - 1];
        } else {
        ip = request.connection.remoteAddress;
        }
        return ip.replace('::ffff:', '');
    }
}
