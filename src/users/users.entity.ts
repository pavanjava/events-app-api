import {BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from "jsonwebtoken";
import {EventEntity} from "../events/event.entity";

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @CreateDateColumn() created: Date;
    @Column({type:'text', unique: true}) username: string;
    @Column('text') password: string;
    @OneToMany(type => EventEntity, event => event.user) events: EventEntity[];

    @BeforeInsert()
    hashPassword = async () => {
        this.password = await bcrypt.hash(this.password, 10);
    }

    comparePassword = async (pwd: string) => {
        return bcrypt.compare(pwd, this.password);
    }

    private get token(){
        const { id, username } = this;
        return jwt.sign({id, username}, process.env.SECRET, {expiresIn: '1h'});
    }

    toResponseObject = (showToken= true) => {
        const {id, created, username, token} = this;
        const responseObject:any = {id, created, username};
        if(showToken){
            responseObject.token = token;
        }
        if(this.events){
            responseObject.events = this.events;
        }
        return responseObject;
    }
}
