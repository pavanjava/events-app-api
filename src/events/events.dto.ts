import {IsString, } from 'class-validator';

export class EventsDto {
    @IsString()
    event: string;

    @IsString()
    description: string;
}

export class EventResponseObject {
    id? : string;
    updated: Date;
    created: Date;
    event: string;
    description: string;
    user: string;
}
