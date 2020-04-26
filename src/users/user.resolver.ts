import {Resolver, Query} from "@nestjs/graphql";
import {UsersService} from "./users.service";

@Resolver('Users')
export class UserResolver {
    constructor(private userService: UsersService) {
    }
    @Query()
    users() {
        return this.userService.showAll();
    }
}
