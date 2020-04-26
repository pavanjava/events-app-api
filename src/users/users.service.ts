import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "./users.entity";
import {Repository} from "typeorm";
import {UserResponseObject, UsersDto} from "./users.dto";

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UsersEntity) private userRepository: Repository<UsersEntity>) {}

    showAll = async (): Promise<UserResponseObject[]> => {
        const users = await this.userRepository.find({relations:['events', 'comments']});
        return users.map((user) => user.toResponseObject(false));
    }

    login = async (data: UsersDto): Promise<UserResponseObject> => {
        const {username, password} = data;
        const user  = await this.userRepository.findOneOrFail({where:{username}});
        if(!user || !await user.comparePassword(password)){
            throw new HttpException('Invalid username & password', HttpStatus.BAD_REQUEST);
        }
        return user.toResponseObject()
    }

    register = async (data: UsersDto ): Promise<UserResponseObject> => {
        const {username} = data;
        let user = await this.userRepository.findOne({where:{username}});
        if(user){
            throw new HttpException('User Already Exist', HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user.toResponseObject();
    }
}
