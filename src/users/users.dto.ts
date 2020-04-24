import {IsNotEmpty} from "class-validator";

export class UsersDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}
