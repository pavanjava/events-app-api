import {IsNotEmpty} from "class-validator";
import {CommentsEntity} from "../comments/comments.entity";
import {EventEntity} from "../events/event.entity";

export class UsersDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}

export class UserResponseObject {
    id: string;
    username: string;
    created: Date;
    token?: string;
    comments?: CommentsEntity[];
    events?: EventEntity[];
}
