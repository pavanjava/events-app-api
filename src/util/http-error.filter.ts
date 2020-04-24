import {ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter{

    catch(exception: HttpException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception['response'].statusCode

        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request. method,
            message: exception.message.error || exception.message
        }

        Logger.error(`${request. method} ${request.url} `, JSON.stringify(errorResponse), 'HttpErrorFilter');
        response.status(404).json(errorResponse);
    }
}
