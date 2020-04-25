import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {UsersEntity} from "./users.entity";
import {UserResolver} from "./user.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserResolver]
})
export class UsersModule {}
