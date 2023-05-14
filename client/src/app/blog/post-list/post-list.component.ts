import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { Post } from 'libs/src/shared/models/post.model';
import * as utils from 'libs/src/shared/utils/index';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'libs/src/shared/models/category.model';
import { Tag } from 'libs/src/shared/models/tag.model';
import { map } from 'rxjs';
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
  public postsPerPage = 2;

  public sidebarCategories: Category[] = [];
  public sidebarTags: Tag[] = [];

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  /**
   * 初期化処理
   * 1. postデータ取得
   * 2. postデータを日付最新順で並び替え
   * 3. 一覧表示用に記事のリード文抽出
   * 4. サイドバーのカテゴリ、タグ一覧を更新
   * 5. クエリパラメータ変更をsubscribe
   */
  ngOnInit() {
    // 観測対象を取得
    const postObservable$ = this.postService.getPosts();
    const queryParamsObservable$ = this.route.queryParams.pipe(map(params => +params['page'] || 1));

    // postデータ取得をsubscribe
    postObservable$.subscribe({
      next: (data) => {

        // postデータを取得して日付によるソート
        this.allPosts = data;
        this.allPosts = utils.sortByDate(this.allPosts, 'date', 'desc');

        // 記事のリード文抽出
        this.allPosts = this.allPosts.map(post => {
          return {
            ...post,
            article: this.extractLead(post.article, 40)
          };
        });

        // サイドバーのカテゴリー一覧を設定
        this.setSidebarCategories();

        // サイドバーのタグ一覧を設定
        this.setSidebarTags();

        // 表示用postデータを読み込み
        this.loadPosts();

        // console.log(`page: ${this.currentPage}`);
      },
      error: (err) => { console.error('Error: ' + err.error); }
    });

    // クエリパラメータのpage変更をsubscribe
    queryParamsObservable$.subscribe({
      next: (page) => {
        this.currentPage = page;
        this.loadPosts();
      },
      error: (err) => { console.error('Error: ' + err.error); }
    });
  }

  /**
   * 表示用postデータを読み込み
   */
  loadPosts() {
    // 画面表示用のpostsに格納
    this.posts = [...this.allPosts];

    // category によるフィルタリング
    this.filterPostsByCategory();

    // tag によるフィルタリング
    this.filterPostsByTag();
  }

  get pagedPosts(): Post[] {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    return this.posts.slice(startIndex, endIndex);
  }

  onChangePage(page: number) {
    console.log(`page: ${page}`);
    this.currentPage = page;
    
    this.router.navigate([], {
      queryParams: { page: page },
      queryParamsHandling: 'merge'
    });
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
      // console.log(`category: ${category}`);
    });
  }

  filterPostsByTag() {
    this.route.queryParams.subscribe(params => {
      const tag = params['tag'];
      if (tag) {
        this.posts = this.allPosts.filter(post => post.tags.includes(tag));
        // console.log(`tag: ${tag}`);
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
