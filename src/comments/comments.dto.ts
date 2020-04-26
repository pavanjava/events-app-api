import {IsString} from "class-validator";
import {UsersDto} from "../users/users.dto";
import {EventsDto} from "../events/events.dto";

export class CommentsDto {
    @IsString()
    comment: string;
}

export class CommentsResponseObject {

    id: string;
    comment: string;
    created: Date;
    userId?: string;
    user?: UsersDto
    events?: EventsDto
}
