import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<User> {
        const { username, password, status } = createUserDto;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({
            username,
            password: hashPassword,
            status,
        });

        await this.userRepository.save(user);
        return user;
    }


    async signIn(
        credentialsDto: CredentialsDto,
    ): Promise<{ accessToken: string; }> {
        const { username, password } = credentialsDto;
        const user = await this.userRepository.findOneBy({ username });

        // compare(password, user.password) パスワードが同じか比較
        // => password: 入力されたパスワード vs user.password: DBに保存しているHash化されたpassword
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { id: user.id, username: user.username };
            const accessToken = this.jwtService.sign(payload);
            return { accessToken };
        }
        throw new UnauthorizedException(
            'ユーザー名またはパスワードを確認してください',
        );
    }
}
