import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from 'libs/src/shared/models/post.model';
import { Response } from 'express';

@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService) {
    }

    @Get()
    async findAll(@Query('page') page: number): Promise<{ posts: Post[], totalCount: number }> {
        return await this.postService.findAll(page);
    }

    @Get('items/:id')
    async findById(@Param('id') id: string): Promise<Post> {
        return await this.postService.findById(id);
    }

    @Get('img/:id/:fileName')
    async getPostImageFile(
        @Param('id') id: string,
        @Param('fileName') fileName: string,
        @Res() res: Response) {
        return await this.postService.getPostImageFile(id, fileName, res);
    }

    @Get('ids')
    async findAllIds(): Promise<string[]> {
        return await this.postService.findAllIds();
    }

    @Get('categories/:categoryName')
    async findCategoryPosts(
        @Param('categoryName') categoryName: string,
        @Query('page') page: number): Promise<{ posts: Post[], totalCount: number }> {
        return await this.postService.findCategoryPosts(categoryName, page);
    }

    @Get('tags/:tagName')
    async findTagPosts(
        @Param('tagName') tagName: string,
        @Query('page') page: number): Promise<{ posts: Post[], totalCount: number }> {
        return await this.postService.findTagPosts(tagName, page);
    }

    @Get('search')
    async searchPosts(
        @Query('q') searchQuery: string, 
        @Query('page') page: number): Promise<{ posts: Post[], totalCount: number }> {
        const posts = await this.postService.searchPosts(searchQuery, page);
        return posts;
    }
}
