import {IsNotEmpty} from "class-validator";

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
}
