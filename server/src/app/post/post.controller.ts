import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { Category, Post, PostResponse, Tag } from 'libs/src/shared/models';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService) {
    }

    @Get()
    async findAll(
        @Query('page') page: number,
        @Query('category') category: string,
        @Query('tag') tag: string,
        @Query('q') searchQuery: string
        ): Promise<PostResponse> {
        return await this.postService.findAll(page, category, tag, searchQuery);
    }

    @Get('items/:id')
    async findById(@Param('id') id: string): Promise<Post> {
        return await this.postService.findById(id);
    }

    @Get('img/:id/:file')
    async getPostImageFile(
        @Param('id') id: string,
        @Param('file') file: string,
        @Res() res: Response) {
        return await this.postService.getPostImageFile(id, file, res);
    }

    @Get('ids')
    async findAllIds(): Promise<string[]> {
        return await this.postService.findAllIds();
    }

    @Get('categories/:category')
    async findCategoryPosts(
        @Param('category') category: string,
        @Query('page') page: number): Promise<PostResponse> {
        return await this.postService.findCategoryPosts(category, page);
    }

    @Get('tags/:tag')
    async findTagPosts(
        @Param('tag') tag: string,
        @Query('page') page: number): Promise<PostResponse> {
        return await this.postService.findTagPosts(tag, page);
    }

    @Get('search')
    async searchPosts(
        @Query('q') searchQuery: string, 
        @Query('page') page: number): Promise<PostResponse> {
        const posts = await this.postService.findSearchedPosts(searchQuery, page);
        return posts;
    }

    @Get('category-list')
    async getCagegoryList(): Promise<Category[]> {
        return await this.postService.getCagegoryList();
    }

    @Get('tag-list')
    async getTagList(): Promise<Tag[]> {
        return await this.postService.getTagList();
    }
}
