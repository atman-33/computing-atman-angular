import { Controller, Get, Param } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './blog.model';

@Controller('blogs')
export class BlogsController {

    constructor(private readonly blogsService: BlogsService) {
    }

    @Get('ids')
    async findAllIds(): Promise<string[]> {
        return await this.blogsService.findAllIds();
    }

    @Get()
    async findAll(): Promise<Blog[]> {
        return await this.blogsService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Blog> {
        return await this.blogsService.findById(id);
    }
}
