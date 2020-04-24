import {IsString, } from 'class-validator';

export class EventsDto {
    @IsString()
    event: string;

    @IsString()
    description: string;
}
