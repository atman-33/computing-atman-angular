import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    /**
     * コンストラクタ
     */
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    }

    async create(user: CreateUserDto) {
        const createdUser = new this.userModel({
            username: user.username,
            password: await bcrypt.hash(user.password, 12)
        });
        return await createdUser.save();
    }

    async findAll() {
        return await this.userModel.find().exec();
    }

    async findOne(username: string) {
        const user = await this.userModel.findOne({ username }).exec();
        if (!user){
            throw new NotFoundException('Could not find user');
        }
        return user;
    }

    async delete(username: string) {
        const response = await this.userModel.deleteOne({ username }).exec();
        if (response.deletedCount === 0){
            throw new NotFoundException('Could not find user');
        }
        return response;
    }
}
