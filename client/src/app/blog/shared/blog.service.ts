import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()   // <= Angularでserviceを利用する際に必要
export class BlogService {

    constructor(private http: HttpClient) { }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getBlogs(): Observable<any> {
        return this.http.get('/api/blogs');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getBlogById(id: string): Observable<any>  {
        return this.http.get('/api/blogs/' + id);
      }  
}