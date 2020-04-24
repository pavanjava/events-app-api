import {CallHandler, ExecutionContext, Logger, NestInterceptor} from '@nestjs/common';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

export class LogginInterceptor implements NestInterceptor{

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;
        const past: number = Date.now();
        return next.handle().pipe(tap(() => Logger.log(`${method} ${url} ${Date.now() - past} ms`, context.getClass().name)));
    }
}
