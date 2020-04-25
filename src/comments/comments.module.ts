import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import {EventEntity} from "../events/event.entity";
import {UsersEntity} from "../users/users.entity";
import {CommentsEntity} from "./comments.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, UsersEntity, CommentsEntity])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
