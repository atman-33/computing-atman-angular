import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { Post } from 'libs/src/shared/models/post.model';
import * as utils from 'libs/src/shared/utils/index';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'libs/src/shared/models/category.model';
import { Tag } from 'libs/src/shared/models/tag.model';
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

  public sidebarCategories: Category[] = [];
  public sidebarTags: Tag[] = [];

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

        // page number によるフィルタリング
        this.filterPostsByPage();

        // category によるフィルタリング
        this.filterPostsByCategory();

        // tag によるフィルタリング
        this.filterPostsByTag();

        // サイドバーのカテゴリー一覧を設定
        this.setSidebarCategories();

        // サイドバーのタグ一覧を設定
        this.setSidebarTags();

        console.log(`page: ${this.currentPage}`);
      },
      error: (err) => { console.error('Error: ' + err.error); }
    });
  }

  get pagedPosts(): Post[] {
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

  filterPostsByPage() {
    this.route.queryParams.subscribe(params => {
      const pageNumber = params['page'];
      if (pageNumber) {
        if (pageNumber) {
          this.posts = this.allPosts;
          this.onChangePage(pageNumber);
        }
      }
    });
  }

  filterPostsByCategory() {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.posts = this.allPosts.filter(post => post.categories.includes(category));
      }
      console.log(`category: ${category}`);
    });
  }

  filterPostsByTag() {
    this.route.queryParams.subscribe(params => {
      const tag = params['tag'];
      if (tag) {
        this.posts = this.allPosts.filter(post => post.tags.includes(tag));
        console.log(`tag: ${tag}`);
      }
    });
  }

  setSidebarCategories() {
    const categories: Category[] = this.allPosts.reduce((acc, post) => {
      post.categories.forEach((category) => {
        const existingCategory = acc.find((c) => c.name === category);
        if (existingCategory) {
          existingCategory.count++;
        } else {
          acc.push({ name: category, count: 1 });
        }
      });
      return acc;
    }, [] as Category[]);

    // console.log(categories);
    this.sidebarCategories = utils.sortByNumber(categories, 'count', 'desc');
  }

  setSidebarTags() {
    const tags: Tag[] = this.allPosts.reduce((acc, post) => {
      post.tags.forEach((tag) => {
        const existingTag = acc.find((c) => c.name === tag);
        if (existingTag) {
          existingTag.count++;
        } else {
          acc.push({ name: tag, count: 1 });
        }
      });
      return acc;
    }, [] as Tag[]);

    // console.log(tags);
    this.sidebarTags = utils.sortByNumber(tags, 'count', 'desc');
  }
}
