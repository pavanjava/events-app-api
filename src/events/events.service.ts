import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

import {EventEntity} from "./event.entity";
import {EventsDto} from "./events.dto";

@Injectable()
export class EventsService {

    constructor(@InjectRepository(EventEntity) private eventRepository: Repository<EventEntity>) {
    }

    showAll = async () => {
        return await this.eventRepository.find();
    }

    create = async (data: EventsDto) => {
        const event = await this.eventRepository.create(data);
        await this.eventRepository.save(event);
        return event;
    }

    read = async (id: string) => {
        const event = await this.eventRepository.findOneOrFail(id);
        if(!event){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return event;
    }

    update = async (id: string, data: Partial<EventsDto>) => {
        const event = await this.eventRepository.findOneOrFail(id);
        if(!event){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        await this.eventRepository.update({id}, data);
        return event;
    }

    remove = async (id: string) => {
        const event = await this.eventRepository.findOneOrFail(id);
        if(!event){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        await this.eventRepository.delete(id);
        return {deleted: true};
    }
}
