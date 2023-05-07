import { Injectable } from '@nestjs/common';
import { Blog } from './blog.model';

@Injectable()
export class BlogsService {

    findAll(): Promise<Blog[]> {
        throw new Error('Method not implemented.');
    }

    findById(id: string): Promise<Blog> {
        throw new Error('Method not implemented.');
    }
}
