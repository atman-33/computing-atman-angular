import { Component, OnInit } from '@angular/core';
import { BlogService } from '../shared/blog.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Blog } from 'libs/src/shared/models/blog.model';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {

  public readonly defaultImagePath = '../../assets/img/keyboard.jpg';

  public blogs: Blog[] = [];

  constructor(
    private blogService: BlogService) {
  }

  ngOnInit() {

    // 観測対象を取得
    const blogObservable$ = this.blogService.getBlogs();

    // subscribeでファイルからデータ取得
    blogObservable$.subscribe({
      next: (data) => {
        this.blogs = data;
        // console.log(this.posts);
      },
      error: (err) => { console.error('Error: ' + err.error); }
    });
  }
}
