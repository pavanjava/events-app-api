import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {UsersEntity} from "../users/users.entity";
import {CommentsEntity} from "../comments/comments.entity";

@Entity({name:'events',synchronize:true})
export class EventEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @CreateDateColumn() created: Date;
    @UpdateDateColumn() updated: Date;
    @Column('text') event: string;
    @Column('text') description: string;
    @ManyToOne(type => UsersEntity, user => user.events) user: UsersEntity;
    @OneToMany(type => CommentsEntity, comment => comment.events, {cascade: true}) comments: CommentsEntity[];
}
