import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {

    /**
     *
     */
    constructor(private readonly authSurvice: AuthService) {
    }

    @Post('login')
    create(@Body(ValidationPipe) createUser: CreateUserDto) {
        return this.authSurvice.login(createUser);
    }

}
