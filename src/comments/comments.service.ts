import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {CommentsEntity} from "./comments.entity";
import {EventEntity} from "../events/event.entity";
import {UsersEntity} from "../users/users.entity";
import {CommentsDto} from "./comments.dto";

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(CommentsEntity) private commentsRepository: Repository<CommentsEntity>,
                @InjectRepository(EventEntity) private eventRepository: Repository<EventEntity>,
                @InjectRepository(UsersEntity) private usersRepository: Repository<UsersEntity>) {
    }

    getByEvent = async (eventId: string) => {
        const event: any = await this.eventRepository.findOne({
            where: {id: eventId},
            relations: ['comments', 'comments.user', 'comments.events']
        });

        const comments = event.comments.map((comment) => {
            return {"id": comment.id, "created": comment.created, "comment": comment.comment, "eventId":comment.events.id}
        });
        return comments;
    }

    getByUser = async (userId: string) => {
        const comments = await this.commentsRepository.find({where: {userId: userId}, relations: ['user']});
        const userComments = comments.map(comment => {return {"id":comment.id, "created":comment.created, "comment":comment.comment, "userId": comment.user.id}})
        return userComments;
    }

    show = async (id: string) => {
        return this.commentsRepository.findOne({where: {id}, relations: ['user', 'events']});
    }

    create = async (eventId: string, userId: string, comment: CommentsDto) => {
        const event = await this.eventRepository.findOne({where: {id: eventId}});
        const user = await this.usersRepository.findOne({where: {id: userId}});
        const comments = await this.commentsRepository.create({...comment, user: user, events: event});
        await this.commentsRepository.save(comments);
        return comments;
    }
}
