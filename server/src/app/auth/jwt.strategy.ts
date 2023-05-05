import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { User } from '../entities/user.entity';

// PassportStrategy: NestJSでStrategyを使いやすくするfunction
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    /**
     *
     */
    constructor(private readonly userRepositoy: UserRepository) {
        super({
            // Requestに記述されているjwt部分を指定 => 今回はAuthHeaderのBearerToken
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // false: 有効期限を無効にしない（つまり有効）
            ignoreExpiration: false,
            secretOrKey: 'secretKey123',
        });
    }

    // 自動で呼び出しされる処理であり、validateのメソッド名は変更不可
    async validate(payload: { id: string; username: string }): Promise<User> {
        const { id, username } = payload;
        const user = await this.userRepositoy.findOne({ id, username });

        if(user){
            return user;
        }
        throw new UnauthorizedException();
    }
}