import { Body, Controller, Delete, Get, Param, UseGuards, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CredentialsDto } from '../auth/dto/credentials.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {
    }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get(':username')
    async findOne(@Param('username') username: string): Promise<User> {
        return await this.usersService.findOne(username);
    }

    @Patch(':username/password')
    @UseGuards(JwtAuthGuard)
    async updatePassword(
        @Param('username') username: string,
        @Body() credentialsDto: CredentialsDto,
    ): Promise<User> {
        const { password } = credentialsDto;
        return await this.usersService.updatePassword(username, password);
    }

    @Delete(':username')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('username') username: string): Promise<void> {
        return await this.usersService.delete(username);
    }
}
