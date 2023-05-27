import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../auth/dtos/create-user.dto';
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

    /**
     * ユーザー作成
     * @param createUserDto 
     * @returns 
     */
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { username, password, status } = createUserDto;

        const hashPassword = await this.generateHashedPassword(password);
        const user = new this.userModel({
            username,
            password: hashPassword,
            status: status
        });
        return await user.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOne(username: string): Promise<User> {
        const user = await this.userModel.findOne({ username }).exec();
        if (!user) {
            throw new NotFoundException('Could not find user');
        }
        return user;
    }

    async updatePassword(username: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({ username }).exec();

        if (!user) {
            throw new NotFoundException(`User with username '${username}' not found`);
        }

        const hashPassword = await this.generateHashedPassword(password);
        const updatedUser = await this.userModel.findOneAndUpdate(
            { username },
            { password: hashPassword },
            { new: true }
        );

        if (!updatedUser) {
            throw new NotFoundException(`Could not update password for user '${username}'`);
        }

        return updatedUser;
    }

    async delete(username: string): Promise<void> {
        const response = await this.userModel.deleteOne({ username }).exec();
        if (response.deletedCount === 0) {
            throw new NotFoundException('Could not find user');
        }
    }

    private async generateHashedPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
}
