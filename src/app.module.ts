import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {EventsModule} from './events/events.module';
import {APP_FILTER, APP_INTERCEPTOR} from "@nestjs/core";
import {HttpErrorFilter} from "./util/http-error.filter";
import {LogginInterceptor} from "./util/loggin.interceptor";
import { UsersModule } from './users/users.module';

@Module({
    imports: [TypeOrmModule.forRoot(), EventsModule, UsersModule],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LogginInterceptor
        }],
})
export class AppModule {
}
