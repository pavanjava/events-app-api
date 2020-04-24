import {Injectable} from '@nestjs/common';
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
        return await this.eventRepository.findOneOrFail(id);
    }

    update = async (id: string, data: Partial<EventsDto>) => {
        await this.eventRepository.update({id}, data);
        return this.eventRepository.findOneOrFail(id);
    }

    remove = async (id: string) => {
        await this.eventRepository.delete(id);
        return {deleted: true};
    }
}
