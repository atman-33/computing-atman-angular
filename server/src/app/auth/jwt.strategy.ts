import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// PassportStrategy: NestJSでStrategyを使いやすくするfunction
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secretKey123',
        });
    }

    // 自動で呼び出しされる処理であり、validateのメソッド名は変更不可
    async validate(payload: { id: string; username: string; }): Promise<User> {
        const { id, username } = payload;
        const user = await this.userRepository.findOneBy({ id, username });

        if (user) {
            return user;
        }
        throw new UnauthorizedException();
    }
}