import { Controller, Get, NotFoundException, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { Category, Post, PostResponse, Tag } from 'libs/src/shared/models';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService) {
    }

    @Get()
    async findPosts(
        @Query('page') page: number,
        @Query('category') category: string,
        @Query('tag') tag: string,
        @Query('q') searchQuery: string
        ): Promise<PostResponse> {
        return await this.postService.findPosts(page, category, tag, searchQuery);
    }

    @Get('items/:id')
    async findPostById(@Param('id') id: string): Promise<Post> {
        return await this.postService.findPostById(id);
    }

    @Get('items/:id/related')
    async findRelatedPosts(@Param('id') id: string): Promise<Post[]> {
      // Assuming you have a method to retrieve a single post by its ID
      const post: Post = await this.postService.findPostById(id);
  
      if (!post) {
        // Handle the case when the post is not found
        throw new NotFoundException('Post not found');
      }
  
      const relatedPosts: Post[] = await this.postService.findRelatedPosts(post);
  
      return relatedPosts;
    }

    @Get('img/:id/:file')
    async getPostImageFile(
        @Param('id') id: string,
        @Param('file') file: string,
        @Res() res: Response) {
        return await this.postService.getPostImageFile(id, file, res);
    }

    @Get('ids')
    async findPostIds(): Promise<string[]> {
        return await this.postService.findPostIds();
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
        const posts = await this.postService.searchPosts(searchQuery, page);
        return posts;
    }

    @Get('category-list')
    async findCagegoryList(): Promise<Category[]> {
        return await this.postService.findCagegoryList();
    }

    @Get('tag-list')
    async findTagList(): Promise<Tag[]> {
        return await this.postService.findTagList();
    }
}
