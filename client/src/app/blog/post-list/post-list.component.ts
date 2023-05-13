import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Post } from 'libs/src/shared/models/post.model';
// eslint-disable-next-line @nx/enforce-module-boundaries
import * as utils from 'libs/src/shared/utils/index';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  public readonly defaultImagePath = '../../assets/img/keyboard.jpg';

  public allPosts: Post[] = [];
  public posts: Post[] = [];
  public currentPage = 1;
  public postsPerPage = 3;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    // 観測対象を取得
    const postObservable$ = this.postService.getPosts();

    // subscribeでファイルからデータ取得
    postObservable$.subscribe({
      next: (data) => {
        this.allPosts = data;
        // 記事のリード文抽出
        this.allPosts = this.allPosts.map(post => {
          return {
            ...post,
            article: this.extractLead(post.article, 40)
          };
        });

        // 日付によるソート
        this.allPosts = utils.sortByDate(this.allPosts, 'date', 'desc');

        // 画面表示用のpostsに格納
        this.posts = [...this.allPosts];

        // category によるフィルタリング
        this.filterPostsByCategory();

        // tag によるフィルタリング
        this.filterPostsByTag();
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

  onResetPosts() {
    this.posts = [...this.allPosts];
    this.currentPage = 1;
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

  filterPostsByCategory() {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.posts = this.allPosts.filter(post => post.categories.includes(category));
      }
    });
  }

  filterPostsByTag() {
    this.route.queryParams.subscribe(params => {
      const tag = params['tag'];
      if (tag) {
        if (tag) {
          this.posts = this.allPosts.filter(post => post.tags.includes(tag));
        }
      }
    });
  }
}
