import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import {EventEntity} from "./event.entity";
import {UsersEntity} from "../users/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, UsersEntity])],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
