import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    /**
     *
     */
    constructor(private userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secretKey123'
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user = await this.userService.findOne(username);
        // console.log(username);

        if (user) {
            return user;
        }
        throw new UnauthorizedException();
    }
}