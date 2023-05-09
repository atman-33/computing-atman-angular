import { Controller, Get, Param, Res } from '@nestjs/common';
import { PostService } from './post.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Post } from 'libs/src/shared/models/post.model';
import { Response } from 'express';

@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService) {
    }

    @Get('ids')
    async findAllIds(): Promise<string[]> {
        return await this.postService.findAllIds();
    }

    @Get()
    async findAll(): Promise<Post[]> {
        return await this.postService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Post> {
        return await this.postService.findById(id);
    }

    @Get('/img/:id/:fileName')
    async getPostImageFile(
        @Param('id') id: string,
        @Param('fileName') fileName: string,
        @Res() res: Response) {
        return await this.postService.getPostImageFile(id, fileName, res);
    }
}
