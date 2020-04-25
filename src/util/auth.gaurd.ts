import {Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate = async (context: ExecutionContext): Promise<boolean> => {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            return false;
        }
        const isAuthenticated = await this.validateToken(request.headers.authorization);
        if(!isAuthenticated){
            return false;
        }

        return true;
    }

    validateToken = async (auth: string) => {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token String', HttpStatus.FORBIDDEN);
        }

        const token = auth.split(' ')[1];
        try {
            const decode = await jwt.verify(token, process.env.SECRET);
            return decode;
        } catch (e) {
            const message = 'Token Error ' + (e.message | e);
            throw new HttpException(message, HttpStatus.FORBIDDEN);
        }
    }
}
