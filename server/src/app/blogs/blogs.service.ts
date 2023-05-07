import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Blog } from 'libs/src/shared/models/blog.model';
import { readFile, readdir } from 'fs';
import { promisify } from 'util';
// eslint-disable-next-line @nx/enforce-module-boundaries
import * as utils from 'libs/src/shared/utils';
import { Response } from 'express';
import { join } from 'path';

@Injectable()
export class BlogsService {

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

  async findAll(): Promise<Blog[]> {
    const ids = await this.findAllIds();

    const blogs: Blog[] = [];
    for (const id of ids) {
      blogs.push(await this.findById(id));
    }

    return blogs;
  }

  async findById(id: string): Promise<Blog> {
    // console.log(id);

    const filePath = join(process.cwd(), 'dist/server/assets/posts', id, 'index.md');
    try {
      const content = promisify(readFile)(filePath, { encoding: 'utf-8' });
      return this.parseBlogContent(id, await content);
    } catch (error) {
      console.error(`Failed to read file: ${filePath}`);
      console.error(error);
    }
  }

  getBlogImageFile(id: string, fileName: string, res: Response) {

    const imageFilePath = join(process.cwd(), 'dist/server/assets/posts', id, fileName);
    return res.sendFile(imageFilePath);
  }

  private parseBlogContent(id: string, content: string): Blog {
    // console.log(`id: ${id}`);

    const blog: Blog = {
      id: id,
      title: utils.getMetadataValue(content, 'title:'),
      date: utils.getMetadataValue(content, 'date:'),
      thumbnail: utils.getMetadataValue(content, 'thumbnail:'),
      tags: utils.getMetadataArray(content, 'tags:'),
      categories: utils.getMetadataArray(content, 'categories:'),
      article: utils.getMdContent(content),
    };

    if(blog.thumbnail){
      blog.thumbnail = join('/api/blogs/img', blog.id, blog.thumbnail);
    }

    return blog;
  }
}
