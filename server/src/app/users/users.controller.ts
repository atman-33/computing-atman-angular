import { Body, Controller, Delete, Get, Param, Post, UseGuards, ValidationPipe, Request } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){
    }

    @Get()
    findAll(){
        return this.usersService.findAll();
    }

    @Get(':username')
    @UseGuards(AuthGuard('jwt'))
    findOne(@Param('username') username: string){
        return this.usersService.findOne(username);
    }

    @Post()
    create(@Body(ValidationPipe) createUser: CreateUserDto) {
        return this.usersService.create(createUser);
    }

    @Delete(':username')
    delete(@Param('username') username: string){
        return this.usersService.delete(username);
    }
}
