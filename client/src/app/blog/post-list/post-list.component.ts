import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Post } from 'libs/src/shared/models/post.model';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  public readonly defaultImagePath = '../../assets/img/keyboard.jpg';

  public posts: Post[] = [];
  public currentPage = 1;
  public postsPerPage = 3;

  constructor(
    private postService: PostService) {
  }

  ngOnInit() {

    // 観測対象を取得
    const postObservable$ = this.postService.getPosts();

    // subscribeでファイルからデータ取得
    postObservable$.subscribe({
      next: (data) => {
        this.posts = data;
        // console.log(this.posts);
        this.posts = this.posts.map(post => {
          return {
            ...post,
            article: this.extractLead(post.article, 40)
          };
        });
      },
      error: (err) => { console.error('Error: ' + err.error); }
    });
  }

  get pagedPosts() {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    return this.posts.slice(startIndex, endIndex);
  }

  onChangePage(page: number) {
    console.log(`page: ${page}`);
    this.currentPage = page;
  }

  extractLead(article: string, maxLength: number): string {
    // HTML要素を除去する
    const div = document.createElement('div');
    div.innerHTML = article;
    const text = div.textContent || div.innerText || '';

    let truncated = text.substring(0, maxLength);
    if (text.length > maxLength) {
      truncated += '...';
    }
    return truncated;
  }
}
