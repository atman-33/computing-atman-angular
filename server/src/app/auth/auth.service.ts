import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user-dto';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    /**
     *
     */
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService) {
    }

    async signUp(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.createUser(createUserDto);
    }

    async signIn(credentialsDto: CredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = credentialsDto;
        const user = await this.userRepository.findOne({ username });

        // compare(password, user.password) パスワードが同じか比較
        // => password: 入力されたパスワード vs user.password: DBに保存しているHash化されたpassword
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { id: user.id, username: user.username };
            const accessToken = await this.jwtService.sign(payload); // 署名されたToken生成
            return { accessToken };
        }
        throw new UnauthorizedException(
            'Please check your username or password!'
        );
    }
}
