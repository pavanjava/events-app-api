import {Body, Controller, Get, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UsersDto} from "./users.dto";
import {ValidationPipe} from "../util/Validation.pipe";

@Controller('/api/v1/users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    showAllUsers(){
        return this.userService.showAll();
    }

    @Post('/login')
    login(@Body(new ValidationPipe()) user: UsersDto){
        return this.userService.login(user);
    }

    @Post('/register')
    register(@Body(new ValidationPipe()) user: UsersDto){
        return this.userService.register(user);
    }
}
