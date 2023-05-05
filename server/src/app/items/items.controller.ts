import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from '../entities/item.entity';
import { CreateItemDto } from './dto/create-item-dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../entities/user.entity';

@Controller('items') // /items というpathに紐づけ
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
    @UseGuards(JwtAuthGuard)    // JwtAuthGuard適用 ※@Controller('xxx')直下に記載すればコントローラー全体に適用
    async create(
        @Body() createItemDto: CreateItemDto,
        @GetUser() user: User): Promise<Item> {
        // console.log(user);
        return await this.itemsService.create(createItemDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateStatus(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
        return await this.itemsService.updateStatus(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        await this.itemsService.delete(id);
    }
}
