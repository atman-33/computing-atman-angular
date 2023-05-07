import { Controller, Get } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './blog.model';

@Controller('blogs')
export class BlogsController {

    constructor(private readonly blogsService: BlogsService) {
    }

    @Get()
    async findAll(): Promise<Blog[]> {
        return await this.blogsService.findAll();
    }

    @Get(':id')  // /items/id
    async findById(id: string): Promise<Blog> {
        return await this.blogsService.findById(id);
    }
}
