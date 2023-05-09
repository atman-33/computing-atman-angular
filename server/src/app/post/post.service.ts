import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Post } from 'libs/src/shared/models/post.model';
import { readFile, readdir } from 'fs';
import { promisify } from 'util';
// eslint-disable-next-line @nx/enforce-module-boundaries
import * as helpers from 'libs/src/shared/helpers';
import { Response } from 'express';
import { join } from 'path';

@Injectable()
export class PostService {

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

  async findAll(): Promise<Post[]> {
    const ids = await this.findAllIds();

    const posts: Post[] = [];
    for (const id of ids) {
      posts.push(await this.findById(id));
    }

    return posts;
  }

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

  getPostImageFile(id: string, fileName: string, res: Response) {

    const imageFilePath = join(process.cwd(), 'dist/server/assets/posts', id, fileName);
    return res.sendFile(imageFilePath);
  }

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
