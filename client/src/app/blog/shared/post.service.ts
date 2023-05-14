import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Post } from 'libs/src/shared/models/post.model';

@Injectable()   // <= Angularでserviceを利用する際に必要
export class PostService {

    constructor(private http: HttpClient) { }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>('/api/post');
    }

    getPostById(id: string): Observable<Post> {
        return this.http.get<Post>('/api/post/' + id);
    }

    getPostImage(id: string, fileName: string): Observable<Blob> {
        return this.http.get<Blob>('/api/post/img/' + id + '/' + fileName);
    }
}