import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Blog } from 'libs/src/shared/models/blog.model';

@Injectable()   // <= Angularでserviceを利用する際に必要
export class BlogService {

    constructor(private http: HttpClient) { }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getBlogs(): Observable<Blog[]> {
        return this.http.get<Blog[]>('/api/blogs');
    }

    getBlogById(id: string): Observable<Blog> {
        return this.http.get<Blog>('/api/blogs/' + id);
    }

    getBlogImage(id: string, fileName: string): Observable<Blob> {
        return this.http.get<Blob>('/api/blogs/img/' + id + '/' + fileName);
    }
}