import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { readFile, readdir } from 'fs';
import * as constants from 'libs/src/shared/constants';
import * as helpers from 'libs/src/shared/helpers';
import { Post } from 'libs/src/shared/models/post.model';
import * as utils from 'libs/src/shared/utils/index';
import { join } from 'path';
import { promisify } from 'util';

@Injectable()
export class PostService {

  /**
   * ページに対応した記事データを取得
   * @param page 
   * @returns 
   */
  async findAll(page: number): Promise<{ posts: Post[], totalCount: number; }> {
    const allPosts = await this.getAllPosts();
    const posts = this.getPagePosts(allPosts, page, constants.default.POSTS_PER_PAGE);

    return { posts: posts, totalCount: posts.length };
  }

  /**
   * 指定されたidの記事を取得
   * @param id 
   * @returns 
   */
  async findById(id: string): Promise<Post> {
    // console.log(id);

    const filePath = join(process.cwd(), 'dist/server/assets/posts', id, 'index.md');
    try {
      const content = promisify(readFile)(filePath, { encoding: 'utf-8' });
      return this.parsePostContent(id, await content);
    } catch (error) {
      console.error(`Failed to read file: ${filePath}`);
      console.error(error);
    }
  }

  /**
   * 画像を取得
   * @param id 
   * @param fileName 
   * @param res 
   * @returns 
   */
  getPostImageFile(id: string, fileName: string, res: Response) {

    const imageFilePath = join(process.cwd(), 'dist/server/assets/posts', id, fileName);
    return res.sendFile(imageFilePath);
  }

  /**
   * 記事IDの一覧を取得
   * @returns 
   */
  async findAllIds(): Promise<string[]> {
    const folderPath = join(process.cwd(), 'dist/server/assets/posts');
    try {
      const dirents = await promisify(readdir)(
        folderPath, {
        withFileTypes: true,
      });

      const folders = dirents
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
      return folders;
    } catch (error) {
      console.error(`Failed to read directories: ${error}`);
      throw new Error('Failed to read directories');
    }
  }

  /**
   * カテゴリでフィルタした記事一覧を取得
   * @param categoryName 
   * @param page 
   * @returns 
   */
  async findCategoryPosts(categoryName: string, page: number): Promise<{ posts: Post[], totalCount: number; }> {
    let allPosts = await this.getAllPosts();

    if (categoryName) {
      allPosts = allPosts.filter(post => post.categories.includes(categoryName));
    }

    const posts = this.getPagePosts(allPosts, page, constants.default.POSTS_PER_PAGE);

    return { posts: posts, totalCount: posts.length };
  }

  /**
   * タグでフィルタした記事一覧を取得
   * @param tagName 
   * @param page 
   * @returns 
   */
  async findTagPosts(tagName: string, page: number): Promise<{ posts: Post[], totalCount: number; }> {
    let allPosts = await this.getAllPosts();

    if (tagName) {
      allPosts = allPosts.filter(post => post.categories.includes(tagName));
    }

    const posts = this.getPagePosts(allPosts, page, constants.default.POSTS_PER_PAGE);

    return { posts: posts, totalCount: posts.length };
  }

  /**
   * 検索キーワードを含む記事を取得
   * @param searchQuery 
   * @param page 
   * @returns 
   */
  async searchPosts(searchQuery: string, page: number): Promise<{ posts: Post[], totalCount: number; }> {
    let allPosts = await this.getAllPosts();

    if (searchQuery) {
      const searchTerms = searchQuery.toLowerCase().replace('　', ' ').split(' ');

      allPosts = allPosts.filter(it => {
        const titleMatch = searchTerms.every(term =>
          it.title.toLowerCase().includes(term)
        );
        const articleMatch = searchTerms.every(term =>
          it.article.toLowerCase().includes(term)
        );
        return titleMatch || articleMatch;
      });
    }

    // console.log(`Posts count: ${allPosts.length}`);
    const posts = this.getPagePosts(allPosts, page, constants.default.POSTS_PER_PAGE);
    return { posts: posts, totalCount: posts.length };
  }

  /**
   * 記事を全て取得
   * @returns 
   */
  private async getAllPosts(): Promise<Post[]> {
    const ids = await this.findAllIds();

    let allPosts: Post[] = [];
    for (const id of ids) {
      allPosts.push(await this.findById(id));
    }

    allPosts = utils.sortByDate(allPosts, 'date', 'desc');  // 新規投稿順にソート

    return allPosts;
  }

  /**
   * ページサイズに区切った記事を取得
   * @param allPosts 
   * @param page 
   * @returns 
   */
  private getPagePosts(allPosts: Post[], page: number, pageSize: number): Post[] {
    if (page === undefined) {
      page = 1;
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const pagePosts = allPosts.slice(startIndex, endIndex); // ページ番号に対応したデータのIDの配列を取得

    const posts: Post[] = [];
    for (const post of pagePosts) {
      posts.push(post);
    }

    return posts;
  }

  /**
   * 記事ソースのmdファイルの中身をPostクラス構造に変換
   * @param id 
   * @param content 
   * @returns 
   */
  private parsePostContent(id: string, content: string): Post {
    // console.log(`id: ${id}`);

    let post: Post = {
      id: id,
      title: helpers.getMetadataValue(content, 'title:'),
      date: helpers.getMetadataValue(content, 'date:'),
      thumbnail: helpers.getMetadataValue(content, 'thumbnail:'),
      tags: helpers.getMetadataArray(content, 'tags:'),
      categories: helpers.getMetadataArray(content, 'categories:'),
      article: helpers.getMdContent(content),
    };

    post = this.addPrefixTothumbnail(post);
    post = this.addPrefixToImageSource(post);

    return post;
  }

  private addPrefixTothumbnail(post: Post): Post {
    if (post.thumbnail) {
      post.thumbnail = join('/api/post/img', post.id, post.thumbnail);
    }
    return post;
  }

  private addPrefixToImageSource(post: Post): Post {
    post.article = helpers.addMdPrefixToImageSource(post.article, './api/post/img/' + post.id + '/');
    return post;
  }
}
