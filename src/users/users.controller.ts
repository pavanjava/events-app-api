import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UsersDto} from "./users.dto";
import {ValidationPipe} from "../util/Validation.pipe";
import {AuthGuard} from "../util/auth.gaurd";

@Controller('/api/v1/users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    @UseGuards(new AuthGuard())
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
