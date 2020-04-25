import {Resolver, Query} from "@nestjs/graphql";

@Resolver('Users')
export class UserResolver {
    @Query()
    users() {
        return [{id: 'id', username: 'username'}]
    }
}
