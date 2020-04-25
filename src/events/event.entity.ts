import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {UsersEntity} from "../users/users.entity";

@Entity({name:'events',synchronize:true})
export class EventEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @CreateDateColumn() created: Date;
    @UpdateDateColumn() updated: Date;
    @Column('text') event: string;
    @Column('text') description: string;
    @ManyToOne(type => UsersEntity, user => user.events) user: UsersEntity;

}
