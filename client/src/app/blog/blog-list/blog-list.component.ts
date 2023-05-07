import { Component, OnInit } from '@angular/core';
import { BlogService } from '../shared/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public posts: any;

  constructor(
    private blogService: BlogService) {
  }

  ngOnInit() {

    // 観測対象を取得
    const blogObservable = this.blogService.getBlogs();

    // subscribeでファイルからデータ取得
    blogObservable.subscribe({
      next: (data) => {
        this.posts = data;
        // console.log(this.posts);
      },
      error: (err) => { console.error('Error: ' + err.error); }
    });
  }
}
