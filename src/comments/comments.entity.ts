import {Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsersEntity} from "../users/users.entity";
import {EventEntity} from "../events/event.entity";

@Entity({name:"comments", synchronize: true})
export class CommentsEntity {

    @PrimaryGeneratedColumn('uuid') id: string;
    @CreateDateColumn() created: Date;
    @Column('text') comment: string;

    @ManyToOne(type => UsersEntity, user => user.comments)
    @JoinTable()
    user: UsersEntity;

    @ManyToOne(type => EventEntity, event => event.comments)
    events: EventEntity;
}
