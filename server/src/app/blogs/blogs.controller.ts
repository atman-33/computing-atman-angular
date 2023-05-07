import { Controller, Get, Param, Res } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './blog.model';
import { Response } from 'express';

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

    @Get('/img/:id/:fileName')
    async getBlogImageFile(
        @Param('id') id: string,
        @Param('fileName') fileName: string,
        @Res() res: Response) {
        return await this.blogsService.getBlogImageFile(id, fileName, res);
    }
}
