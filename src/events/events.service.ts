import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

import {EventEntity} from "./event.entity";
import {EventResponseObject, EventsDto} from "./events.dto";
import {UsersEntity} from "../users/users.entity";

@Injectable()
export class EventsService {

    constructor(@InjectRepository(EventEntity) private eventRepository: Repository<EventEntity>,
                @InjectRepository(UsersEntity) private userRepository: Repository<UsersEntity>) {
    }

    private toResponseObject = (event: EventEntity): EventResponseObject => {
        return {...event, user: event.user.toResponseObject(false)}
    }

    showAll = async (): Promise<EventResponseObject[]> => {
        const events = await this.eventRepository.find({relations: ['user']});
        return events.map(event => this.toResponseObject(event));
    }

    create = async (userId: string, data: EventsDto): Promise<EventResponseObject> => {
        const user = await this.userRepository.findOne({where: {id: userId}})
        const event = await this.eventRepository.create({...data, user: user});
        await this.eventRepository.save(event);
        return this.toResponseObject(event);
    }

    read = async (id: string): Promise<EventResponseObject> => {
        const event = await this.eventRepository.findOneOrFail({where: {id}, relations: ['user']});
        if (!event) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return this.toResponseObject(event);
    }

    update = async (userId: string, eventId: string, data: Partial<EventsDto>): Promise<EventResponseObject> => {
        const event = await this.eventRepository.findOne({where:{id:eventId}, relations:['user']});
        if (!event) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        await this.eventRepository.update({id:eventId}, data);
        return this.toResponseObject(event);
    }

    remove = async (id: string, userId: string): Promise<{}> => {
        const event = await this.eventRepository.findOne({where:{id}, relations:['user']});
        if (!event) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        await this.eventRepository.delete(id);
        return {deleted: true};
    }
}
