import { Controller, Get, NotFoundException, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { Category, Post, PostResponse, Tag } from 'libs/src/shared/models';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService) {
    }

    @Get()
    async getPosts(
        @Query('page') page: number,
        @Query('category') category: string,
        @Query('tag') tag: string,
        @Query('q') searchQuery: string
        ): Promise<PostResponse> {
        return await this.postService.getPosts(page, category, tag, searchQuery);
    }

    @Get('items/:id')
    async getPostById(@Param('id') id: string): Promise<Post> {
        return await this.postService.getPostById(id);
    }

    @Get('items/:id/related')
    async getRelatedPosts(@Param('id') id: string): Promise<Post[]> {
      // Assuming you have a method to retrieve a single post by its ID
      const post: Post = await this.postService.getPostById(id);
  
      if (!post) {
        // Handle the case when the post is not found
        throw new NotFoundException('Post not found');
      }
  
      const relatedPosts: Post[] = await this.postService.getRelatedPosts(post);
  
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
    async getPostIds(): Promise<string[]> {
        return await this.postService.getPostIds();
    }

    @Get('categories/:category')
    async getCategoryPosts(
        @Param('category') category: string,
        @Query('page') page: number): Promise<PostResponse> {
        return await this.postService.getCategoryPosts(category, page);
    }

    @Get('tags/:tag')
    async getTagPosts(
        @Param('tag') tag: string,
        @Query('page') page: number): Promise<PostResponse> {
        return await this.postService.getTagPosts(tag, page);
    }

    @Get('search')
    async searchPosts(
        @Query('q') searchQuery: string, 
        @Query('page') page: number): Promise<PostResponse> {
        const posts = await this.postService.getSearchedPosts(searchQuery, page);
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
