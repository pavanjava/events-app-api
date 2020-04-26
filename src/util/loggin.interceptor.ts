import {CallHandler, ExecutionContext, Logger, NestInterceptor} from '@nestjs/common';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {GqlExecutionContext} from "@nestjs/graphql";

export class LogginInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        if (req) {
            const method = req.method;
            const url = req.url;
            const past: number = Date.now();
            return next.handle().pipe(tap(() => Logger.log(`${method} ${url} ${Date.now() - past} ms`, context.getClass().name)));
        }else{
            const ctx = GqlExecutionContext.create(context);
            const resolverName = ctx.getContext().constructorRef;
            const info = ctx.getInfo()
            const past: number = Date.now();
            return next.handle().pipe(tap(() => Logger.log(`[${info.parentType}] ${info.fieldName} ${Date.now() - past} ms`, resolverName)));
        }
    }
}
