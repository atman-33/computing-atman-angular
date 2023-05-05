import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from '../entities/item.entity';
import { CreateItemDto } from './dto/create-item-dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../entities/user.entity';
import { Role } from '../auth/decorator/role.decorator';
import { UserStatus } from '../auth/user-status.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

// /items というpathに紐づけ
@Controller('items') 
// ハンドラーがレスポンスを返す前にExcludeを付けたパスワードを除外する処理を挟む
@UseInterceptors(ClassSerializerInterceptor)    
export class ItemsController {

    /**
     *
     */
    constructor(private readonly itemsService: ItemsService) {
    }

    @Get()
    async findAll(): Promise<Item[]> {
        return await this.itemsService.findAll();
    }

    @Get(':id')  // /items/id
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
        return await this.itemsService.findById(id);
    }

    @Post()
    @Role(UserStatus.PREMIUM)
    // JwtAuthGuard適用 ※@Controller('xxx')直下に記載すればコントローラー全体に適用
    @UseGuards(JwtAuthGuard, RolesGuard)    
    async create(
        @Body() createItemDto: CreateItemDto,
        @GetUser() user: User): Promise<Item> {
        // console.log(user);
        return await this.itemsService.create(createItemDto, user);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateStatus(
        @Param('id', ParseUUIDPipe) id: string,
        @GetUser() user: User): Promise<Item> {
        return await this.itemsService.updateStatus(id, user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(
        @Param('id', ParseUUIDPipe) id: string,
        @GetUser() user: User): Promise<void> {
        await this.itemsService.delete(id, user);
    }
}
